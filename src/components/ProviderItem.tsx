"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ProviderItemProps {
    provider: {
        id: string;
        name: string;
        enabled: boolean;
        modelCount: number;
    };
    showKey: boolean;
    onToggleKey: () => void;
}

export function ProviderItem({ provider, showKey, onToggleKey }: ProviderItemProps) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border p-4 transition-all hover:bg-muted/30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${provider.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                        {provider.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <Label htmlFor={`enable-${provider.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {provider.name}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                            {provider.modelCount} models available
                        </p>
                    </div>
                </div>
                <Switch id={`enable-${provider.id}`} checked={provider.enabled} />
            </div>

            {provider.enabled && (
                <div className="pl-11 pr-1">
                    <div className="relative">
                        <Input
                            type={showKey ? "text" : "password"}
                            placeholder="sk-..."
                            className="h-8 text-xs pr-8 bg-background/50"
                            defaultValue="sk-wdk2...1234"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={onToggleKey}
                        >
                            {showKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
