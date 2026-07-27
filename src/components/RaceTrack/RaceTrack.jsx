import { useEffect, useRef, useCallback } from 'react';
import CarSprite from '../CarSprite/CarSprite';
import './RaceTrack.css';

const VW = 900;
const VH = 520;

// A single closed centreline prevents the two sides of the track from crossing
// over one another in the chicane.
const CENTER_PATH =
  'M 160,420 ' +
  'L 730,420 ' +
  'C 800,420 845,390 845,325 ' +
  'L 845,270 ' +
  'C 845,205 800,175 730,175 ' +
  'C 650,175 590,190 540,238 ' +
  'C 505,273 480,298 448,292 ' +
  'C 416,286 402,250 382,212 ' +
  'C 350,152 300,105 225,105 ' +
  'C 130,105 60,165 60,265 ' +
  'C 60,350 95,395 160,420 Z';

const ROAD_WIDTH = 76;
const LANE_OFFSET = 18;

// const CENTER_PATH = `
// M 150 410
// C 90 410, 70 330, 70 250
// C 70 130, 130 70, 240 70
// C 360 70, 430 120, 500 230
// C 550 310, 620 330, 700 250
// C 760 190, 840 170, 980 170
// C 1100 170, 1160 220, 1160 320
// C 1160 430, 1090 470, 950 470
// L 260 470
// C 190 470, 160 450, 150 410
// `;



function TrackSVG({ svgRef }) {
  return (
    <svg
      ref={svgRef}
      className="track-svg"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="finish-checkers" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#f7f3e8" />
          <path d="M 0,0 H 5 V 5 H 0 Z M 5,5 H 10 V 10 H 5 Z" fill="#171020" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={VW} height={VH} className="track-grass-outer" />

     
      <path d={CENTER_PATH} fill="none" stroke="#cc2200" strokeWidth={ROAD_WIDTH + 12} strokeLinecap="round" strokeLinejoin="round" />
      <path d={CENTER_PATH} fill="none" stroke="#f5f5f5" strokeWidth={ROAD_WIDTH + 6} strokeDasharray="14 14" strokeLinecap="butt" strokeLinejoin="round" />
      <path d={CENTER_PATH} fill="none" stroke="#3d3d3d" strokeWidth={ROAD_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
      <path d={CENTER_PATH} fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="2" strokeDasharray="18 14" />

      <rect x="205" y="382" width="10" height={ROAD_WIDTH} fill="url(#finish-checkers)" />
      <text x="210" y="370" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="monospace" letterSpacing="1">START / FINISH</text>

      

      

   

      <circle cx="680" cy="360" r="8"  fill="#2d5a1b" stroke="#3a7a22" strokeWidth="2" />
      <circle cx="695" cy="350" r="7"  fill="#3a7a22" />
      <circle cx="672" cy="352" r="6"  fill="#2d5a1b" />

      <circle cx="170" cy="320" r="9"  fill="#2d5a1b" stroke="#3a7a22" strokeWidth="2" />
      <circle cx="155" cy="310" r="7"  fill="#3a7a22" />
    </svg>
//     <svg
//     className="track-svg"
//     viewBox="0 0 1250 600"
//     preserveAspectRatio="xMidYMid meet"
// >

//     {/* Grass */}
//     <rect
//         width="1250"
//         height="600"
//         fill="#357d22"
//     />

//     {/* Outer Kerb */}
//     <path
//         d={CENTER_PATH}
//         fill="none"
//         stroke="#ff2b00"
//         strokeWidth={ROAD_WIDTH + 16}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//     />

//     {/* White Kerb */}
//     <path
//         d={CENTER_PATH}
//         fill="none"
//         stroke="white"
//         strokeWidth={ROAD_WIDTH + 8}
//         strokeDasharray="18 18"
//         strokeLinecap="round"
//     />

//     {/* Asphalt */}
//     <path
//         d={CENTER_PATH}
//         fill="none"
//         stroke="#444"
//         strokeWidth={ROAD_WIDTH}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//     />

//     {/* Centre Line */}
//     <path
//         d={CENTER_PATH}
//         fill="none"
//         stroke="#666"
//         strokeWidth="3"
//         strokeDasharray="22 22"
//     />

//     {/* Inner Kerb */}
//     <path
//         d={CENTER_PATH}
//         fill="none"
//         stroke="#ff2b00"
//         strokeWidth={ROAD_WIDTH - 12}
//         strokeLinecap="round"
//     />

//     <path
//         d={CENTER_PATH}
//         fill="none"
//         stroke="white"
//         strokeWidth={ROAD_WIDTH - 20}
//         strokeDasharray="18 18"
//         strokeLinecap="round"
//     />

// </svg>
  );
}

export default function RaceTrack({
  p1Progress,
  p2Progress,
  p1Name,
  p2Name,
  p1Boosting,
  p2Boosting,
}) {
  const svgRef      = useRef(null);
  const pathRef     = useRef(null);
  const p1CarRef    = useRef(null);
  const p2CarRef    = useRef(null);
  const p1ProgRef   = useRef(p1Progress);
  const p2ProgRef   = useRef(p2Progress);
  const rafRef      = useRef(null);
  const p1AnimRef   = useRef(p1Progress);
  const p2AnimRef   = useRef(p2Progress);

  p1ProgRef.current = p1Progress;
  p2ProgRef.current = p2Progress;

  const getPathEl = useCallback(() => {
    if (pathRef.current) return pathRef.current;
    if (!svgRef.current) return null;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.setAttribute('d', CENTER_PATH);
    el.style.visibility = 'hidden';
    svgRef.current.appendChild(el);
    pathRef.current = el;
    return el;
  }, []);

  const placeCar = useCallback((carEl, progress, laneOffset) => {
    const p = getPathEl();
    if (!p || !carEl || !svgRef.current) return;
    const len     = p.getTotalLength();
    const dist    = progress * len;
    const pt      = p.getPointAtLength(dist);
    const ptBefore = p.getPointAtLength(Math.max(dist - 2, 0));
    const ptAhead = p.getPointAtLength(Math.min(dist + 2, len));
    const dx = ptAhead.x - ptBefore.x;
    const dy = ptAhead.y - ptBefore.y;
    const tangentLength = Math.hypot(dx, dy) || 1;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    // Offset each car along the path normal, keeping them in separate lanes
    // through every bend rather than separating them only at the start.
    const laneX = pt.x + (-dy / tangentLength) * laneOffset;
    const laneY = pt.y + (dx / tangentLength) * laneOffset;

    const svgW = svgRef.current.viewBox.baseVal.width;
    const svgH = svgRef.current.viewBox.baseVal.height;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = rect.width  / svgW;
    const scaleY = rect.height / svgH;

    carEl.style.left      = `${laneX * scaleX}px`;
    carEl.style.top       = `${laneY * scaleY}px`;
    carEl.style.transform = `rotate(${angle}deg)`;
  }, [getPathEl]);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      p1AnimRef.current = lerp(p1AnimRef.current, p1ProgRef.current, 0.07);
      p2AnimRef.current = lerp(p2AnimRef.current, p2ProgRef.current, 0.07);
      placeCar(p1CarRef.current, p1AnimRef.current, -LANE_OFFSET);
      placeCar(p2CarRef.current, p2AnimRef.current, LANE_OFFSET);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [placeCar]);

  return (
    <div className="track-root">
      <div style={{ position: 'relative' }}>
        <TrackSVG svgRef={svgRef} />
        <div className="track-car-layer">
          <div ref={p1CarRef} className="track-car-pos">
            <CarSprite isP1={true}  boosting={p1Boosting} size={20} />
          </div>
          <div ref={p2CarRef} className="track-car-pos">
            <CarSprite isP1={false} boosting={p2Boosting} size={20} />
          </div>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-lane">
          <div className="progress-bar-name p1">{p1Name}</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill p1" style={{ width: `${p1Progress * 100}%` }} />
          </div>
          <div className="progress-pct p1">{Math.round(p1Progress * 100)}%</div>
        </div>
        <div className="progress-bar-lane">
          <div className="progress-bar-name p2">{p2Name}</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill p2" style={{ width: `${p2Progress * 100}%` }} />
          </div>
          <div className="progress-pct p2">{Math.round(p2Progress * 100)}%</div>
        </div>
      </div>
    </div>
  );
}
