export function GuardrailBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl px-4 py-3"
      style={{ background: 'var(--color-brand-soft)' }}
    >
      <span className="mt-0.5 text-lg">🛡️</span>
      <p className="text-[12px] font-semibold leading-snug text-[var(--color-brand-strong)]">
        {compact
          ? 'NurtureAI does not diagnose. This is a suggestion to seek professional assessment.'
          : 'NurtureAI surfaces patterns worth attention, it never diagnoses. Any assessment or diagnosis is made only by the qualified professional you choose.'}
      </p>
    </div>
  )
}
