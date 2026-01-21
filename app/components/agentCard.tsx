'use client';

import { AgentData } from "../constants/agentsData";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AgentCardProps {
  agent: AgentData;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const router = useRouter();

  const navigate = () => {
    router.push(`/onboarding/configureAgent?agent=${agent.id}`);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-md group">
      <div className="absolute inset-0">
        <Image
          src={agent.imageSrc}
          alt={agent.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute bottom-0 z-20 p-8 pb-10">
        <h3 className="text-3xl font-semibold text-white mb-2">
          {agent.title}
        </h3>

        <p className="text-white text-sm mb-8 max-w-[90%]">
          {agent.description}
        </p>

        <button
          onClick={navigate}
          className="w-full py-2 mb-6 border border-gray-400 rounded-md bg-white/10 text-white hover:bg-white/20"
        >
          {agent.btnText}
        </button>

        <button className="text-white text-sm">
          View capabilities
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
