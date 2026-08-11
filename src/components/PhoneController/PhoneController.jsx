import { useEffect, useState } from 'react';
import './PhoneController.css';

const KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '-'];

export default function PhoneController({ code }) {
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(null);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('Connecting to the race…');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/games?code=${encodeURIComponent(code)}`);
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error);
        if (!active) return;
        setGame(payload.game);
        if (payload.game?.state) setMessage('Ready for the next question');
      } catch (error) {
        if (active) setMessage(error.message || 'Unable to connect to this room.');
      }
    };
    load();
    const interval = setInterval(load, 700);
    return () => { active = false; clearInterval(interval); };
  }, [code]);

  const state = game?.state;
  const playerState = player === 1 ? state?.p1State : state?.p2State;
  const enabled = Boolean(player && state && !state.locked && playerState === 'idle');

  useEffect(() => setAnswer(''), [state?.questionId]);

  const press = key => {
    if (!enabled) return;
    if (key === '.' && answer.includes('.')) return;
    if (key === '-' && answer) return;
    setAnswer(current => current + key);
  };

  const submit = async () => {
    if (!enabled || !answer) return;
    setMessage('Sending answer…');
    try {
      const response = await fetch('/api/games', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'answer', code, player, answer, questionId: state.questionId }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      setMessage('Answer sent to the board!');
    } catch (error) {
      setMessage(error.message || 'Could not send your answer.');
    }
  };

  return <main className="phone-controller">
    <div className="phone-brand">Math Raceway</div>
    <div className="phone-room">Room {code}</div>
    {!player ? <section className="phone-card"><h1>Choose your racer</h1><p>{state ? 'Use the colour assigned to you on the board.' : message}</p><button className="racer-button p1" onClick={() => setPlayer(1)}>{state?.p1Name || 'Player 1'}</button><button className="racer-button p2" onClick={() => setPlayer(2)}>{state?.p2Name || 'Player 2'}</button></section> : <section className="phone-card">
      <div className={`phone-player p${player}`}>Playing as {player === 1 ? state?.p1Name : state?.p2Name}</div>
      <div className="phone-question">{state?.questionText || 'Waiting for the board…'}</div>
      <div className="phone-answer">{answer || '0'}</div>
      <div className="phone-keypad">{KEYS.map(key => <button key={key} onClick={() => press(key)} disabled={!enabled}>{key}</button>)}</div>
      <div className="phone-actions"><button onClick={() => setAnswer(current => current.slice(0, -1))} disabled={!enabled}>Delete</button><button onClick={() => setAnswer('')} disabled={!enabled}>Clear</button><button className="phone-submit" onClick={submit} disabled={!enabled || !answer}>Submit</button></div>
      <p className="phone-message">{enabled ? message : playerState === 'correct' ? 'Correct — your car is moving!' : playerState === 'wrong' ? 'Answer received. Wait for the next question.' : message}</p>
    </section>}
  </main>;
}
