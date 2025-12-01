import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export function PaymentMethods() {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Payment Method
      </h3>
      <div className="grid gap-3">
        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4"
          onClick={() => console.log("Stripe payment")}
        >
          <CreditCard className="h-5 w-5 mr-3" />
          <div className="flex-1 text-left">
            <p className="font-medium">Credit / Debit Card</p>
            <p className="text-xs text-muted-foreground">Powered by Stripe</p>
          </div>
        </Button>
        
        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4"
          onClick={() => console.log("PayPal payment")}
        >
          <div className="h-5 w-5 mr-3 flex items-center justify-center bg-[#0070ba] rounded text-white text-xs font-bold">
            P
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">PayPal</p>
            <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4"
          onClick={() => console.log("Paystack payment")}
        >
          <div className="h-5 w-5 mr-3 flex items-center justify-center bg-[#00C3F7] rounded text-white text-xs font-bold">
            PS
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Paystack</p>
            <p className="text-xs text-muted-foreground">For Nigerian customers</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4"
          onClick={() => console.log("Apple Pay payment")}
        >
          <div className="h-5 w-5 mr-3 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                fill="currentColor"
                d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
              />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Apple Pay</p>
            <p className="text-xs text-muted-foreground">One-tap payment</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4"
          onClick={() => console.log("Google Pay payment")}
        >
          <div className="h-5 w-5 mr-3 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                fill="#4285F4"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Google Pay</p>
            <p className="text-xs text-muted-foreground">Fast and secure</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
