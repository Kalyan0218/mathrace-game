import './CarSprite.css';

export default function CarSprite({ isP1, boosting, size = 22, model = 'nova' }) {
  const palette = model === 'bolt'
    ? (isP1 ? ['#b8f23d', '#20340d'] : ['#ff9e3d', '#3a1908'])
    : model === 'comet'
      ? (isP1 ? ['#a48cff', '#1f153f'] : ['#ff65b7', '#3c0828'])
      : (isP1 ? ['#00c8ff', '#082030'] : ['#ff3c5a', '#300810']);
  const [fill, body] = palette;
  const w     = size;
  const h     = size * 1.8;
  const cls   = `car-sprite-root${boosting ? ' boosting' : ''}`;
  const side  = isP1 ? 'p1' : 'p2';

  return (
    <div className={cls} style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 }}>
      <div className={`car-glow ${side}`} />
      <div className={`car-exhaust-trail ${side}`} />
      <svg width={w} height={h} viewBox="0 0 22 38" style={{ display: 'block' }}>
        {model === 'bolt' && <>
          <ellipse cx="11" cy="30" rx="10" ry="3" fill="rgba(0,0,0,0.35)" />
          <path d="M4 7 L18 7 L20 29 Q20 33 16 34 L6 34 Q2 33 2 29 Z" fill={fill} />
          <path d="M6 11 Q11 7 16 11 L17 21 L5 21 Z" fill={body} />
          <path d="M5 6 L17 6 L19 10 L3 10 Z" fill={fill} opacity=".78" />
          <rect x="1" y="9" width="3" height="9" rx="1" fill="#111" /><rect x="18" y="9" width="3" height="9" rx="1" fill="#111" />
          <rect x="1" y="25" width="4" height="7" rx="1.5" fill="#111" /><rect x="17" y="25" width="4" height="7" rx="1.5" fill="#111" />
          <circle cx="7" cy="27" r="1.5" fill="#fff7bf" /><circle cx="15" cy="27" r="1.5" fill="#fff7bf" />
        </>}
        {model === 'comet' && <>
          <ellipse cx="11" cy="31" rx="8" ry="2.5" fill="rgba(0,0,0,0.35)" />
          <path d="M11 1 C17 8 19 18 18 31 L4 31 C3 18 5 8 11 1 Z" fill={fill} />
          <path d="M11 7 C15 12 16 19 15 23 L7 23 C6 19 7 12 11 7 Z" fill={body} />
          <path d="M4 20 L1 27 L7 26 Z M18 20 L21 27 L15 26 Z" fill={fill} opacity=".85" />
          <path d="M7 32 L5 37 L10 33 Z M15 32 L17 37 L12 33 Z" fill="#ffdb5d" />
          <circle cx="11" cy="16" r="2" fill={fill} opacity=".55" />
        </>}
        {model === 'nova' && <>
        <ellipse cx="11" cy="30" rx="9" ry="3" fill="rgba(0,0,0,0.35)" />
        <rect x="3" y="6" width="16" height="26" rx="6" fill={fill} />
        <rect x="5" y="10" width="12" height="14" rx="4" fill={body} />
        <rect x="6" y="12" width="4" height="5"  rx="1.5" fill={fill} opacity="0.5" />
        <rect x="12" y="12" width="4" height="5" rx="1.5" fill={fill} opacity="0.5" />
        <polygon points="11,1 14,7 8,7" fill={fill} opacity="0.9" />
        <rect x="1"  y="10" width="3"  height="8" rx="1.5" fill={fill} opacity="0.7" />
        <rect x="18" y="10" width="3"  height="8" rx="1.5" fill={fill} opacity="0.7" />
        <rect x="2"  y="27" width="4"  height="5" rx="2"   fill="#111" stroke={fill} strokeWidth="1" />
        <rect x="16" y="27" width="4"  height="5" rx="2"   fill="#111" stroke={fill} strokeWidth="1" />
        <rect x="2"  y="7"  width="4"  height="5" rx="2"   fill="#111" stroke={fill} strokeWidth="1" />
        <rect x="16" y="7"  width="4"  height="5" rx="2"   fill="#111" stroke={fill} strokeWidth="1" />
        <circle cx="11" cy="19" r="2.5" fill={fill} opacity="0.4" />
        </>}
      </svg>
    </div>
  );
}
