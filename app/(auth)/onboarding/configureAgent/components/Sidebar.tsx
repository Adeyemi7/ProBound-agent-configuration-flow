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
    <aside className="w-full lg:w-[426px] bg-[rgba(243,244,246,1)] p-8 border-r border-[rgba(243,244,246,1)] flex flex-col">
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
         Thanks for confirming your email. Let’s get you set up. Tell us about your business 
        </p>
      </div>

      <StepNav
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <div className="mt-auto pt-2 border-t border-t-[rgba(228,228,231,1)]">
        <button className="w-full py-2.5 mb-4 border-[rgba(228,228,231,1)] border rounded-lg text-sm text-[rgba(18,18,18,0.6)] hover:bg-gray-200 transition-colors">
          Configure later
        </button>

        <div className="flex items-center gap-2 text-xs text-[rgba(11,6,26,1)] mb-6 ">
          <Info strokeWidth={2} size={14} className='font-bold' />
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
