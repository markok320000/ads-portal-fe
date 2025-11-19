'use client';
import {SiteHeader} from "@/components/site-header"
import AdCampaignSelector from "@/app/campaign/components/ad-campaign-selector";
import {ClickableStepper} from "@/components/clickable-stepper";


export default function Page() {
    return (
        <div className="w-full">
            <SiteHeader
                title="Ad Campaign"
                description="Choose your campaign type and start advertising on allchat"
            />

            <div className="w-full flex flex-col items-center mx-auto max-w-5xl space-y-8 p-6 md:p-12 ">
                <ClickableStepper
                    steps={['Select Type', 'Configure', 'Payment']}
                    currentStep={0}
                    onStepChange={() => {
                    }}
                />
                <div className="mt-6"><AdCampaignSelector/></div>
            </div>
        </div>

    );
}
