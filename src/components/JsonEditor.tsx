import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface JsonEditorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function JsonEditor({ open, onOpenChange }: JsonEditorProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>JSON Editor</DialogTitle>
                </DialogHeader>
                <div className="py-4">JSON Editor Content</div>
            </DialogContent>
        </Dialog>
    );
}
