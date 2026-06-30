import { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Clock,
  Database,
  FileText,
  Settings2,
  Share2,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { useWorkflow } from "../WorkflowContext";

interface DashboardProps {
  onNext: () => void;
}

export function Dashboard({ onNext }: DashboardProps) {
  const { activeAction, setActiveAction } = useWorkflow();

  useEffect(() => {
    setActiveAction("start");
  }, [setActiveAction]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2>EHR Integration Dashboard</h2>
        <p className="text-muted-foreground">
          Connect Acme Surgical Planner with EyeMD EHR system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Integration Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>
              Current status of your EHR integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Configuration Needed</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-sm"
                >
                  View Details
                </Button>
              </div>
              <Progress value={33} className="h-2" />
              <div className="text-sm text-muted-foreground">
                33% complete - 3 steps remaining
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button
              onClick={onNext}
              className={
                activeAction === "start"
                  ? "pulse-highlight"
                  : ""
              }
            >
              Continue Setup
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest changes to your integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                  <Settings2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">
                    Initial setup started
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Today at 10:30 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">
                    Connection test successful
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Today at 10:32 AM
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation & Resources Card */}
        <Card>
          <CardHeader>
            <CardTitle>Documentation & Resources</CardTitle>
            <CardDescription>
              Helpful resources for your integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <FileText className="h-4 w-4" />
                Integration Guide
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Database className="h-4 w-4" />
                EyeMD Field Documentation
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <FileText className="h-4 w-4" />
                Troubleshooting Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Integration History */}
        <Card>
          <CardHeader>
            <CardTitle>Integration History</CardTitle>
            <CardDescription>
              Previous sync activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  No sync history yet
                </p>
              </div>
              <table className="w-full opacity-30">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-right">Records</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">May 21, 2025</td>
                    <td className="py-2">Completed</td>
                    <td className="py-2 text-right">152</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Connection status with both systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">A</span>
                  </div>
                  <div>
                    <p className="text-sm">
                      Acme Surgical Planner
                    </p>
                    <span className="flex items-center text-xs text-green-600 gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      Connected
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Test
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">E</span>
                  </div>
                  <div>
                    <p className="text-sm">EyeMD EHR</p>
                    <span className="flex items-center text-xs text-amber-600 gap-1">
                      <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                      Needs configuration
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  className={
                    activeAction === "start"
                      ? "pulse-highlight"
                      : ""
                  }
                >
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}