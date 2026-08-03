import { useState } from 'react';
import { DIFFICULTIES, TOPICS } from '../../utils/questions';
import './Lobby.css';

export default function Lobby({ onStart }) {
  const [p1, setP1] = useState('Player 1');
  const [p2, setP2] = useState('Player 2');
  const [diff, setDiff] = useState('grade1');
  const [topic, setTopic] = useState('random');

  const availableTopics = TOPICS[diff] || [{ key: 'random', label: 'Random' }];

  const handleGradeChange = (nextDiff) => {
    setDiff(nextDiff);
    const nextTopics = TOPICS[nextDiff] || [{ key: 'random', label: 'Random' }];
    if (!nextTopics.some(item => item.key === topic)) {
      setTopic(nextTopics[0]?.key || 'random');
    }
  };

  const handleStart = () => {
    onStart(p1.trim() || 'Player 1', p2.trim() || 'Player 2', diff, topic);
  };

  return (
    <div className="lobby-root">
      <div className="lobby-title-block">
        <div className="lobby-title">Math Raceway</div>
        <div className="lobby-subtitle">Multiplayer · Circuit Racing · Mathematics</div>
      </div>

      <div className="lobby-panel">
        <div className="lobby-section-label">Players</div>
        <div className="player-entries">
          <div className="player-entry">
            <div className="player-pip p1" />
            <input
              className="name-input"
              value={p1}
              onChange={e => setP1(e.target.value)}
              placeholder="Player 1 name"
              maxLength={16}
            />
          </div>
          <div className="player-entry">
            <div className="player-pip p2" />
            <input
              className="name-input p2"
              value={p2}
              onChange={e => setP2(e.target.value)}
              placeholder="Player 2 name"
              maxLength={16}
            />
          </div>
        </div>

        <div className="lobby-divider" />

        <div className="lobby-section-label">Difficulty</div>
        <div className="difficulty-row">
          {Object.entries(DIFFICULTIES).map(([key, val]) => (
            <button
              key={key}
              className={`diff-btn${diff === key ? ' active' : ''}`}
              onClick={() => handleGradeChange(key)}
            >
              {val.label}
            </button>
          ))}
        </div>

        <div className="lobby-section-label">Topic</div>
        <div className="topic-row">
          {availableTopics.map(item => (
            <button
              key={item.key}
              className={`topic-btn${topic === item.key ? ' active' : ''}`}
              onClick={() => setTopic(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="start-btn"
          onClick={handleStart}
          disabled={!p1.trim() || !p2.trim()}
        >
          Continue to garage →
        </button>
      </div>
    </div>
  );
}
