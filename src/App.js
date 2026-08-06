import { useState, useEffect, useCallback, useRef } from 'react';
import './globals.css';
import './App.css';
import Lobby         from './components/Lobby/Lobby';
import Garage        from './components/Garage/Garage';
import RaceTrack     from './components/RaceTrack/RaceTrack';
import Scoreboard    from './components/Scoreboard/Scoreboard';
import QuestionPanel from './components/QuestionPanel/QuestionPanel';
import ResultScreen  from './components/ResultScreen/ResultScreen';
import { generateQuestion, QUESTION_TIME, ADVANCE_AMOUNT, WIN_PROGRESS } from './utils/questions';

function GameScreen({ p1Name, p2Name, difficulty, topic, track, p1Car, p2Car, onEnd, onMenu }) {
  const [p1Progress, setP1Progress] = useState(0.01);
  const [p2Progress, setP2Progress] = useState(0.01);
  const [p1Score,    setP1Score]    = useState(0);
  const [p2Score,    setP2Score]    = useState(0);
  const [p1Streak,   setP1Streak]   = useState(0);
  const [p2Streak,   setP2Streak]   = useState(0);
  const [p1Boosting, setP1Boosting] = useState(false);
  const [p2Boosting, setP2Boosting] = useState(false);
  const [question,   setQuestion]   = useState(() => generateQuestion(difficulty, topic));
  const [p1Answer,   setP1Answer]   = useState('');
  const [p2Answer,   setP2Answer]   = useState('');
  const [p1State,    setP1State]    = useState('idle');
  const [p2State,    setP2State]    = useState('idle');
  const [timeLeft,   setTimeLeft]   = useState(QUESTION_TIME);
  const [round,      setRound]      = useState(1);
  const [feedback,   setFeedback]   = useState({ p1: '', p2: '' });
  const [locked,     setLocked]     = useState(false);

  const timerRef  = useRef(null);
  const p1PosRef  = useRef(0.01);
  const p2PosRef  = useRef(0.01);
  const p1ScoRef  = useRef(0);
  const p2ScoRef  = useRef(0);
  const p1StRef   = useRef('idle');
  const p2StRef   = useRef('idle');
  const roundRef  = useRef(1);

  p1PosRef.current = p1Progress;
  p2PosRef.current = p2Progress;
  p1ScoRef.current = p1Score;
  p2ScoRef.current = p2Score;
  p1StRef.current  = p1State;
  p2StRef.current  = p2State;
  roundRef.current = round;

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(difficulty, topic));
    setP1Answer('');
    setP2Answer('');
    setP1State('idle');
    setP2State('idle');
    setFeedback({ p1: '', p2: '' });
    setTimeLeft(QUESTION_TIME);
    setLocked(false);
  }, [difficulty, topic]);

  const triggerBoost = useCallback((player) => {
    if (player === 1) {
      setP1Boosting(true);
      setTimeout(() => setP1Boosting(false), 700);
    } else {
      setP2Boosting(true);
      setTimeout(() => setP2Boosting(false), 700);
    }
  }, []);

  const resolveRound = useCallback(() => {
    const p1 = p1PosRef.current;
    const p2 = p2PosRef.current;
    if (p1 >= WIN_PROGRESS) {
      onEnd(1, p1ScoRef.current, p2ScoRef.current, roundRef.current);
      return;
    }
    if (p2 >= WIN_PROGRESS) {
      onEnd(2, p1ScoRef.current, p2ScoRef.current, roundRef.current);
      return;
    }
    nextQuestion();
  }, [nextQuestion, onEnd]);

  const advanceCar = useCallback((player, correct, answerVal) => {
    if (player === 1) {
      if (correct) {
        setP1Progress(p => Math.min(p + ADVANCE_AMOUNT, WIN_PROGRESS));
        setP1Score(s => s + 10);
        setP1Streak(s => s + 1);
        setFeedback(f => ({ ...f, p1: '✓ Correct! +10 pts' }));
        triggerBoost(1);
      } else {
        setP1Streak(0);
        setFeedback(f => ({ ...f, p1: `✗ Answer: ${answerVal}` }));
      }
      setP1State(correct ? 'correct' : 'wrong');
    } else {
      if (correct) {
        setP2Progress(p => Math.min(p + ADVANCE_AMOUNT, WIN_PROGRESS));
        setP2Score(s => s + 10);
        setP2Streak(s => s + 1);
        setFeedback(f => ({ ...f, p2: '✓ Correct! +10 pts' }));
        triggerBoost(2);
      } else {
        setP2Streak(0);
        setFeedback(f => ({ ...f, p2: `✗ Answer: ${answerVal}` }));
      }
      setP2State(correct ? 'correct' : 'wrong');
    }
  }, [triggerBoost]);

  const submitAnswer = useCallback((player, value) => {
    const correct = parseInt(value, 10) === question.answer;
    advanceCar(player, correct, question.answer);
    if (correct) {
      setLocked(true);
      setRound(r => r + 1);
      setTimeout(resolveRound, 950);
    }
  }, [question.answer, advanceCar, resolveRound]);

  useEffect(() => {
    if (locked) return;
    if (p1State !== 'idle' && p2State !== 'idle') {
      setLocked(true);
      setRound(r => r + 1);
      setTimeout(resolveRound, 950);
    }
  }, [p1State, p2State, resolveRound, locked]);

  useEffect(() => {
    if (locked) { clearInterval(timerRef.current); return; }
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          const q = question;
          if (p1StRef.current === 'idle') {
            setP1State('wrong');
            setP1Streak(0);
            setFeedback(f => ({ ...f, p1: `Time! Answer: ${q.answer}` }));
          }
          if (p2StRef.current === 'idle') {
            setP2State('wrong');
            setP2Streak(0);
            setFeedback(f => ({ ...f, p2: `Time! Answer: ${q.answer}` }));
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [question, question.id, locked]);

  const handleP1Change  = useCallback(e => { if (p1State === 'idle') setP1Answer(e.target.value); }, [p1State]);
  const handleP2Change  = useCallback(e => { if (p2State === 'idle') setP2Answer(e.target.value); }, [p2State]);

  const handleP1KeyDown = useCallback(e => {
    if (e.key === 'Enter' && p1Answer !== '' && p1State === 'idle' && !locked) submitAnswer(1, p1Answer);
  }, [p1Answer, p1State, locked, submitAnswer]);

  const handleP2KeyDown = useCallback(e => {
    if (e.key === 'Enter' && p2Answer !== '' && p2State === 'idle' && !locked) submitAnswer(2, p2Answer);
  }, [p2Answer, p2State, locked, submitAnswer]);

  return (
    <div className="app-game-root">
      <div className="game-layout">
        <div className="game-header-bar">
          <div className="game-logo">Math Raceway</div>
          <button className="menu-btn" onClick={onMenu}>← Menu</button>
        </div>

        <Scoreboard
          p1Name={p1Name}   p2Name={p2Name}
          p1Score={p1Score} p2Score={p2Score}
          p1Streak={p1Streak} p2Streak={p2Streak}
          round={round}
        />
    <main className="game-area">
        <RaceTrack
          p1Progress={p1Progress} p2Progress={p2Progress}
          p1Name={p1Name}         p2Name={p2Name}
          p1Boosting={p1Boosting} p2Boosting={p2Boosting}
          track={track} p1Car={p1Car} p2Car={p2Car}
        />
        </main>

        <QuestionPanel
          question={question}
          difficulty={difficulty}
          timeLeft={timeLeft}
          p1Answer={p1Answer}  p2Answer={p2Answer}
          p1State={p1State}    p2State={p2State}
          locked={locked}
          feedback={feedback}
          onP1Change={handleP1Change}   onP2Change={handleP2Change}
          onP1KeyDown={handleP1KeyDown} onP2KeyDown={handleP2KeyDown}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('lobby');
  const [config, setConfig] = useState(null);
  const [result, setResult] = useState(null);
  const rematchKey = useRef(0);

  const handleStart = (p1, p2, diff, selectedTopic) => {
    setConfig({ p1, p2, diff, topic: selectedTopic });
    setScreen('garage');
  };

  const handleGarageStart = setup => {
    setConfig(current => ({ ...current, ...setup }));
    setScreen('game');
  };

  const handleEnd = (winner, p1Score, p2Score, rounds) => {
    setResult({ winner, p1Score, p2Score, rounds });
    setScreen('result');
  };

  const handleRematch = () => {
    rematchKey.current += 1;
    setResult(null);
    setScreen('game');
  };

  const handleMenu = () => {
    setConfig(null);
    setResult(null);
    setScreen('lobby');
  };

  return (
    <>
      {screen === 'lobby' && <Lobby onStart={handleStart} />}
      {screen === 'garage' && config && <Garage p1Name={config.p1} p2Name={config.p2} onBack={() => setScreen('lobby')} onStart={handleGarageStart} />}

      {screen === 'game' && config && (
        <GameScreen
          key={rematchKey.current}
          p1Name={config.p1}
          p2Name={config.p2}
          difficulty={config.diff}
          topic={config.topic}
          track={config.track} p1Car={config.p1Car} p2Car={config.p2Car}
          onEnd={handleEnd}
          onMenu={handleMenu}
        />
      )}

      {screen === 'result' && result && config && (
        <ResultScreen
          p1Name={config.p1}  p2Name={config.p2}
          winner={result.winner}
          p1Score={result.p1Score} p2Score={result.p2Score}
          rounds={result.rounds}
          onRematch={handleRematch}
          onMenu={handleMenu}
        />
      )}
    </>
  );
}
