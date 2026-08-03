import React from 'react';
import CarSprite from '../CarSprite/CarSprite';
import './Garage.css';

export const TRACKS = [
  { id: 'classic', name: 'Neon Circuit', description: 'A balanced technical circuit' },
  { id: 'canyon', name: 'Canyon Run', description: 'Fast sweeping desert curves' },
  { id: 'metro', name: 'Metro Loop', description: 'A tight midnight city loop' },
];

export const CARS = [
  { id: 'nova', name: 'Nova GT', description: 'Balanced neon racer' },
  { id: 'bolt', name: 'Bolt Buggy', description: 'Rugged all-terrain sprinter' },
  { id: 'comet', name: 'Comet X', description: 'Sharp, lightweight rocket car' },
];

function CarOption({ car, selected, onClick, player }) {
  return <button className={`garage-car-card${selected ? ' selected' : ''}`} onClick={onClick} type="button">
    <span className="garage-car-preview"><CarSprite model={car.id} isP1={player === 1} size={42} /></span>
    <span className="garage-card-name">{car.name}</span><span className="garage-card-copy">{car.description}</span>
  </button>;
}

export default function Garage({ p1Name, p2Name, onBack, onStart }) {
  const [track, setTrack] = React.useState('classic');
  const [p1Car, setP1Car] = React.useState('nova');
  const [p2Car, setP2Car] = React.useState('comet');
  return <div className="garage-root"><section className="garage-panel">
    <div className="garage-heading"><div><div className="garage-kicker">Race preparation</div><h1>Choose your ride</h1><p>Select a circuit and a car for each racer.</p></div><button className="garage-back" type="button" onClick={onBack}>← Lobby</button></div>
    <div className="garage-section"><h2>Track</h2><div className="track-options">{TRACKS.map(item => <button key={item.id} type="button" className={`track-option ${item.id}${track === item.id ? ' selected' : ''}`} onClick={() => setTrack(item.id)}><span className="track-map"><i /><i /></span><span className="garage-card-name">{item.name}</span><span className="garage-card-copy">{item.description}</span></button>)}</div></div>
    <div className="garage-player-grid"><div className="garage-section player-one"><h2>{p1Name}'s car</h2><div className="garage-car-options">{CARS.map(car => <CarOption key={car.id} car={car} player={1} selected={p1Car === car.id} onClick={() => setP1Car(car.id)} />)}</div></div><div className="garage-section player-two"><h2>{p2Name}'s car</h2><div className="garage-car-options">{CARS.map(car => <CarOption key={car.id} car={car} player={2} selected={p2Car === car.id} onClick={() => setP2Car(car.id)} />)}</div></div></div>
    <button className="start-btn garage-start" type="button" onClick={() => onStart({ track, p1Car, p2Car })}>Start race →</button>
  </section></div>;
}
