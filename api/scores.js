const { MongoClient } = require('mongodb');

let clientPromise;

function getClient() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');
  if (!clientPromise) clientPromise = new MongoClient(process.env.MONGODB_URI).connect();
  return clientPromise;
}

function cleanPlayer(player) {
  const name = typeof player?.name === 'string' ? player.name.trim().slice(0, 16) : '';
  const score = Number(player?.score);
  return { name, score: Number.isFinite(score) && score >= 0 ? Math.floor(score) : null, won: Boolean(player?.won) };
}

export default async function handler(req, res) {
  try {
    const scores = (await getClient()).db().collection('scores');
    if (req.method === 'GET') {
      const leaderboard = await scores.find({}, { projection: { _id: 0, name: 1, totalScore: 1, gamesPlayed: 1, wins: 1, bestScore: 1 } }).sort({ totalScore: -1, wins: -1, bestScore: -1, name: 1 }).limit(50).toArray();
      return res.status(200).json({ leaderboard });
    }
    if (req.method === 'POST') {
      const players = Array.isArray(req.body?.players) ? req.body.players.map(cleanPlayer) : [];
      if (players.length !== 2 || players.some(player => !player.name || player.score === null)) return res.status(400).json({ error: 'Provide two valid players.' });
      const now = new Date();
      await scores.bulkWrite(players.map(player => ({ updateOne: { filter: { name: player.name }, update: { $setOnInsert: { name: player.name, createdAt: now }, $inc: { totalScore: player.score, gamesPlayed: 1, wins: player.won ? 1 : 0 }, $max: { bestScore: player.score }, $set: { updatedAt: now } }, upsert: true } })));
      return res.status(201).json({ success: true });
    }
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('Score API error:', error);
    return res.status(500).json({ error: 'Unable to access the score database.' });
  }
}
