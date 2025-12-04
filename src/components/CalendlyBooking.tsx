import { PopupButton } from "react-calendly";
import { Video, Calendar } from "lucide-react";

interface CalendlyBookingProps {
  url?: string;
  text?: string;
  variant?: "default" | "card";
  className?: string;
}

// Default Calendly URL - replace with actual URL when available
const DEFAULT_CALENDLY_URL = "https://calendly.com/azixa-consultations/video-consultation";

export function CalendlyBooking({ 
  url = DEFAULT_CALENDLY_URL, 
  text = "Book Consultation",
  variant = "default",
  className = ""
}: CalendlyBookingProps) {
  if (variant === "card") {
    return (
      <div className={`p-4 bg-champagne rounded-lg ${className}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Video className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">Need help deciding?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Book a complimentary video consultation with our stylists.
            </p>
            <PopupButton
              url={url}
              rootElement={document.getElementById("root") || document.body}
              text={text}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-medium"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PopupButton
      url={url}
      rootElement={document.getElementById("root") || document.body}
      text={text}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-medium ${className}`}
    />
  );
}
