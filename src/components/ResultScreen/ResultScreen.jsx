import { useRef } from 'react';
import './ResultScreen.css';

const CONFETTI_COLORS = ['#00ff88','#00c8ff','#ff3c5a','#ffe94d','#ff8c00'];

function Confetti() {
  const particles = useRef(
    Array.from({ length: 45 }, (_, i) => ({
      id:       i,
      x:        Math.random() * 100,
      size:     Math.random() * 8 + 4,
      color:    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: Math.random() * 2 + 2,
      delay:    Math.random() * 1.8,
    }))
  );

  return (
    <>
      {particles.current.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left:              `${p.x}vw`,
            width:             p.size,
            height:            p.size,
            background:        p.color,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export default function ResultScreen({
  p1Name, p2Name,
  winner,
  p1Score, p2Score,
  rounds,
  onRematch, onMenu,
}) {
  const winnerName = winner === 1 ? p1Name : p2Name;
  const winClass   = winner === 1 ? 'p1' : 'p2';
  const advantage  = Math.abs(p1Score - p2Score);

  return (
    <div className="result-root">
      <Confetti />
      <div className="result-panel">
        <span className="result-trophy">🏆</span>
        <div className="result-eyebrow">Race Complete</div>
        <div className={`result-winner-name ${winClass}`}>{winnerName}</div>
        <div className="result-tagline">Crossed the finish line first!</div>

        <div className="result-stats">
          <div className="stat-card">
            <div className="stat-label">{p1Name}</div>
            <div className="stat-value p1">{p1Score} pts</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">{p2Name}</div>
            <div className="stat-value p2">{p2Score} pts</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Rounds Played</div>
            <div className="stat-value accent">{rounds}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Winning Margin</div>
            <div className={`stat-value ${winClass}`}>+{advantage} pts</div>
          </div>
        </div>

        <div className="result-buttons">
          <button className="btn-outline" onClick={onMenu}>Menu</button>
          <button className="btn-primary" onClick={onRematch}>Rematch</button>
        </div>
      </div>
    </div>
  );
}
