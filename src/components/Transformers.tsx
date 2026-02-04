import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Transformers() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Transformers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-muted-foreground">Pipeline Transformers</div>
            </CardContent>
        </Card>
    );
}
