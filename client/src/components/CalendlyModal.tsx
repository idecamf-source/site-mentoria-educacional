import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalendlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CalendlyModal({ open, onOpenChange }: CalendlyModalProps) {
  useEffect(() => {
    // Load Calendly widget script
    if (open && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-serif">Agendar Mentoria</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 h-full overflow-hidden">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/patricia-dias-amf/mentoria-educacional?primary_color=d9a515"
            style={{ minWidth: "320px", height: "calc(90vh - 100px)" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
