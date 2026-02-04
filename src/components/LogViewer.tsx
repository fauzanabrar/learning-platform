import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LogViewerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LogViewer({ open, onOpenChange }: LogViewerProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log Viewer</DialogTitle>
                </DialogHeader>
                <div className="py-4">Log Viewer Content</div>
            </DialogContent>
        </Dialog>
    );
}
