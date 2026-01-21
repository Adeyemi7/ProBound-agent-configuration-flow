'use client'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import AgentCard from '@/app/components/agentCard'
import { agentsData } from '@/app/constants/agentsData'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();

    const goBack = () => router.refresh();
  return (
   <main className='w-[90%] mx-auto bg-white min-h-full pb-10'>
        <div className='flex flex-col gap-6'>
            <p className=' text-[18px] md:text-[20px]  lg:text-[24px] font-semibold mt-10 flex items-center gap-3 text-[rgba(21,32,43,1)]'>
                <span className='hover:scale-105 transition-transform duration-200 cursor-pointer'
                 onClick={goBack}>
                  <ArrowLeft />
                </span>
                Meet your Agents
            </p>

            <p className=' text-sm md:text-[14px] lg:text-[16px] font-normal text-[rgba(21,32,43,1)] '>
                For the next 14 days, you have full access to Triage, Dispatch, and L1 Agents. We’ll help you set up one agent based on your most important need right now. You can always hire and configure the other agents later on your dashboard.
            </p>
       </div>

       <div className='mt-4 p-4 rounded-md bg-[rgba(244,242,242,0.6)] border-[rgba(244,242,242,0.6)] gap-3'>
        <p className='flex items-center gap-3 text-[11px] md:text-sm font-medium text-[rgba(121,136,157,1)]'>
             <span className='h-4 w-4 rounded-full bg-[#D9D9D9] animate-pulse'> </span>
             Pick the agent that best supports your primary need
        </p>
       </div>
    
       <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
        {
          agentsData.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))
        }
       </div>
    </main>
  )
}

export default Page