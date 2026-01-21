import { User2, MessageSquare, FileText, Zap, type LucideIcon } from 'lucide-react';

export const STEPS = [
  { id: 'identity', label: 'Agent Identity', icon: User2 },
  { id: 'behaviour', label: 'Behaviour', icon: MessageSquare },
  { id: 'knowledge', label: 'Knowledge', icon: FileText },
  { id: 'action', label: 'Action', icon: Zap },
] as const;

/** Step ID union: 'identity' | 'behaviour' | ... */
export type StepId = typeof STEPS[number]['id'];

/** Full Step type */
export type Step = {
  id: StepId;
  label: string;
  icon: LucideIcon;
};

/** Ordered list of step IDs (derived, not duplicated) */
export const STEP_ORDER: StepId[] = STEPS.map(step => step.id);

/* -------------------------------------------------------------------------- */
/* REQUIRED HELPER FUNCTIONS                         */
/* -------------------------------------------------------------------------- */

export const getNextStep = (current: StepId): StepId | null => {
  const index = STEP_ORDER.indexOf(current);
  // If current step is not found or is the last step, return null
  if (index === -1 || index === STEP_ORDER.length - 1) return null;
  return STEP_ORDER[index + 1];
};

export const getPrevStep = (current: StepId): StepId | null => {
  const index = STEP_ORDER.indexOf(current);
  // If current step is not found or is the first step, return null
  if (index <= 0) return null;
  return STEP_ORDER[index - 1];
};