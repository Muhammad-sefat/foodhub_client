/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProviderService } from "@/services/provider.service";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function BecomeProviderModal({ open, onClose }: Props) {
  const handleConfirm = async () => {
    try {
      await ProviderService.becomeProvider();
      toast.success("You are now a provider 🎉");
      onClose();
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Become a Provider</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          As a provider, you can list meals and receive orders.
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
