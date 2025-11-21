"use client"

import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { ActionButton } from "./ui/action-button";

export function AddCardForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
                // Handle error (e.g., show toast)
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                // Handle success (e.g., close dialog, update list)
                alert('Payment Method Created! Check console for details.');
            }
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
                <Label>Card Details</Label>
                <div className="p-3 border rounded-md bg-background">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <Lock className="w-3 h-3" />
                    <span>Payments processed securely by</span>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                        alt="Stripe" className="h-5 opacity-80 grayscale hover:grayscale-0 transition-all" />
                </div>
            </div>
            <ActionButton type="submit" className="w-full" disabled={!stripe || isLoading}>
                {isLoading ? "Adding..." : "Add Card"}
            </ActionButton>
        </form>
    );
}
