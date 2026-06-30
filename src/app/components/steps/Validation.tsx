
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, CheckCircle2, Clock, XCircle, Wrench } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useWorkflow } from '../WorkflowContext';

interface ValidationProps {
  onNext: () => void;
  onBack: () => void;
}

export function Validation({ onNext, onBack }: ValidationProps) {
  const { activeAction, setActiveAction } = useWorkflow();
  const [validationStatus, setValidationStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{success: number, warnings: number, errors: number}>({
    success: 0,
    warnings: 0,
    errors: 0
  });
  const [validationItems, setValidationItems] = useState([
    { 
      id: 1, 
      field: 'Patient ID', 
      sourceSystem: 'Adi Surgical Planner', 
      targetField: 'Patient Number', 
      targetSystem: 'eyeMD', 
      status: 'success',
      message: 'Data types match' 
    },
    { 
      id: 2, 
      field: 'Visual Acuity OD', 
      sourceSystem: 'Adi Surgical Planner', 
      targetField: 'VA OD', 
      targetSystem: 'eyeMD', 
      status: 'warning',
      message: 'Format may need conversion (20/20 vs decimal)' 
    },
    { 
      id: 3, 
      field: 'Surgery Type', 
      sourceSystem: 'Adi Surgical Planner', 
      targetField: 'Procedure Code', 
      targetSystem: 'eyeMD', 
      status: 'error',
      message: 'Missing code mapping' 
    },
    { 
      id: 4, 
      field: 'Date of Birth', 
      sourceSystem: 'Adi Surgical Planner', 
      targetField: 'DOB', 
      targetSystem: 'eyeMD', 
      status: 'success',
      message: 'Date formats compatible' 
    },
    { 
      id: 5, 
      field: 'Insurance Provider', 
      sourceSystem: 'Adi Surgical Planner', 
      targetField: 'Insurance Plan', 
      targetSystem: 'eyeMD', 
      status: 'warning',
      message: 'May require additional mapping for specific plans' 
    }
  ]);

  // Helper to determine which button should be highlighted
  useEffect(() => {
    if (validationStatus === 'pending') {
      setActiveAction('start');
    } else if (validationStatus === 'completed' && results.errors > 0) {
      setActiveAction('resolve');
    } else if (validationStatus === 'completed' && results.errors === 0) {
      setActiveAction('continue');
    } else {
      setActiveAction(null);
    }
  }, [validationStatus, results.errors, setActiveAction]);

  const startValidation = () => {
    setValidationStatus('in-progress');
    setProgress(0);
    
    // Simulate validation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setValidationStatus('completed');
          setResults({
            success: 24,
            warnings: 3,
            errors: 1
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resolveErrors = () => {
    // Simulate fixing the error - update the validation item with error status
    setValidationItems(items => {
      return items.map(item => {
        if (item.status === 'error') {
          return {
            ...item,
            status: 'success',
            message: 'Issue resolved - Mapping created'
          };
        }
        return item;
      });
    });

    // Update the results to remove the error
    setResults(prev => ({
      ...prev,
      success: prev.success + prev.errors,
      errors: 0
    }));
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2>Validation</h2>
        <p className="text-muted-foreground">Verify field mappings between systems</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Field Mapping Validation</CardTitle>
          <CardDescription>Validate field mappings to identify potential issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {validationStatus === 'pending' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-center">Click the button below to validate your field mappings</p>
              <Button 
                onClick={startValidation}
                className={activeAction === 'start' ? 'pulse-highlight' : ''}
              >
                Start Validation
              </Button>
            </div>
          )}

          {validationStatus === 'in-progress' && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground">Validating field mappings ({progress}% complete)</p>
              </div>
            </div>
          )}

          {validationStatus === 'completed' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3>Validation Results</h3>
                  <p className="text-sm text-muted-foreground">
                    {results.success} successful, {results.warnings} warnings, {results.errors} errors
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={startValidation}>
                  Re-validate
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <p>Successful</p>
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-700">{results.success}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <p>Warnings</p>
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-700">{results.warnings}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <p>Errors</p>
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-700">{results.errors}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {results.errors > 0 && (
                <div className="flex items-center gap-4">
                  <Alert variant="destructive" className="flex-1">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      There are {results.errors} critical issues that need to be resolved before activating the integration.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    onClick={resolveErrors} 
                    variant="default" 
                    className={`whitespace-nowrap gap-2 ${activeAction === 'resolve' ? 'pulse-highlight' : ''}`}
                  >
                    <Wrench className="h-4 w-4" />
                    Resolve Issues
                  </Button>
                </div>
              )}

              {results.errors === 0 && results.warnings > 0 && (
                <Alert variant="warning" className="bg-amber-50 border-amber-200 text-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription>
                    There are {results.warnings} warnings that may need attention, but you can proceed with the integration.
                  </AlertDescription>
                </Alert>
              )}

              {results.errors === 0 && results.warnings === 0 && (
                <Alert variant="success" className="bg-green-50 border-green-200 text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    All validations passed successfully! You can proceed with the integration.
                  </AlertDescription>
                </Alert>
              )}

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Source Field</th>
                      <th className="px-4 py-2 text-left">Target Field</th>
                      <th className="px-4 py-2 text-left">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {validationItems.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 flex items-center">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{item.field}</span>
                            <span className="text-xs text-muted-foreground">{item.sourceSystem}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{item.targetField}</span>
                            <span className="text-xs text-muted-foreground">{item.targetSystem}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {statusIcon(item.status)}
                            <span>{item.message}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button 
            onClick={onNext} 
            disabled={validationStatus !== 'completed' || results.errors > 0}
            className={activeAction === 'continue' ? 'pulse-highlight' : ''}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
