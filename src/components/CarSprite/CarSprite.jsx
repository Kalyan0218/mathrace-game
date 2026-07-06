import './CarSprite.css';

export default function CarSprite({ isP1, boosting, size = 22 }) {
  const fill  = isP1 ? '#00c8ff' : '#ff3c5a';
  const body  = isP1 ? '#082030' : '#300810';
  const w     = size;
  const h     = size * 1.8;
  const cls   = `car-sprite-root${boosting ? ' boosting' : ''}`;
  const side  = isP1 ? 'p1' : 'p2';

  return (
    <div className={cls} style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 }}>
      <div className={`car-glow ${side}`} />
      <div className={`car-exhaust-trail ${side}`} />
      <svg width={w} height={h} viewBox="0 0 22 38" style={{ display: 'block' }}>
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
      </svg>
    </div>
  );
}
