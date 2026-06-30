
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useWorkflow } from '../WorkflowContext';

interface ConnectionSetupProps {
  onNext: () => void;
  onBack: () => void;
}

export function ConnectionSetup({ onNext, onBack }: ConnectionSetupProps) {
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const { activeAction, setActiveAction } = useWorkflow();

  useEffect(() => {
    if (testResult === null) {
      setActiveAction('connect');
    } else if (testResult === 'success') {
      setActiveAction('continue');
    }
  }, [testResult, setActiveAction]);

  const handleTestConnection = () => {
    // Simulate connection test
    setTestResult('success');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2>Connection Setup</h2>
        <p className="text-muted-foreground">Configure connection details for eyeMD integration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>eyeMD Connection Details</CardTitle>
          <CardDescription>Enter your eyeMD API credentials and connection settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Input id="api-endpoint" placeholder="https://api.eyemd.com/v1" defaultValue="https://api.eyemd.com/v1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="env">Environment</Label>
              <Select defaultValue="sandbox">
                <SelectTrigger id="env">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="sandbox">Sandbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <Input id="client-id" placeholder="Enter client ID" defaultValue="eyemd-123456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-secret">Client Secret</Label>
              <Input id="client-secret" type="password" placeholder="Enter client secret" defaultValue="••••••••••••••••" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="practice-id">Practice ID</Label>
            <Input id="practice-id" placeholder="Enter practice ID" defaultValue="novamed-eyecare-atlanta" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="auth-method">Authentication Method</Label>
              <Select defaultValue="oauth2">
                <SelectTrigger id="auth-method">
                  <SelectValue placeholder="Select auth method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                  <SelectItem value="api-key">API Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Request Timeout (seconds)</Label>
              <Input id="timeout" type="number" defaultValue="30" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Auto-Synchronization</Label>
                <p className="text-sm text-muted-foreground">Automatically sync data between systems</p>
              </div>
              <Switch id="auto-sync" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ssl">Require SSL/TLS</Label>
                <p className="text-sm text-muted-foreground">Enforce secure connection</p>
              </div>
              <Switch id="ssl" defaultChecked />
            </div>
          </div>

          {testResult === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Connection Successful</AlertTitle>
              <AlertDescription>
                Successfully connected to eyeMD API. You can proceed to the next step.
              </AlertDescription>
            </Alert>
          )}

          {testResult === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>
                Could not connect to eyeMD API. Please check your credentials and try again.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={handleTestConnection}
              className={activeAction === 'connect' && testResult === null ? 'pulse-highlight' : ''}
            >
              Test Connection
            </Button>
            <Button 
              onClick={onNext} 
              disabled={testResult !== 'success'}
              className={activeAction === 'continue' && testResult === 'success' ? 'pulse-highlight' : ''}
            >
              Continue
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
