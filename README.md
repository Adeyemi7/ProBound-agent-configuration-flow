# Probound Agent Onboarding & Configuration Flow 🚀

This repository contains the complete frontend onboarding flow for **Probound**. It includes the **Agent Selection Screen** and the **Multi-Step Configuration Wizard**, designed to guide users from selecting an AI workforce agent to fully customizing its identity, behavior, and tools.

**Live Demo:** [https://pro-bound-agent-configuration-flow-pearl.vercel.app/onboarding/chooseAgent](https://pro-bound-agent-configuration-flow-pearl.vercel.app/onboarding/chooseAgent)

---

## 🏗️ Modules Implemented

### 1. Choose Agent Screen (Entry Point)
**Path:** `/onboarding/chooseAgent`

The landing page where users are introduced to the available AI Agents.
* **Dynamic Card Grid:** Renders agent options (Triage, Dispatch, L1) dynamically from a shared `agentsData.ts` source of truth.
* **Smart Routing:** Clicking "Hire Agent" automatically directs the user to the configuration wizard, passing the specific `agentId` via URL query parameters (e.g., `?agent=1`).
* **Responsive Design:** Adapts from a single-column mobile view to a 3-column desktop grid.

### 2. Configuration Wizard (The Flow)
**Path:** `/onboarding/configureAgent`

A production-ready, step-by-step interface for customizing the selected agent.
* **Identity Step:** Profile picture upload (with client-side preview), voice selection, and naming.
* **Behaviour Step:** Context-aware settings that change based on the agent selected (e.g., specific "Routing Logic" for Dispatch agents vs. "Prioritization Rules" for Triage agents).
* **Knowledge Step:** File upload manager (PDF/DOCX) and URL scraper input for training the agent.
* **Action Step:** Tool integration toggles (Slack, Zendesk, Twilio) and webhook configuration.

---

## 📂 Project Structure

A clean, modular structure separating authentication flows, onboarding logic, and shared constants.

```text
app/
├── (auth)/
│   ├── login/
│   └── onboarding/
│       ├── chooseAgent/        
│       │   └── page.tsx                # Agent Selection Page
│       └── configureAgent/     
│           ├── components/             # Wizard-specific components
│           │   ├── steps/              # Step Logic & Layouts
│           │   │   ├── ConfigureLayout.tsx
│           │   │   ├── FooterNav.tsx
│           │   │   ├── ProgressBar.tsx
│           │   │   ├── Sidebar.tsx
│           │   │   ├── StepContent.tsx
│           │   │   ├── StepNav.tsx
│           │   │   ├── TopNav.tsx
│           │   │   ├── steps.ts        # Step definitions & types
│           │   │   ├── IdentityForm.tsx
│           │   │   ├── BehaviourStep.tsx
│           │   │   ├── KnowledgeStep.tsx
│           │   │   └── ActionStep.tsx
│           ├── layout.tsx
│           └── page.tsx                # Main Configuration Page
├── (dashboard)/
├── components/
│   └── agentCard.tsx                   # Shared Agent Card Component
└── constants/
    └── agentsData.ts                   # Single Source of Truth for Agent Data
``
```

Here is the complete content formatted as a single Markdown file. 

```markdown
# ProBound Agent Configuration Flow 🚀

This repository contains the frontend onboarding flow for ProBound, featuring an agent selection screen and a multi-step configuration wizard.

## 🛠️ Tech Stack

* **Framework:** Next.js 
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** URL Search Params (`useSearchParams`) for shareable, stateless navigation.

## 🚀 Setup & Run Instructions

**1. Clone the repository:**

```bash
git clone [https://github.com/Adeyemi7/ProBound-agent-configuration-flow.git](https://github.com/Adeyemi7/ProBound-agent-configuration-flow.git)
cd ProBound-agent-configuration-flow

```

**2. Install dependencies:**

```bash
pnpm install
# or
npm install

```

**3. Run the development server:**

```bash
pnpm dev

```

**4. Start the flow:**

Visit [http://localhost:3000/onboarding/chooseAgent](https://www.google.com/search?q=http://localhost:3000/onboarding/chooseAgent)

## 📝 Design Decisions & Notes

* **URL as State:** We intentionally avoided global state managers (Redux/Context) for the navigation flow. By keeping the `step` and `agent` ID in the URL, users can refresh the page or share the link without losing their place in the wizard.
* **Centralized Data:** The `agentsData.ts` file powers both the *Choose Agent* screen and the *Sidebar* in the configuration flow. Updating an agent's description or image in that one file updates it everywhere in the app.
* **Asset Handling:** Images are currently handled via the Next.js `Image` component. Ensure your `public/assets` folder matches the import paths in `agentsData.ts`.

```
