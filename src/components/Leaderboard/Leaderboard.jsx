import { useEffect, useState } from 'react';
import './Leaderboard.css';

export default function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([]);
  const [status, setStatus] = useState('loading');
  const loadScores = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/scores');
      if (!response.ok) throw new Error();
      const data = await response.json();
      setScores(data.leaderboard || []); setStatus('ready');
    } catch { setStatus('error'); }
  };
  useEffect(() => { loadScores(); }, []);
  return <main className="leaderboard-root"><section className="leaderboard-panel"><div className="leaderboard-heading"><div><div className="leaderboard-eyebrow">Hall of Fame</div><h1>Top Racers</h1></div><button className="leaderboard-refresh" onClick={loadScores} aria-label="Refresh scores">↻</button></div>
    {status === 'loading' && <p className="leaderboard-message">Loading scores…</p>}
    {status === 'error' && <p className="leaderboard-message error">Scores are unavailable. Check the database connection.</p>}
    {status === 'ready' && scores.length === 0 && <p className="leaderboard-message">No races yet. Be the first to set a score!</p>}
    {status === 'ready' && scores.length > 0 && <div className="leaderboard-table" role="table"><div className="leaderboard-row leaderboard-labels" role="row"><span>Rank</span><span>Racer</span><span>Total</span><span>Wins</span><span>Best</span></div>{scores.map((player, index) => <div className="leaderboard-row" role="row" key={player.name}><span className={`leaderboard-rank rank-${index + 1}`}>#{index + 1}</span><span className="leaderboard-name">{player.name}</span><span>{player.totalScore}</span><span>{player.wins}</span><span>{player.bestScore}</span></div>)}</div>}
    <button className="leaderboard-back" onClick={onBack}>← Main menu</button></section></main>;
}
