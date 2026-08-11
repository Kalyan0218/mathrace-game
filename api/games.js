const { MongoClient } = require('mongodb');

let clientPromise;

function getClient() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');
  if (!clientPromise) clientPromise = new MongoClient(process.env.MONGODB_URI).connect();
  return clientPromise;
}

function cleanCode(value) {
  return typeof value === 'string' ? value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) : '';
}

function publicGame(game) {
  if (!game) return null;
  const { _id, hostKey, answer, ...safeGame } = game;
  if (safeGame.state) {
    safeGame.state = { ...safeGame.state };
    delete safeGame.state.answer;
  }
  return safeGame;
}

export default async function handler(req, res) {
  try {
    const games = (await getClient()).db().collection('games');

    if (req.method === 'POST' && req.body?.action === 'create') {
      const code = cleanCode(req.body.code);
      const hostKey = typeof req.body.hostKey === 'string' ? req.body.hostKey.slice(0, 80) : '';
      if (code.length !== 6 || !hostKey) return res.status(400).json({ error: 'Invalid room details.' });
      await games.updateOne(
        { code },
        { $setOnInsert: { code, hostKey, state: null, submissions: {}, createdAt: new Date() }, $set: { updatedAt: new Date() } },
        { upsert: true },
      );
      return res.status(201).json({ code });
    }

    const code = cleanCode(req.query.code || req.body?.code);
    if (code.length !== 6) return res.status(400).json({ error: 'A six-character room code is required.' });

    if (req.method === 'GET') {
      const game = await games.findOne({ code }, { projection: { hostKey: 0, answer: 0 } });
      return game ? res.status(200).json({ game: publicGame(game) }) : res.status(404).json({ error: 'Room not found.' });
    }

    if (req.method === 'PATCH') {
      const hostKey = typeof req.body?.hostKey === 'string' ? req.body.hostKey : '';
      const state = req.body?.state;
      if (!state || typeof state !== 'object') return res.status(400).json({ error: 'Game state is required.' });
      const result = await games.updateOne(
        { code, hostKey },
        { $set: { state, answer: Number(state.answer), updatedAt: new Date() } },
      );
      return result.matchedCount ? res.status(200).json({ success: true }) : res.status(403).json({ error: 'Room host not recognised.' });
    }

    if (req.method === 'POST' && req.body?.action === 'answer') {
      const player = Number(req.body.player);
      const answer = typeof req.body.answer === 'string' ? req.body.answer.trim().slice(0, 30) : '';
      const questionId = String(req.body.questionId || '');
      if (![1, 2].includes(player) || !answer || !questionId) return res.status(400).json({ error: 'Invalid answer.' });
      const game = await games.findOne({ code });
      if (!game?.state || String(game.state.questionId) !== questionId) return res.status(409).json({ error: 'That question has moved on.' });
      const key = `submissions.${questionId}.${player}`;
      await games.updateOne({ code }, { $set: { [key]: { answer, submittedAt: Date.now() }, updatedAt: new Date() } });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('Game API error:', error);
    return res.status(500).json({ error: 'Unable to access the game service.' });
  }
}
