import {StatCard} from "@/components/stat-card";
import {NotifyCard} from "@/components/NotifyCard";
import Link from "next/link";

const statsData = [
    {
        id: 1,
        title: "Today's Revenue",
        value: "$2,847",
        trend: "up" as const,
        trendValue: "+12%",
        footerText: "Compared to yesterday",
        description: "Total revenue from ad purchases",
    },
];

const notifyCardsData = [
    {
        id: 2,
        title: "Submitted Ads",
        value: 8,
        label: "Review",
        description: "Ads waiting for approval",
        variant: "warning",
        href: "/admin/ads?status=submitted",
    },
    {
        id: 3,
        title: "Active Ads",
        value: 24,
        label: "View",
        description: "Currently active ads",
        variant: "success",
        href: "/admin/ads?status=active",
    },
];

export function AdminSectionCards() {
    return (
        <div
            className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
            {statsData.map((stat) => (
                <StatCard
                    key={stat.id}
                    title={stat.title}
                    value={stat.value}
                    trend={stat.trend}
                    trendValue={stat.trendValue}
                    footerText={stat.footerText}
                    description={stat.description}
                />
            ))}

            {notifyCardsData.map((card) => (
                <Link key={card.id} href={card.href} className="contents">
                    <NotifyCard
                        title={card.title}
                        value={card.value}
                        label={card.label}
                        description={card.description}
                        variant={card.variant as "default" | "success" | "warning" | "destructive"}
                    />
                </Link>
            ))}
        </div>
    );
}
