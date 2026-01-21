'use client';

import StepNav from './StepNav';
import ProgressBar from './ProgressBar';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {getAgentById } from '@/app/constants/agentsData';
import { Step, StepId } from './steps/steps';

type Props = {
  activeStep: StepId;
  setActiveStep: (step: StepId) => void;
  steps: readonly Step[];
};

export default function Sidebar({
  activeStep,
  setActiveStep,
  steps,
}: Props) {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agent') ?? '1';

  const agent = getAgentById(agentId);

  const currentStepIndex = steps.findIndex(s => s.id === activeStep);

  return (
    <aside className="w-full lg:w-[320px] bg-[#F9FAFB] p-8 border-r flex flex-col">
      {/* Agent Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 relative overflow-hidden">
            {agent && (
              <Image
                src={agent.imageSrc}
                alt={agent.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <h2 className="font-bold text-gray-900">
            AI {agent?.title ?? 'Agent'}
          </h2>
        </div>

        <p className="text-sm text-gray-600">
          Configure your {agent?.title.toLowerCase()} to match your needs.
        </p>
      </div>

      <StepNav
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <div className="mt-auto pt-2">
        <button className="w-full py-2.5 mb-4 border rounded-lg text-sm">
          Configure later
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Info size={14} />
          You can always configure on your dashboard
        </div>

        <ProgressBar
          current={currentStepIndex + 1}
          total={steps.length}
        />
      </div>
    </aside>
  );
}
