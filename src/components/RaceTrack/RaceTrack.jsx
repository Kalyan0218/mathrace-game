import { useEffect, useRef, useCallback } from 'react';
import CarSprite from '../CarSprite/CarSprite';
import './RaceTrack.css';

const VW = 900;
const VH = 520;

const TRACK_PATH =
  'M 160,440 ' +
  'L 740,440 ' +
  'Q 820,440 820,370 ' +
  'L 820,300 ' +
  'Q 820,230 750,215 ' +
  'Q 680,200 610,215 ' +
  'Q 540,230 510,270 ' +
  'Q 480,310 450,310 ' +
  'Q 420,310 400,290 ' +
  'Q 380,270 370,240 ' +
  'Q 360,200 330,175 ' +
  'Q 290,145 230,145 ' +
  'Q 160,145 115,190 ' +
  'Q 70,235 70,300 ' +
  'Q 70,365 110,405 ' +
  'Q 135,430 160,440 ' +
  'Z';

const INNER_PATH =
  'M 210,400 ' +
  'L 700,400 ' +
  'Q 760,400 760,345 ' +
  'L 760,315 ' +
  'Q 760,265 705,253 ' +
  'Q 658,243 615,253 ' +
  'Q 575,263 553,295 ' +
  'Q 528,330 495,340 ' +
  'Q 462,350 438,332 ' +
  'Q 414,314 400,283 ' +
  'Q 385,248 357,220 ' +
  'Q 322,188 265,185 ' +
  'Q 198,182 160,222 ' +
  'Q 125,260 128,310 ' +
  'Q 131,358 165,385 ' +
  'Q 185,400 210,400 ' +
  'Z';

const CENTER_PATH =
  'M 185,420 ' +
  'L 720,420 ' +
  'Q 790,420 790,357 ' +
  'L 790,330 ' +
  'Q 790,248 728,234 ' +
  'Q 669,221 613,234 ' +
  'Q 558,247 531,282 ' +
  'Q 504,320 473,325 ' +
  'Q 441,330 420,311 ' +
  'Q 397,290 385,261 ' +
  'Q 373,224 344,198 ' +
  'Q 306,165 248,165 ' +
  'Q 179,163 138,206 ' +
  'Q 98,248 99,305 ' +
  'Q 100,362 137,395 ' +
  'Q 158,413 185,420 ' +
  'Z';


const OUTER2_PATH =
  'M 155,443 ' +
  'L 743,443 ' +
  'Q 828,443 828,368 ' +
  'L 828,298 ' +
  'Q 828,222 752,212 ' +
  'Q 678,202 608,213 ' +
  'Q 535,224 505,267 ' +
  'Q 476,308 448,313 ' +
  'Q 422,318 400,296 ' +
  'Q 377,273 367,237 ' +
  'Q 356,196 324,170 ' +
  'Q 283,138 225,138 ' +
  'Q 152,136 105,183 ' +
  'Q 58,230 60,302 ' +
  'Q 62,374 105,412 ' +
  'Q 130,435 155,443 ' +
  'Z';
// const ROAD_WIDTH = 90;

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
function buildKerbPoints(pathEl, count, offset) {
  if (!pathEl) return [];
  const len = pathEl.getTotalLength();
  const pts = [];
  for (let i = 0; i < count; i++) {
    const t0 = (i / count) * len;
    const t1 = ((i + 0.5) / count) * len;
    pts.push({ t0, t1, even: i % 2 === 0 });
  }
  return pts;
}

function KerbStripes({ pathData, count = 80, color1 = '#cc2200', color2 = '#f5f5f5', strokeW = 4 }) {
  const ref = useRef(null);
  const stripes = useRef([]);

  useEffect(() => {
    if (!ref.current) return;
    stripes.current = buildKerbPoints(ref.current, count, 0);
  }, [count]);

  return (
    <g>
      <path ref={ref} d={pathData} fill="none" stroke="none" />
      {stripes.current.map((s, i) => {
        if (!ref.current) return null;
        const len = ref.current.getTotalLength();
        const p0 = ref.current.getPointAtLength(s.t0);
        const p1 = ref.current.getPointAtLength(s.t1);
        return (
          <line
            key={i}
            x1={p0.x} y1={p0.y}
            x2={p1.x} y2={p1.y}
            stroke={s.even ? color1 : color2}
            strokeWidth={strokeW}
            strokeLinecap="butt"
          />
        );
      })}
    </g>
  );
}

function TrackSVG({ svgRef }) {
  return (
    <svg
      ref={svgRef}
      className="track-svg"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width={VW} height={VH} className="track-grass-outer" />

      <path d={OUTER2_PATH} fill="#2a2a2a" />
      <path d={TRACK_PATH}  className="track-surface" />

      <path d={INNER_PATH}  className="track-grass-inner" />

      <path d={CENTER_PATH} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" strokeDasharray="18 14" />

      <path d={OUTER2_PATH}  fill="none" stroke="#cc2200" strokeWidth="6" />
      <path d={OUTER2_PATH}  fill="none" stroke="#f5f5f5" strokeWidth="2" strokeDasharray="14 14" />

      <path d={TRACK_PATH}  fill="none" stroke="#cc2200" strokeWidth="5" />
      <path d={TRACK_PATH}  fill="none" stroke="#f5f5f5" strokeWidth="2" strokeDasharray="14 14" />

      <path d={INNER_PATH}  fill="none" stroke="#cc2200" strokeWidth="5" />
      <path d={INNER_PATH}  fill="none" stroke="#f5f5f5" strokeWidth="2" strokeDasharray="14 14" />

      <rect x="182" y="426" width="60" height="8" fill="none"
        stroke="#ffffff" strokeWidth="8"
        strokeDasharray="8 8"
      />
      <text x="186" y="423" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="2">START/FINISH</text>

      <rect x="50" y="270" width="20" height="90" rx="4" fill="#1a3a0a" stroke="#2a5a15" strokeWidth="1" />
      <rect x="55" y="275" width="10" height="12" rx="2" fill="#888" />
      <rect x="55" y="290" width="10" height="12" rx="2" fill="#888" />

      <rect x="340" y="125" width="90" height="55" rx="6" fill="#c8c0a0" stroke="#a09878" strokeWidth="2" />
      <rect x="344" y="129" width="82" height="47" rx="4" fill="#b8b098" />
      <rect x="352" y="135" width="14" height="14" rx="2" fill="#e8e0c8" />
      <rect x="372" y="135" width="14" height="14" rx="2" fill="#e8e0c8" />
      <rect x="392" y="135" width="14" height="14" rx="2" fill="#e8e0c8" />
      <rect x="352" y="155" width="14" height="14" rx="2" fill="#e8e0c8" />
      <rect x="372" y="155" width="14" height="14" rx="2" fill="#e8e0c8" />
      <rect x="392" y="155" width="14" height="14" rx="2" fill="#e8e0c8" />

      <circle cx="430" cy="310" r="10" fill="#2d5a1b" stroke="#3a7a22" strokeWidth="2" />
      <circle cx="445" cy="300" r="8"  fill="#2d5a1b" stroke="#3a7a22" strokeWidth="2" />
      <circle cx="425" cy="298" r="9"  fill="#3a7a22" />

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

  const placeCar = useCallback((carEl, progress) => {
    const p = getPathEl();
    if (!p || !carEl || !svgRef.current) return;
    const len     = p.getTotalLength();
    const dist    = progress * len;
    const pt      = p.getPointAtLength(dist);
    const ptAhead = p.getPointAtLength(Math.min(dist + 4, len));
    const angle   = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI) + 90;

    const svgW = svgRef.current.viewBox.baseVal.width;
    const svgH = svgRef.current.viewBox.baseVal.height;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = rect.width  / svgW;
    const scaleY = rect.height / svgH;

    carEl.style.left      = `${pt.x * scaleX}px`;
    carEl.style.top       = `${pt.y * scaleY}px`;
    carEl.style.transform = `rotate(${angle}deg)`;
  }, [getPathEl]);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      p1AnimRef.current = lerp(p1AnimRef.current, p1ProgRef.current, 0.07);
      p2AnimRef.current = lerp(p2AnimRef.current, p2ProgRef.current, 0.07);
      placeCar(p1CarRef.current, p1AnimRef.current);
      placeCar(p2CarRef.current, p2AnimRef.current);
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
