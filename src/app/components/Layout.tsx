
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Map, 
  AlertCircle, 
  Rocket,
  ChevronRight,
  ChevronLeft,
  User,
  CheckCircle,
  Stethoscope,
  Eye
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentStep?: number;
}

export function Layout({ children, currentStep = 0 }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const steps = [
    { id: 0, name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 1, name: "Connection Setup", icon: <LinkIcon className="h-4 w-4" /> },
    { id: 2, name: "Field Mapping", icon: <Map className="h-4 w-4" /> },
    { id: 3, name: "Validation", icon: <AlertCircle className="h-4 w-4" /> },
    { id: 4, name: "Review & Activate", icon: <Rocket className="h-4 w-4" /> }
  ];
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`bg-sidebar text-sidebar-foreground ${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-sidebar-border flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Eye className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-medium text-sidebar-foreground">Acme Admin</span>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="mx-auto h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Eye className="h-3.5 w-3.5 text-primary" />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isAccessible = isActive || isCompleted;
              
              return (
                <li key={step.id}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActive 
                        ? 'bg-gray-200 text-gray-800' 
                        : isCompleted
                          ? 'text-sidebar-foreground'
                          : 'text-gray-400'
                    } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className={`h-5 w-5 flex items-center justify-center rounded-full ${
                      isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-gray-400'
                    }`}>
                      {step.icon}
                    </span>
                    
                    {!isSidebarCollapsed && (
                      <>
                        <span className="ml-3 flex-1">{step.name}</span>
                        {isCompleted && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                        )}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border h-14 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-foreground">EHR Integration</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Clark Kent</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-4 w-4" />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
