import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROFESSIONALS } from '../../data/professionals'
import type { Professional } from '../../data/types'
import { ScreenHeader } from '../../components/ScreenHeader'
import { accentVars, Card, Tag } from '../../components/ui'
import { GuardrailBanner } from '../../components/GuardrailBanner'
import { Mascot } from '../../components/characters'
import { Confetti } from '../../components/motion'
import { useT } from '../../components/lang'

export function Referrals() {
  const navigate = useNavigate()
  const [booking, setBooking] = useState<Professional | null>(null)
  const [confirmed, setConfirmed] = useState<Professional | null>(null)
  const { t, rtl } = useT()

  if (confirmed) {
    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <Confetti />
        <motion.div initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 12 }}>
          <Mascot expr="happy" size={104} />
        </motion.div>
        <h2 className="text-[22px]">{t('Appointment requested')}</h2>
        <p className="text-sm font-semibold text-[var(--color-muted)]">
          {t('{name} · {slot}. You’ll get a confirmation shortly.', { name: t(confirmed.name), slot: t(confirmed.nextSlot) })}
        </p>
        <button onClick={() => { setConfirmed(null); navigate('/app') }} className="mt-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-bold text-white">
          {t('Back to home')}
        </button>
      </div>
    )
  }

  if (booking) {
    const { soft, color } = accentVars(booking.accent)
    return (
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex items-center gap-3 px-5 pb-2 pt-2">
          <button onClick={() => setBooking(null)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-lg shadow-[var(--shadow-card)]">{rtl ? '›' : '‹'}</button>
          <h2 className="text-[20px]">{t('Book appointment')}</h2>
        </div>
        <div className="px-5">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ background: soft }}>{booking.emoji}</div>
              <div>
                <p className="text-[16px] font-bold">{t(booking.name)}</p>
                <p className="text-[13px] font-semibold" style={{ color }}>{t(booking.role)}</p>
                <p className="text-xs font-semibold text-[var(--color-muted)]">{t(booking.credentials)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-[13px] font-semibold text-[var(--color-ink-soft)]">
              <Row label={t('Earliest slot')} value={t(booking.nextSlot)} />
              <Row label={t('Session fee')} value={t(booking.feePkr)} />
              <Row label={t('Location')} value={t(booking.city)} />
              <Row label={t('Languages')} value={booking.languages.map((l) => t(l)).join(rtl ? '، ' : ', ')} />
            </div>
          </Card>
        </div>
        <div className="px-5"><GuardrailBanner compact /></div>
        <div className="px-5">
          <button onClick={() => setConfirmed(booking)} className="w-full rounded-full bg-[var(--color-ink)] py-4 font-display text-[15px] font-medium text-white shadow-[var(--shadow-soft)]">
            {t('Confirm {slot}', { slot: t(booking.nextSlot) })}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      <ScreenHeader title={t('Find support')} subtitle={t('Vetted professionals near you')} />
      <div className="px-5"><GuardrailBanner /></div>
      <div className="flex flex-col gap-3 px-5">
        {PROFESSIONALS.map((p) => {
          const { soft, color } = accentVars(p.accent)
          return (
            <Card key={p.id} className="p-4">
              <div className="flex gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: soft }}>{p.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-[15px] font-bold">{t(p.name)}</p>
                    {p.verified && <span title="Verified" className="text-[var(--color-brand)]">✔️</span>}
                  </div>
                  <p className="text-[12px] font-bold" style={{ color }}>{t(p.role)}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-[var(--color-muted)]">
                    <span>⭐ {p.rating}</span>
                    <span>·</span>
                    <span>{t(p.city)}</span>
                    <span>·</span>
                    <span>{t(p.feePkr)}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.specialties.map((s) => (
                      <Tag key={s} accent={p.accent}>{t(s)}</Tag>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--color-line)] pt-3">
                <span className="text-[12px] font-bold text-[var(--color-ink-soft)]">🕑 {t(p.nextSlot)}</span>
                <button onClick={() => setBooking(p)} className="rounded-full bg-[var(--color-brand)] px-5 py-2 text-[13px] font-bold text-white">{t('Book')}</button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span className="font-bold text-[var(--color-ink)]">{value}</span>
    </div>
  )
}
