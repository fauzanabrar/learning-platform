"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Users, Zap } from "lucide-react";
import { Providers } from "@/components/Providers";
import { Router } from "@/components/common/router";
import { Transformers } from "@/components/Transformers";
import { SettingsDialog } from "@/components/SettingsDialog";
import { JsonEditor } from "@/components/JsonEditor";
import { LogViewer } from "@/components/common/log-viewer";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const [isLogViewerOpen, setIsLogViewerOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">AI Deployment Center - Manage your model providers and routing logic.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-emerald-500">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4K</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latency</CardTitle>
              <Zap className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145ms</div>
              <p className="text-xs text-muted-foreground">Avg response time</p>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">AI Management</h2>
            <p className="text-sm text-muted-foreground">Configure providers, routing rules, and deployment settings.</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Config saved")}>
              <Save className="mr-2 h-4 w-4" />
              Save Config
            </Button>
            <Button size="sm" onClick={() => toast.success("Restarted")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Save & Restart
            </Button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-y-auto lg:overflow-hidden">
            <div className="w-full lg:w-3/5 lg:h-full flex flex-col min-h-[500px] lg:min-h-0">
              <Providers />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col gap-4 lg:h-full min-h-[600px] lg:min-h-0">
              <div className="flex-1 lg:h-3/5 min-h-[300px] lg:min-h-0">
                <Router />
              </div>
              <div className="flex-1 lg:h-2/5 min-h-[200px] lg:min-h-0">
                <Transformers />
              </div>
            </div>
          </div>
        </section>

        <SettingsDialog isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        <JsonEditor
          open={isJsonEditorOpen}
          onOpenChange={setIsJsonEditorOpen}
        />
        <LogViewer
          open={isLogViewerOpen}
          onOpenChange={setIsLogViewerOpen}
        />
      </div>
    </TooltipProvider>
  );
}
