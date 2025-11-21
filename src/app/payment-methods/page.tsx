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

const mockCards: StripeCard[] = [
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
        brand: "mastfercard",
        last4: "5555",
        exp_month: 10,
        exp_year: 2025,
        country: "US",
        funding: "debit",
    },
];

export default function Page() {
    return (
        <div className="w-full">
            <div className="flex flex-col space-y-8 p-6 md:p-12 max-w-5xl mx-auto">
                <SiteHeader
                    title="Payment Methods"
                    description="Manage your saved payment methods"
                />

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
                        <h3 className="text-lg font-medium">Saved Cards ({mockCards.length})</h3>
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
                                <AddCardForm />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-3xl">
                        {mockCards.map((card) => (
                            <SavedCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
