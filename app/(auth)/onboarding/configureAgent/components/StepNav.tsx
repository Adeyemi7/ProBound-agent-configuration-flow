import { StepId } from './steps/steps';

type Props = {
  steps: readonly Step[];
  activeStep: StepId;
  setActiveStep: (step: StepId) => void;
};

export default function StepNav({ steps, activeStep, setActiveStep }: Props) {
  return (
    <nav className="flex flex-col gap-2">
      {steps.map(step => {
        const Icon = step.icon;
        const isActive = activeStep === step.id;

        return (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'}
            `}
          >
            <Icon size={18} />
            {step.label}
          </button>
        );
      })}
    </nav>
  );
}
