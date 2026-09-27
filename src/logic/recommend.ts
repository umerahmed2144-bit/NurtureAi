import { ACTIVITY_LIBRARY } from '../data/activities'
import type { Activity, Child, DevelopmentArea, DomainKey } from '../data/types'

export interface Recommendation extends Activity {
  reason: string
  matchedInterest?: string
}

// Priority domains = the child's stated concerns first, then any dashboard area
// that needs monitoring/attention, then the rest.
function priorityDomains(child: Child, areas: DevelopmentArea[]): DomainKey[] {
  const flagged = areas
    .filter((a) => a.status === 'monitor' || a.status === 'attention')
    .map((a) => a.key)
  const merged = [...child.concerns, ...flagged]
  return Array.from(new Set(merged))
}

function scoreActivity(activity: Activity, child: Child, priority: DomainKey[]): number {
  let score = 0
  const domainRank = priority.indexOf(activity.domain)
  if (domainRank >= 0) score += 100 - domainRank * 10
  // Interest match is the differentiator, big boost.
  if (activity.interestTag !== 'any' && child.interests.includes(activity.interestTag)) score += 60
  if (activity.interestTag === 'any') score += 8
  return score
}

// The scripted "AI": deterministic, interest-aware activity matching.
export function recommendActivities(
  child: Child,
  areas: DevelopmentArea[],
  limit = 3,
): Recommendation[] {
  const priority = priorityDomains(child, areas)

  const ranked = ACTIVITY_LIBRARY.map((a) => ({ a, s: scoreActivity(a, child, priority) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)

  const picked: Recommendation[] = []
  const usedDomains = new Set<DomainKey>()

  for (const { a } of ranked) {
    // spread across domains so recommendations feel varied
    if (usedDomains.has(a.domain) && picked.length < ACTIVITY_LIBRARY.length) continue
    const matchedInterest =
      a.interestTag !== 'any' && child.interests.includes(a.interestTag) ? a.interestTag : undefined
    picked.push({ ...a, matchedInterest, reason: reasonFor(a, child, matchedInterest) })
    usedDomains.add(a.domain)
    if (picked.length >= limit) break
  }

  return picked
}

function reasonFor(a: Activity, child: Child, interest?: string): string {
  if (interest) {
    return `Chosen because ${child.name} loves ${interest.toLowerCase()}, pairing it with ${a.domain.replace('_', ' ')} keeps them engaged.`
  }
  return `Targets ${a.domain.replace('_', ' ')}, an area ${child.name} is currently building.`
}
