"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ProviderItem } from "./ProviderItem";

const providers = [
    { id: "anthropic", name: "Anthropic", enabled: true, modelCount: 3 },
    { id: "openai", name: "OpenAI", enabled: true, modelCount: 4 },
    { id: "google", name: "Google Gemini", enabled: false, modelCount: 2 },
    { id: "groq", name: "Groq", enabled: true, modelCount: 1 },
    { id: "ollama", name: "Ollama (Local)", enabled: false, modelCount: 0 },
];

export function Providers() {
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

    const toggleKey = (id: string) => {
        setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Card className="h-full flex flex-col border shadow-sm bg-white/50 dark:bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Model Providers</CardTitle>
                        <CardDescription>Configure access to AI model services</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                        {providers.filter(p => p.enabled).length} Active
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-6 pb-4">
                    <div className="space-y-4 pt-2">
                        {providers.map((provider) => (
                            <ProviderItem
                                key={provider.id}
                                provider={provider}
                                showKey={!!showKeys[provider.id]}
                                onToggleKey={() => toggleKey(provider.id)}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
