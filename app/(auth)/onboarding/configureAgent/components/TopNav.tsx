import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopNav() {
  const router = useRouter();

    const goBack = () => {
        router.push('/onboarding/chooseAgent');
    };

  return (
<div className='flex flex-col gap-6 pt-3 pb-8'>
                <p className=' text-[18px] md:text-[20px]  lg:text-[24px] font-semibold mt-10 flex items-center gap-3 text-[rgba(21,32,43,1)]'>
                    <span className='hover:scale-105 transition-transform duration-200 cursor-pointer'
                    onClick={goBack}>
                      <ArrowLeft />
                    </span>
                    Configure Agent
                </p>
    
                <p className=' text-sm md:text-[14px] lg:text-[16px] font-normal text-[rgba(21,32,43,1)] '>
                    Set up how this agent will handle workflows tailored to your needs.
                </p>
           </div>
  );
}
