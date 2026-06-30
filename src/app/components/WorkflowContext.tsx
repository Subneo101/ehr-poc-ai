
import React, { createContext, useContext, useState, ReactNode } from 'react';

type WorkflowStep = 'dashboard' | 'connection' | 'mapping' | 'validation' | 'review';
type ActionType = 'start' | 'connect' | 'mapFields' | 'validate' | 'resolve' | 'continue' | 'activate' | null;

interface WorkflowContextType {
  activeAction: ActionType;
  setActiveAction: (action: ActionType) => void;
  currentStep: WorkflowStep;
  setCurrentStep: (step: WorkflowStep) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [activeAction, setActiveAction] = useState<ActionType>('start');
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('dashboard');

  return (
    <WorkflowContext.Provider value={{ 
      activeAction, 
      setActiveAction,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
