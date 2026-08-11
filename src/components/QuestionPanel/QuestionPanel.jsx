import { useRef } from 'react';
import { QUESTION_TIME, DIFFICULTIES } from '../../utils/questions';
import './QuestionPanel.css';

function TimerRing({ timeLeft }) {
  const r    = 26;
  const circ = 2 * Math.PI * r;
  const frac = timeLeft / QUESTION_TIME;
  const dash = circ * frac;
  const color = frac > 0.5 ? 'var(--neon-green)' : frac > 0.25 ? 'var(--neon-yellow)' : 'var(--neon-red)';

  return (
    <div className="timer-ring-wrap">
      <svg className="timer-ring-svg" width="64" height="64" viewBox="0 0 64 64">
        <circle className="timer-ring-bg" cx="32" cy="32" r={r} />
        <circle
          className="timer-ring-fill"
          cx="32" cy="32" r={r}
          stroke={color}
          strokeDasharray={`${dash} ${circ - dash}`}
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        />
      </svg>
      <div className="timer-center" style={{ color }}>{timeLeft}</div>
    </div>
  );
}

export default function QuestionPanel({
  question,
  difficulty,
  timeLeft,
  p1Answer, p2Answer,
  p1State,  p2State,
  locked,
  feedback,
  onP1Change, onP2Change,
  onP1KeyDown, onP2KeyDown,
  phoneCode,
}) {
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  const p1Class = `answer-input p1${p1State === 'correct' ? ' correct' : p1State === 'wrong' ? ' wrong' : ''}`;
  const p2Class = `answer-input p2${p2State === 'correct' ? ' correct' : p2State === 'wrong' ? ' wrong' : ''}`;

  return (
    <div>
      <div className="question-panel-root">
        <TimerRing timeLeft={timeLeft} />

        <div className="question-body">
          <div className="question-label">Solve to advance</div>
          <div className="question-text">{question.text} = ?</div>
          <div className="question-hint">
            {DIFFICULTIES[difficulty].label} · Press Enter to submit
          </div>
        </div>

        <div className="answer-form">
          {phoneCode && <div className="phone-room-display">
            <span>On your phone, add ?join={phoneCode} to this game's web address</span>
            <strong>ROOM {phoneCode}</strong>
          </div>}
          <div className="answer-inputs">
            <div className="answer-row">
              <div className="answer-dot p1" />
              <input
                ref={p1Ref}
                className={p1Class}
                type="number"
                placeholder="P1"
                value={p1Answer}
                onChange={onP1Change}
                onKeyDown={onP1KeyDown}
                disabled={p1State !== 'idle' || locked}
                autoComplete="off"
              />
            </div>
            <div className="answer-row">
              <div className="answer-dot p2" />
              <input
                ref={p2Ref}
                className={p2Class}
                type="number"
                placeholder="P2"
                value={p2Answer}
                onChange={onP2Change}
                onKeyDown={onP2KeyDown}
                disabled={p2State !== 'idle' || locked}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="key-hint">↵ Enter to submit</div>
        </div>
      </div>

      <div className="feedback-strip">
        <div className="fb-item p1">{feedback.p1 || '\u00a0'}</div>
        <div className="fb-center">{difficulty.toUpperCase()} MODE</div>
        <div className="fb-item p2">{feedback.p2 || '\u00a0'}</div>
      </div>
    </div>
  );
}
