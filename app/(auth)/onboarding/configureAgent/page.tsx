'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ConfigureLayout from './components/ConfigureLayout';
import { STEPS, StepId } from './components/steps/steps';

function AgentConfigContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const stepParam = searchParams.get('step');
  const isValidStep = STEPS.some((s) => s.id === stepParam);
  const activeStep: StepId = isValidStep ? (stepParam as StepId) : 'identity';

  const setActiveStep = (id: StepId) => {
    router.push(`?step=${id}`);
  };

  return (
    <ConfigureLayout
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      steps={STEPS}
    />
  );
}

export default function ConfigureAgentPage() {
  return (
    // Needed because we use searchParams
    <Suspense fallback={<div>Loading...</div>}>
      <AgentConfigContent />
    </Suspense>
  );
}