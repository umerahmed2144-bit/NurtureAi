import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AssessmentAnswers, Child, Observation } from '../data/types'
import { seedAssessments, seedChildren, seedObservations } from './seed'

const KEY = 'nurtureai.demo.v2'

interface Persisted {
  children: Child[]
  observations: Observation[]
  assessments: AssessmentAnswers[]
  activeChildId: string | null
}

function freshState(): Persisted {
  const children = seedChildren()
  return {
    children,
    observations: seedObservations(),
    assessments: seedAssessments(),
    activeChildId: children[0]?.id ?? null,
  }
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Persisted
  } catch {
    /* ignore */
  }
  return freshState()
}

interface DemoContextValue extends Persisted {
  activeChild: Child | null
  observationsFor: (childId: string) => Observation[]
  assessmentFor: (childId: string) => AssessmentAnswers | undefined
  setActiveChild: (id: string) => void
  addChild: (child: Child) => void
  addObservation: (obs: Observation) => void
  saveAssessment: (a: AssessmentAnswers) => void
  resetDemo: () => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  const setActiveChild = useCallback((id: string) => {
    setState((s) => ({ ...s, activeChildId: id }))
  }, [])

  const addChild = useCallback((child: Child) => {
    setState((s) => ({
      ...s,
      children: [...s.children.filter((c) => c.id !== child.id), child],
      activeChildId: child.id,
    }))
  }, [])

  const addObservation = useCallback((obs: Observation) => {
    setState((s) => ({ ...s, observations: [...s.observations, obs] }))
  }, [])

  const saveAssessment = useCallback((a: AssessmentAnswers) => {
    setState((s) => ({
      ...s,
      assessments: [...s.assessments.filter((x) => x.childId !== a.childId), a],
    }))
  }, [])

  const resetDemo = useCallback(() => {
    const fresh = freshState()
    setState(fresh)
  }, [])

  const value = useMemo<DemoContextValue>(() => {
    const activeChild = state.children.find((c) => c.id === state.activeChildId) ?? null
    return {
      ...state,
      activeChild,
      observationsFor: (childId) => state.observations.filter((o) => o.childId === childId),
      assessmentFor: (childId) => state.assessments.find((a) => a.childId === childId),
      setActiveChild,
      addChild,
      addObservation,
      saveAssessment,
      resetDemo,
    }
  }, [state, setActiveChild, addChild, addObservation, saveAssessment, resetDemo])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
