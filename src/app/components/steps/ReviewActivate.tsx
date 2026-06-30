
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { CheckCircle2, ChevronDown, ChevronUp, Clock, Settings, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useWorkflow } from '../WorkflowContext';

interface ReviewActivateProps {
  onBack: () => void;
  onComplete: () => void;
}

export function ReviewActivate({ onBack, onComplete }: ReviewActivateProps) {
  const { activeAction, setActiveAction } = useWorkflow();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    connection: false,
    mapping: false,
    validation: true,
    settings: false
  });
  const [activationDialog, setActivationDialog] = useState(false);
  const [activated, setActivated] = useState(false);
  
  useEffect(() => {
    setActiveAction('activate');
  }, [setActiveAction]);

  const toggleSection = (section: string) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleActivate = () => {
    setActivationDialog(false);
    setActivated(true);
    setActiveAction(null);
    setTimeout(onComplete, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2>Review & Activate</h2>
        <p className="text-muted-foreground">Review your configuration and activate the integration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Summary</CardTitle>
          <CardDescription>Review the complete configuration before activation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {activated ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-center">Integration Activated Successfully!</h3>
              <p className="text-center text-muted-foreground max-w-md">
                Your Acme Surgical Planner is now connected to eyeMD EHR. Data will begin syncing according to your configuration.
              </p>
            </div>
          ) : (
            <>
              {/* Connection Details Section */}
              <div>
                <div 
                  className="flex justify-between items-center cursor-pointer py-2" 
                  onClick={() => toggleSection('connection')}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <h3>Connection Details</h3>
                  </div>
                  {expanded.connection ? <ChevronUp /> : <ChevronDown />}
                </div>
                <Separator />
                {expanded.connection && (
                  <div className="py-4 px-2 space-y-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">API Endpoint</p>
                        <p>https://api.eyemd.com/v1</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Environment</p>
                        <p>Sandbox</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Client ID</p>
                        <p>eyemd-123456</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Practice ID</p>
                        <p>novamed-eyecare-atlanta</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Authentication Method</p>
                        <p>OAuth 2.0</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Request Timeout</p>
                        <p>30 seconds</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Field Mapping Summary Section */}
              <div>
                <div 
                  className="flex justify-between items-center cursor-pointer py-2" 
                  onClick={() => toggleSection('mapping')}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3>Field Mapping Summary</h3>
                  </div>
                  {expanded.mapping ? <ChevronUp /> : <ChevronDown />}
                </div>
                <Separator />
                {expanded.mapping && (
                  <div className="py-4 px-2 space-y-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2">Category</th>
                          <th className="text-left pb-2">Source Fields</th>
                          <th className="text-left pb-2">Target Fields</th>
                          <th className="text-right pb-2">Mapped</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">Patient Demographics</td>
                          <td className="py-3">10</td>
                          <td className="py-3">10</td>
                          <td className="py-3 text-right">4/10</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Exam Data</td>
                          <td className="py-3">8</td>
                          <td className="py-3">8</td>
                          <td className="py-3 text-right">0/8</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Surgical Data</td>
                          <td className="py-3">10</td>
                          <td className="py-3">10</td>
                          <td className="py-3 text-right">1/10</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">View All Mappings</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Results */}
              <div>
                <div 
                  className="flex justify-between items-center cursor-pointer py-2" 
                  onClick={() => toggleSection('validation')}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3>Validation Results</h3>
                  </div>
                  {expanded.validation ? <ChevronUp /> : <ChevronDown />}
                </div>
                <Separator />
                {expanded.validation && (
                  <div className="py-4 px-2 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-4 bg-gray-200 rounded overflow-hidden flex">
                        <div className="h-full bg-green-600" style={{ width: '86%' }}></div>
                        <div className="h-full bg-amber-500" style={{ width: '11%' }}></div>
                        <div className="h-full bg-red-600" style={{ width: '3%' }}></div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-600"></div>
                          <span>24 Success</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span>3 Warnings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-600"></div>
                          <span>0 Errors</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sync Settings */}
              <div>
                <div 
                  className="flex justify-between items-center cursor-pointer py-2" 
                  onClick={() => toggleSection('settings')}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3>Sync Settings</h3>
                  </div>
                  {expanded.settings ? <ChevronUp /> : <ChevronDown />}
                </div>
                <Separator />
                {expanded.settings && (
                  <div className="py-4 px-2 space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto-Synchronization</Label>
                          <p className="text-sm text-muted-foreground">Automatically sync data between systems</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Sync Schedule</Label>
                          <p className="text-sm text-muted-foreground">Every 15 minutes</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Error Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send email on sync errors</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={onBack} disabled={activated}>
            Back
          </Button>
          {!activated && (
            <Button 
              onClick={() => setActivationDialog(true)}
              className={activeAction === 'activate' ? 'pulse-highlight' : ''}
            >
              Activate Integration
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Activation Confirmation Dialog */}
      <Dialog open={activationDialog} onOpenChange={setActivationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Integration</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate the integration between Acme Surgical Planner and eyeMD EHR?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              By activating this integration, data will be synchronized between both systems according to your configuration.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <p className="text-sm">Field mappings are validated and ready for use</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <p className="text-sm">Connection to both systems has been tested successfully</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <p className="text-sm">You can deactivate or modify this integration at any time</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActivationDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleActivate}
              className="pulse-highlight"
            >
              Activate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
