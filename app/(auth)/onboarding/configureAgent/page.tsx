// 'use client'
// import React from 'react'
// import { ArrowLeft } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// // 1. Rename 'page' to 'Page' (Capitalized)
// const Page = () => {
//   const router = useRouter();
  
//   const goBack = () => router.back();

//   return (
//    <main className='w-[90%] mx-auto bg-white min-h-full pb-10'>
//         <div className='flex flex-col gap-6'>
//             <p className=' text-[18px] md:text-[20px]  lg:text-[24px] font-semibold mt-10 flex items-center gap-3 text-[rgba(21,32,43,1)]'>
//                 <span className='hover:scale-105 transition-transform duration-200 cursor-pointer'
//                 onClick={goBack}>
//                   <ArrowLeft />
//                 </span>
//                 Configure Agent
//             </p>

//             <p className=' text-sm md:text-[14px] lg:text-[16px] font-normal text-[rgba(21,32,43,1)] '>
//                 Set up how this agent will handle workflows tailored to your needs.
//             </p>
//        </div>
    
//        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
        
//        </div>
//     </main>
//   )
// }

// // 2. Export the capitalized name
// export default Page


// app/configure-agent/page.tsx
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