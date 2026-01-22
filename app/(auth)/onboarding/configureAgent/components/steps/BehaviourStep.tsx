'use client';

import { useSearchParams } from 'next/navigation';
import { MessageSquare, Sliders, ShieldCheck, Zap } from 'lucide-react';

// Specific configuration for each agent type
const AGENT_BEHAVIORS = {
  '1': { // Triage Agent
    focus: 'Prioritization & Categorization',
    description: 'Define how this agent evaluates urgency and categorizes incoming requests.',
    instructionLabel: 'Triage Rules',
    instructionPlaceholder: 'e.g., If user mentions "server down", mark as Critical priority...',
    icon: Sliders,
  },
  '2': { // Dispatch Agent
    focus: 'Authentication & Routing',
    description: 'Configure how this agent verifies identity and decides where to send the caller.',
    instructionLabel: 'Routing Logic',
    instructionPlaceholder: 'e.g., If verified user asks for "billing", route to Finance Dept...',
    icon: ShieldCheck,
  },
  '3': { // L1 Agent
    focus: 'Troubleshooting & Support',
    description: 'Set the boundaries for automated support and when to escalate to a human.',
    instructionLabel: 'Resolution Scope',
    instructionPlaceholder: 'e.g., Attempt password reset steps first. If failing twice, escalate...',
    icon: Zap,
  },
};

export default function BehaviourStep() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agent') ?? '1'; // Default to Triage if missing

  // Get the specific text for this agent (or fallback to generic)
  const config = AGENT_BEHAVIORS[agentId as keyof typeof AGENT_BEHAVIORS] || AGENT_BEHAVIORS['1'];
  const Icon = config.icon;

  return (
    <div className="animate-in fade-in max-w-2xl">
      <h1 className="text-2xl text-[rgba(11,6,26,1)] font-semibold flex items-center gap-3">
        Agent Behaviour
        <span className="text-sm font-normal px-3 py-1 bg-gray-100 rounded-full text-gray-600">
          {config.focus}
        </span>
      </h1>
      <p className="text-sm text-[rgba(113,113,122,1)] mb-8 mt-2">
        {config.description}
      </p>

      <div className="space-y-6">
        
        {/* 1. Greeting Message (Common to all) */}
        <div>
          <label className="block text-sm font-medium text-[rgba(21,32,43,1)] mb-2">
            Greeting Message
          </label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="e.g., Hello! I can help you route your call or check your ticket status. How can I help?"
              className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[rgba(21,32,43,1)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 resize-none"
            />
            <MessageSquare className="absolute right-4 top-4 text-gray-300" size={18} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            This is the very first thing your agent will say to the user.
          </p>
        </div>

        {/* 2. Tone & Personality */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[rgba(21,32,43,1)] mb-2">
              Tone of Voice
            </label>
            <select className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Professional & Direct</option>
              <option>Friendly & Casual</option>
              <option>Empathetic & Patient</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[rgba(21,32,43,1)] mb-2">
              Response Length
            </label>
            <select className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Concise (Short answers)</option>
              <option>Detailed (In-depth explanations)</option>
            </select>
          </div>
        </div>

        {/* 3. Agent-Specific Instructions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Icon size={18} className="text-blue-600" />
            <label className="block text-base font-medium text-[rgba(21,32,43,1)]">
              {config.instructionLabel}
            </label>
          </div>
          
          <textarea
            rows={6}
            placeholder={config.instructionPlaceholder}
            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[rgba(21,32,43,1)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-2">
            Provide specific instructions in natural language. The agent will follow these rules strictly.
          </p>
        </div>

      </div>
    </div>
  );
}