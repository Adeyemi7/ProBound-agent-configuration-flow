import ActionStep from './steps/ActionStep';
import BehaviourStep from './steps/BehaviourStep';
import IdentityForm from './steps/IdentityForm';
import KnowledgeStep from './steps/KnowledgeStep';
// import PlaceholderStep from './steps/PlaceholderStep';
import { StepId } from './steps/steps';

export default function StepContent({ activeStep }: { activeStep: StepId }) {
  switch (activeStep) {
    case 'identity':
      return <IdentityForm />;
    case 'behaviour':
      return <BehaviourStep />;
    case 'knowledge':
      return <KnowledgeStep />;
    case 'action':
      return <ActionStep />;
  }
}
