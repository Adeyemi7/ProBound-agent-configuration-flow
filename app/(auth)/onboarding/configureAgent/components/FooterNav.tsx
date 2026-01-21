'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
// Use relative import to access the sibling 'steps' folder
import { getNextStep, type StepId } from './steps/steps';

export default function FooterNav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Get current step from URL, fallback to 'identity'
  const currentStep = (searchParams.get('step') ?? 'identity') as StepId;
  
  // 2. Calculate the next step
  const nextStep = getNextStep(currentStep);

  const goNext = () => {
    if (!nextStep) return;
    router.push(`?step=${nextStep}`);
  };

  return (
    <div className="mt-8 flex justify-end">
      <button
        onClick={goNext}
        disabled={!nextStep}
        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
      >
        Next
        <ArrowRight size={18} />
      </button>
    </div>
  );
}