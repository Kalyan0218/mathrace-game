import './Scoreboard.css';

export default function Scoreboard({ p1Name, p2Name, p1Score, p2Score, p1Streak, p2Streak, round }) {
  return (
    <div className="scoreboard-root">
      <div className="score-card p1">
        <div className="score-name">{p1Name}</div>
        <div className="score-value">{p1Score}</div>
        <div className="score-streak">{p1Streak >= 2 ? `🔥 ${p1Streak} streak` : '\u00a0'}</div>
      </div>

      <div className="round-badge">
        <div className="round-label">Round</div>
        <div className="round-number">{round}</div>
      </div>

      <div className="score-card p2">
        <div className="score-name">{p2Name}</div>
        <div className="score-value">{p2Score}</div>
        <div className="score-streak">{p2Streak >= 2 ? `🔥 ${p2Streak} streak` : '\u00a0'}</div>
      </div>
    </div>
  );
}
