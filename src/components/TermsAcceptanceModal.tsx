import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ExternalLink } from "lucide-react";

interface TermsAcceptanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  context: "checkout" | "custom-inquiry" | "booking";
}

export function TermsAcceptanceModal({
  open,
  onOpenChange,
  onAccept,
  context,
}: TermsAcceptanceModalProps) {
  const [accepted, setAccepted] = useState(false);

  const contextTitles = {
    checkout: "Complete Your Order",
    "custom-inquiry": "Submit Custom Inquiry",
    booking: "Confirm Your Booking",
  };

  const contextDescriptions = {
    checkout:
      "Please review and accept our Terms & Conditions before completing your purchase.",
    "custom-inquiry":
      "Please review and accept our Terms & Conditions before submitting your custom design inquiry.",
    booking:
      "Please review and accept our Terms & Conditions before confirming your consultation booking.",
  };

  const handleAccept = () => {
    if (accepted) {
      onAccept();
      setAccepted(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {contextTitles[context]}
          </DialogTitle>
          <DialogDescription>{contextDescriptions[context]}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[300px] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              By proceeding, you acknowledge that you have read and agree to our
              Terms & Conditions, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>All sales for made-to-order items are final</li>
              <li>Production times vary based on order complexity</li>
              <li>
                You are responsible for providing accurate measurements and
                sizing
              </li>
              <li>International orders may incur customs duties and taxes</li>
              <li>Defects must be reported within 3 days of receipt</li>
            </ul>
            <p>
              For full details, please review our complete{" "}
              <Link
                to="/terms"
                target="_blank"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Terms & Conditions
                <ExternalLink className="h-3 w-3" />
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                target="_blank"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Privacy Policy
                <ExternalLink className="h-3 w-3" />
              </Link>
              .
            </p>
          </div>
        </ScrollArea>

        <div className="space-y-4 pt-4 border-t border-border">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
              className="mt-0.5"
            />
            <Label className="text-sm cursor-pointer leading-relaxed">
              I have read and agree to the{" "}
              <Link to="/terms" target="_blank" className="text-primary hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" target="_blank" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </label>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={handleAccept}
              disabled={!accepted}
            >
              Accept & Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
