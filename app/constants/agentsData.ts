import { StaticImageData } from 'next/image';
import TriageAgentImage from '../../public/assets/images/agents/triage-agent.png';
import DispatchAgentImage from '../../public/assets/images/agents/dispatch-agent.png';
import L1SupportAgentImage from '../../public/assets/images/agents/l1-support-agent.png';

export interface AgentData {
  id: string;
  title: string;
  description: string;
  btnText: string;
  btnDescription: string;
  btnTextColor?: string;
  imageSrc: StaticImageData;
  i?: number;
}

export const agentsData: AgentData[] = [
  {
    id: '1',
    title: 'Triage Agent',
    description: 'Manages requests, identifies what matters, and ensures they reach the right team fast.',
    btnText: 'Hire Agent',
    btnDescription: 'View capabilities',
    imageSrc: TriageAgentImage,
    btnTextColor: 'text-white',
  },
  {
    id: '2',
    title: 'Dispatch Agent',
    description: 'Authenticates callers, logs their needs, and routes them to the right place.',
    btnText: 'Hire Agent',
    btnDescription: 'View capabilities',
    imageSrc: DispatchAgentImage,
    btnTextColor: 'text-white',
  },
  {
    id: '3',
    title: 'Level 1 (L1) Agent',
    description: 'Automates routine IT support tasks to reduce workload and improve response time.',
    btnText: 'Hire Agent',
    btnDescription: 'View capabilities',
    imageSrc: L1SupportAgentImage,
    btnTextColor: 'text-white',
  },
];

// This was missing or not saved in your file
export const getAgentById = (id: string) => 
  agentsData.find(agent => agent.id === id);