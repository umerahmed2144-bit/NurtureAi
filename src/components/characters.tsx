// Original cartoon characters for NurtureAI — all hand-drawn inline SVG, no
// external assets, themeable via the brand tokens. Nothing here derives from
// any existing/licensed character; the mascot is a friendly "Nurture Sprout".

export type Expr = 'happy' | 'wave' | 'cheer' | 'think'

function Face({ expr, cx = 60, cy = 74 }: { expr: Expr; cx?: number; cy?: number }) {
  const eyeY = cy - 6
  return (
    <g>
      {/* cheeks */}
      <circle cx={cx - 16} cy={cy + 4} r="5" fill="#ff9bb0" opacity="0.75" />
      <circle cx={cx + 16} cy={cy + 4} r="5" fill="#ff9bb0" opacity="0.75" />
      {/* eyes */}
      {expr === 'think' ? (
        <>
          <path d={`M${cx - 14} ${eyeY} q4 -4 8 0`} fill="none" stroke="#1a1d26" strokeWidth="3" strokeLinecap="round" />
          <circle cx={cx + 10} cy={eyeY} r="4.5" fill="#1a1d26" />
          <circle cx={cx + 11.5} cy={eyeY - 1.5} r="1.4" fill="#fff" />
        </>
      ) : (
        <>
          <circle cx={cx - 10} cy={eyeY} r="4.8" fill="#1a1d26" />
          <circle cx={cx + 10} cy={eyeY} r="4.8" fill="#1a1d26" />
          <circle cx={cx - 8.5} cy={eyeY - 1.6} r="1.5" fill="#fff" />
          <circle cx={cx + 11.5} cy={eyeY - 1.6} r="1.5" fill="#fff" />
        </>
      )}
      {/* mouth */}
      {expr === 'cheer' ? (
        <path d={`M${cx - 9} ${cy + 8} q9 12 18 0 q-9 4 -18 0Z`} fill="#e8506b" />
      ) : expr === 'think' ? (
        <circle cx={cx + 4} cy={cy + 10} r="3" fill="#1a1d26" />
      ) : (
        <path d={`M${cx - 9} ${cy + 8} q9 9 18 0`} fill="none" stroke="#1a1d26" strokeWidth="3" strokeLinecap="round" />
      )}
    </g>
  )
}

export function Mascot({
  expr = 'happy',
  size = 120,
  className = '',
  style,
}: {
  expr?: Expr
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  const wave = expr === 'wave' || expr === 'cheer'
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} style={style} role="img" aria-label="NurtureAI mascot">
      {/* stem */}
      <path d="M60 58 V40" stroke="#3f9d54" strokeWidth="5" strokeLinecap="round" />
      {/* left leaf */}
      <path d="M60 44 C44 40 34 26 40 16 C54 18 62 30 60 44 Z" fill="#6bbf59" />
      <path d="M60 44 C52 38 46 30 43 21" fill="none" stroke="#3f9d54" strokeWidth="2" strokeLinecap="round" />
      {/* right leaf — lifts up when waving/cheering */}
      <g style={{ transformOrigin: '60px 44px', transform: wave ? 'rotate(-26deg)' : 'none' }}>
        <path d="M60 44 C76 40 86 26 80 16 C66 18 58 30 60 44 Z" fill="#7ed86a" />
        <path d="M60 44 C68 38 74 30 77 21" fill="none" stroke="#3f9d54" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* body / seed */}
      <ellipse cx="60" cy="80" rx="30" ry="28" fill="#8fd97f" />
      <ellipse cx="60" cy="86" rx="21" ry="18" fill="#bff0af" />
      <Face expr={expr} cx={60} cy={78} />
      {/* little feet */}
      <ellipse cx="48" cy="106" rx="8" ry="5" fill="#3f9d54" />
      <ellipse cx="72" cy="106" rx="8" ry="5" fill="#3f9d54" />
    </svg>
  )
}

const SKIN = ['#f2c49b', '#d9a06b', '#a9724a', '#8a5a3c']
const HAIR = ['#2a2118', '#4a2f1a', '#6b4a2a', '#1a1d26']

export function KidAvatar({
  variant = 0,
  size = 44,
  className = '',
}: {
  variant?: number
  size?: number
  className?: string
}) {
  const skin = SKIN[variant % SKIN.length]
  const hair = HAIR[variant % HAIR.length]
  const bg = ['var(--color-grape-soft)', 'var(--color-mango-soft)', 'var(--color-sky-soft)', 'var(--color-grass-soft)'][variant % 4]
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} role="img" aria-label="Child avatar">
      <circle cx="32" cy="32" r="32" fill={bg} />
      {/* head */}
      <circle cx="32" cy="30" r="17" fill={skin} />
      {/* hair — varies by variant */}
      {variant % 4 === 0 && <path d="M15 30 C15 16 49 16 49 30 C49 22 44 15 32 15 C20 15 15 22 15 30 Z" fill={hair} />}
      {variant % 4 === 1 && <path d="M15 31 C13 14 51 14 49 31 L49 24 C49 17 41 13 32 13 C23 13 15 17 15 24 Z M15 31 C12 34 12 40 15 42 L18 32Z M49 31 C52 34 52 40 49 42 L46 32Z" fill={hair} />}
      {variant % 4 === 2 && <path d="M16 28 C16 15 48 15 48 28 C46 22 44 24 40 22 C36 18 28 18 24 22 C20 24 18 22 16 28Z" fill={hair} />}
      {variant % 4 === 3 && <><path d="M16 30 C16 16 48 16 48 30 C48 21 42 15 32 15 C22 15 16 21 16 30Z" fill={hair} /><circle cx="18" cy="20" r="6" fill={hair} /><circle cx="46" cy="20" r="6" fill={hair} /></>}
      {/* face */}
      <circle cx="26" cy="30" r="2.4" fill="#1a1d26" />
      <circle cx="38" cy="30" r="2.4" fill="#1a1d26" />
      <circle cx="23" cy="35" r="2.6" fill="#ff9bb0" opacity="0.7" />
      <circle cx="41" cy="35" r="2.6" fill="#ff9bb0" opacity="0.7" />
      <path d="M27 37 q5 5 10 0" fill="none" stroke="#1a1d26" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

type Animal = 'fox' | 'owl' | 'cat' | 'rabbit'

export function CartoonAnimal({
  kind,
  size = 56,
  className = '',
  style,
}: {
  kind: Animal
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg viewBox="0 0 72 72" width={size} height={size} className={className} style={style} role="img" aria-label={`Cartoon ${kind}`}>
      {kind === 'fox' && (
        <g>
          <path d="M14 20 L24 38 L14 40 Z" fill="#f2843c" /><path d="M58 20 L48 38 L58 40 Z" fill="#f2843c" />
          <path d="M36 20 C20 20 16 34 20 46 C24 58 48 58 52 46 C56 34 52 20 36 20Z" fill="#f4924e" />
          <path d="M28 44 C28 54 44 54 44 44 C44 40 28 40 28 44Z" fill="#fff" />
          <circle cx="28" cy="38" r="3" fill="#1a1d26" /><circle cx="44" cy="38" r="3" fill="#1a1d26" />
          <path d="M33 47 l3 3 l3 -3Z" fill="#1a1d26" />
        </g>
      )}
      {kind === 'owl' && (
        <g>
          <path d="M18 24 C18 12 30 12 32 22 M54 24 C54 12 42 12 40 22" fill="#8a6a4a" />
          <ellipse cx="36" cy="42" rx="22" ry="24" fill="#9b7b57" />
          <circle cx="27" cy="38" r="9" fill="#fff" /><circle cx="45" cy="38" r="9" fill="#fff" />
          <circle cx="27" cy="38" r="4" fill="#1a1d26" /><circle cx="45" cy="38" r="4" fill="#1a1d26" />
          <path d="M32 44 l4 5 l4 -5Z" fill="#f2a03c" />
          <path d="M26 60 l6 6 M46 60 l-6 6" stroke="#f2a03c" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {kind === 'cat' && (
        <g>
          <path d="M18 22 L26 38 L14 38 Z" fill="#a0a7b4" /><path d="M54 22 L46 38 L58 38 Z" fill="#a0a7b4" />
          <ellipse cx="36" cy="44" rx="22" ry="20" fill="#b7bec9" />
          <circle cx="28" cy="42" r="3" fill="#1a1d26" /><circle cx="44" cy="42" r="3" fill="#1a1d26" />
          <path d="M34 48 l2 2 l2 -2Z" fill="#ff9bb0" />
          <path d="M20 48 H30 M20 52 H30 M42 48 H52 M42 52 H52" stroke="#1a1d26" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </g>
      )}
      {kind === 'rabbit' && (
        <g>
          <ellipse cx="28" cy="20" rx="6" ry="16" fill="#f0e4ea" /><ellipse cx="44" cy="20" rx="6" ry="16" fill="#f0e4ea" />
          <ellipse cx="28" cy="20" rx="2.6" ry="10" fill="#ff9bb0" /><ellipse cx="44" cy="20" rx="2.6" ry="10" fill="#ff9bb0" />
          <ellipse cx="36" cy="46" rx="20" ry="18" fill="#f7eef2" />
          <circle cx="29" cy="44" r="3" fill="#1a1d26" /><circle cx="43" cy="44" r="3" fill="#1a1d26" />
          <path d="M34 50 l2 2 l2 -2Z" fill="#ff9bb0" />
        </g>
      )}
    </svg>
  )
}
