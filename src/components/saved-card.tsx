import { StripeCard } from "@/models/stripe";
import { IconBrandMastercard, IconBrandVisa, IconCreditCard } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface SavedCardProps {
    card: StripeCard;
    className?: string;
}

export function SavedCard({ card, className }: SavedCardProps) {
    const isVisa = card.brand.toLowerCase() === "visa";
    const isMastercard = card.brand.toLowerCase() === "mastercard";

    return (
        <div
            className={cn(
                "relative w-full max-w-sm aspect-[1.586/1] rounded-xl p-6 text-white shadow-xl transition-transform hover:scale-[1.02]",
                "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900",
                "border border-white/10",
                className
            )}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs tracking-wider text-white/70 uppercase">
                            {card.funding}
                        </span>
                        <IconCreditCard className="h-6 w-6 text-white/50" />
                    </div>
                    {isVisa && <IconBrandVisa className="h-12 w-12 text-white" />}
                    {isMastercard && <IconBrandMastercard className="h-12 w-12 text-white" />}
                    {!isVisa && !isMastercard && (
                        <span className="text-lg font-bold uppercase tracking-wider">{card.brand}</span>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        </div>
                        <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        </div>
                        <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        </div>
                        <span className="font-mono text-xl tracking-widest text-white">
                            {card.last4}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-white/60">
                                Card Holder
                            </span>
                            <span className="font-medium tracking-wide">Marko Ilic</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-wider text-white/60">
                                Expires
                            </span>
                            <span className="font-mono font-medium tracking-wide">
                                {card.exp_month.toString().padStart(2, "0")}/{card.exp_year.toString().slice(-2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
