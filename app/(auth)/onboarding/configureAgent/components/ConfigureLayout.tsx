import TopNav from './TopNav';
import Sidebar from './Sidebar';
import StepContent from './StepContent';
import FooterNav from './FooterNav';
import { StepId } from './steps/steps';

type Props = {
  activeStep: StepId;
  setActiveStep: (step: StepId) => void;
  steps: any[];
};

export default function ConfigureLayout({
  activeStep,
  setActiveStep,
  steps,
}: Props) {
  return (
   <main className='w-[90%] mx-auto bg-white min-h-full pb-10' >
      <TopNav />

      <div className="flex flex-col lg:flex-row w-full min-h-[700px] bg-white border rounded-3xl overflow-hidden">
        <Sidebar
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />

        <section className="flex-1 p-8 lg:p-12 flex flex-col">
          <StepContent activeStep={activeStep} />
          <FooterNav />
        </section>
      </div>
    </main>
  );
}
