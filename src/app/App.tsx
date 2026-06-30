
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/steps/Dashboard.tsx';
import { ConnectionSetup } from '@/components/steps/ConnectionSetup.tsx';
import { FieldMapping } from '@/components/steps/FieldMapping.tsx';
import { Validation } from '@/components/steps/Validation.tsx';
import { ReviewActivate } from '@/components/steps/ReviewActivate.tsx';
import { WorkflowProvider, useWorkflow } from '@/components/WorkflowContext.tsx';

function AppContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setCurrentStep: setWorkflowStep, setActiveAction } = useWorkflow();

  // Update workflow context when step changes
  useEffect(() => {
    const steps: Array<'dashboard' | 'connection' | 'mapping' | 'validation' | 'review'> = [
      'dashboard', 'connection', 'mapping', 'validation', 'review'
    ];
    
    setWorkflowStep(steps[currentStep]);
    
    // Set the default active action for each step
    const actions = ['start', 'connect', 'mapFields', 'validate', 'activate'];
    setActiveAction(actions[currentStep] as any);
  }, [currentStep, setWorkflowStep, setActiveAction]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    // In a real application, this might redirect to a dashboard or show a success screen
    setCurrentStep(0);
  };

  return (
    <Layout currentStep={currentStep}>
      {currentStep === 0 && <Dashboard onNext={handleNext} />}
      {currentStep === 1 && <ConnectionSetup onNext={handleNext} onBack={handleBack} />}
      {currentStep === 2 && <FieldMapping onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <Validation onNext={handleNext} onBack={handleBack} />}
      {currentStep === 4 && <ReviewActivate onBack={handleBack} onComplete={handleComplete} />}
    </Layout>
  );
}

export default function App() {
  return (
    <WorkflowProvider>
      <AppContent />
    </WorkflowProvider>
  );
}
