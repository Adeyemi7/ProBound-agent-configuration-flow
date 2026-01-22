'use client';

import { useSearchParams } from 'next/navigation';
import { Zap, Phone, Ticket, Database, Webhook, Lock, Plus } from 'lucide-react';
import { useState } from 'react';

// Specific configuration for each agent type
const AGENT_ACTION_CONFIG = {
  '1': { // Triage Agent
    focus: 'Workflow Automation',
    description: 'Connect tools that allow the agent to tag, assign, and route tickets automatically.',
    recommendedTools: [
      { id: 'zendesk', name: 'Zendesk / Jira', desc: 'Create and update tickets', icon: Ticket, connected: false },
      { id: 'slack', name: 'Slack / Teams', desc: 'Notify channels of high priority items', icon: Zap, connected: true },
    ],
  },
  '2': { // Dispatch Agent
    focus: 'Telephony & Routing',
    description: 'Enable telephony actions to transfer calls and send authentication codes.',
    recommendedTools: [
      { id: 'twilio', name: 'Twilio Voice', desc: 'Warm transfer calls to human agents', icon: Phone, connected: true },
      { id: 'sms', name: 'SMS Gateway', desc: 'Send OTPs for identity verification', icon: Lock, connected: false },
    ],
  },
  '3': { // L1 Agent
    focus: 'System Operations',
    description: 'Grant permissions to perform account actions and database lookups.',
    recommendedTools: [
      { id: 'ad', name: 'Active Directory', desc: 'Reset user passwords & unlock accounts', icon: Lock, connected: false },
      { id: 'db', name: 'Order Database', desc: 'Fetch order status and shipping details', icon: Database, connected: false },
    ],
  },
};

export default function ActionStep() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agent') ?? '1';
  
  const config = AGENT_ACTION_CONFIG[agentId as keyof typeof AGENT_ACTION_CONFIG] || AGENT_ACTION_CONFIG['1'];

  // Mock state for tool connections
  const [tools, setTools] = useState(config.recommendedTools);

  const toggleTool = (id: string) => {
    setTools(tools.map(t => t.id === id ? { ...t, connected: !t.connected } : t));
  };

  return (
    <div className="animate-in fade-in max-w-2xl">
      <h1 className="text-2xl text-[rgba(11,6,26,1)] font-semibold flex items-center gap-3">
        Agent Actions
        <span className="text-sm font-normal px-3 py-1 bg-[rgba(209,213,219,1)] text-[rgba(18,18,18,0.6)]  rounded-full border border-[rgba(209,213,219,1)]">
          {config.focus}
        </span>
      </h1>
      <p className="text-sm text-[rgba(113,113,122,1)] mb-8 mt-2">
        {config.description}
      </p>

      <div className="space-y-8">
        
        {/* 1. Native Integrations */}
        <div>
          <label className="block text-base font-medium text-[rgba(21,32,43,1)] mb-4">
            Recommended Integrations
          </label>
          <div className="grid grid-cols-1 gap-4">
            {tools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <div 
                  key={tool.id}
                  className={`flex items-center justify-between p-4 border rounded-xl transition-all
                    ${tool.connected ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${tool.connected ? 'bg-white text-green-600 shadow-sm' : 'bg-gray-100 text-gray-500'}
                    `}>
                      <ToolIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{tool.name}</h3>
                      <p className="text-xs text-gray-500">{tool.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleTool(tool.id)}
                    className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors
                      ${tool.connected 
                        ? 'bg-white text-green-700 border-green-200 hover:bg-green-50' 
                        : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'}
                    `}
                  >
                    {tool.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Custom Webhook Action */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Webhook size={18} className="text-blue-600" />
            <label className="block text-base font-medium text-[rgba(21,32,43,1)]">
              Custom Function (Webhook)
            </label>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div className="flex gap-4 mb-4">
              <div className="w-1/3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Method</label>
                <select className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm">
                  <option>POST</option>
                  <option>GET</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Endpoint URL</label>
                <input 
                  type="text" 
                  placeholder="https://api.yourcompany.com/v1/action"
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div className="mb-4">
               <label className="block text-xs font-medium text-gray-500 mb-1">Action Trigger Name</label>
               <input 
                  type="text" 
                  placeholder="e.g. check_order_status"
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <p className="text-xs text-gray-400 mt-1">
                  The AI will call this function name when it decides to take this action.
                </p>
            </div>

            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700">
              <Plus size={16} />
              Add Header
            </button>
          </div>
        </div>

        {/* 3. Safety Limits */}
        <div className="pt-4 border-t border-gray-100">
           <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900">Require Human Approval</span>
                <span className="block text-xs text-gray-500">
                  If the agent confidence score is below 80%, ask a human before executing actions.
                </span>
              </div>
           </label>
        </div>

      </div>
    </div>
  );
}