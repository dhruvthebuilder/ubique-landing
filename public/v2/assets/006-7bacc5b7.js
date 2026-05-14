const iconBase = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

function ArrowRight({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
function ArrowUpRight({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
function Check({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}
function MessageCircle({ size = 24, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <path d="M7.9 20.5 4 21l1-3.9A9 9 0 1 1 7.9 20.5Z" />
    </svg>
  );
}
function Phone({ size = 24, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <path d="M22 16.92v2.85a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h2.85a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.29-1.12a2 2 0 0 1 2.11-.45c.89.34 1.83.57 2.79.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function Video({ size = 24, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <path d="m23 7-7 5 7 5V7Z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}
function Instagram({ size = 14, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function PlayCircle({ size = 18, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4V8Z" fill="currentColor" />
    </svg>
  );
}

Object.assign(window, {
  IconArrowRight: ArrowRight, IconArrowUpRight: ArrowUpRight, IconCheck: Check,
  IconMessageCircle: MessageCircle, IconPhone: Phone, IconVideo: Video,
  IconInstagram: Instagram, IconPlayCircle: PlayCircle,
});
