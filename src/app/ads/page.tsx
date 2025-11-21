import {SiteHeader} from "@/components/site-header";

export default function AdsPage() {
    return (
        <div className="w-full">
            <SiteHeader
                title="My Campaigns"
                description="Manage your ad campaigns"
            />
            <div className="w-full flex flex-col items-center mx-auto max-w-5xl space-y-8 p-6 md:p-12 ">
            </div>
        </div>
    );
}