import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SettingsDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="py-4">Settings Content</div>
            </DialogContent>
        </Dialog>
    );
}
