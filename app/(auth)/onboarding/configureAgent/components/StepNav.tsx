'use client';

// 👇 LINE 1: This is the fix. We are importing "Step" explicitly.
import { StepId, Step } from './steps/steps';

type Props = {
  steps: readonly Step[]; // Now TypeScript knows what "Step" is
  activeStep: StepId;
  setActiveStep: (step: StepId) => void;
};

export default function StepNav({ steps, activeStep, setActiveStep }: Props) {
  return (
    <nav className="flex flex-col gap-2">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = activeStep === step.id;

        return (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors
              ${isActive ? 'bg-[rgba(229,231,235,1)] text-[rgba(11,6,26,1)] font-medium' : 'text-gray-500 hover:bg-gray-100'}
            `}
          >
            <Icon color={isActive ? "rgba(107,114,128,1)" : "rgba(113,113,122,1)"} size={18} className=' rounded-md border-[rgba(229,231,235,1)] p-1  w-6 h-6 '/>
            {step.label}
          </button>
        );
      })}
    </nav>
  );
}