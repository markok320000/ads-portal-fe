'use client'
import { SiteHeader } from "@/components/site-header";
import { SavedCard } from "@/components/saved-card";
import { AddCardForm } from "@/components/add-card-form";
import { StripeCard } from "@/models/stripe";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus, IconShieldCheck } from "@tabler/icons-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const initialMockCards: StripeCard[] = [
    {
        id: "card_1",
        brand: "visa",
        last4: "4242",
        exp_month: 12,
        exp_year: 2024,
        country: "US",
        funding: "credit",
    },
    {
        id: "card_2",
        brand: "mastercard",
        last4: "5555",
        exp_month: 10,
        exp_year: 2025,
        country: "US",
        funding: "debit",
    },
];

export default function Page() {
    const [cards, setCards] = useState<StripeCard[]>(initialMockCards);

    const handleRemoveCard = (cardId: string) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    };

    return (
        <div className="w-full">
            <SiteHeader
                title="Payment Methods"
                description="Manage your saved payment methods"
            />
            <div className="flex flex-col space-y-8 p-6 md:p-12 max-w-5xl mx-auto">

                {/* Security Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3 max-w-3xl">
                    <IconShieldCheck className="h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-blue-900">Secure Payment Processing</h4>
                        <p className="text-sm text-blue-700 mt-1">
                            AllChat does not store your payment details. Your cards are securely saved by our payment provider, Stripe. You can remove them at any time.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between max-w-3xl">
                        <h3 className="text-lg font-medium">Saved Cards ({cards.length})</h3>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <IconPlus className="mr-2 h-4 w-4" />
                                    Add Card
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Payment Method</DialogTitle>
                                    <DialogDescription>
                                        Add a new credit or debit card to your account.
                                    </DialogDescription>
                                </DialogHeader>
                                <Elements stripe={stripePromise}>
                                    <AddCardForm />
                                </Elements>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-3xl">
                        {cards.map((card) => (
                            <SavedCard
                                key={card.id}
                                card={card}
                                onRemove={handleRemoveCard}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
