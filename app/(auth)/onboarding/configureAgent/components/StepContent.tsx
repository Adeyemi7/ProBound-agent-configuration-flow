import IdentityForm from './steps/IdentityForm';
import PlaceholderStep from './steps/PlaceholderStep';
import { StepId } from './steps/steps';

export default function StepContent({ activeStep }: { activeStep: StepId }) {
  switch (activeStep) {
    case 'identity':
      return <IdentityForm />;
    case 'behaviour':
      return <PlaceholderStep title="Behaviour" />;
    case 'knowledge':
      return <PlaceholderStep title="Knowledge" />;
    case 'action':
      return <PlaceholderStep title="Actions" />;
  }
}
