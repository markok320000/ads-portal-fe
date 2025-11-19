'use client';
import { SiteHeader } from "@/components/site-header"
import AdCampaignSelector from "@/app/campaign/components/ad-campaign-selector";
import { ClickableStepper } from "@/components/clickable-stepper";
import { useCampaignCreator } from "@/hooks/use-campaign-creator";
import { AD_OPTIONS } from "@/constants/ad-options";
import CampaignConfiguration from "@/app/campaign/components/campaign-configuration";

export default function Page() {
    const {
        currentStep,
        goToStep,
        nextStep,
        adType,
        setAdType,
        details,
        setDetails,
        errors,
        adOptions,
        prevStep
    } = useCampaignCreator();

    const STEPS = ['Select Type', 'Configure', 'Payment'];

    return (
        <div className="w-full">
            <SiteHeader
                title="Ad Campaign"
                description="Choose your campaign type and start advertising on allchat"
            />

            <div className="w-full flex flex-col items-center mx-auto max-w-5xl space-y-8 p-6 md:p-12 ">

                {/* Pass hook logic to Stepper */}
                <ClickableStepper
                    steps={STEPS}
                    currentStep={currentStep}
                    onStepChange={() => { }}
                />

                {/* Step 0: Ad Type Selection */}
                <div className="mt-6 w-full">
                    {currentStep === 0 && (
                        <AdCampaignSelector
                            adOptions={AD_OPTIONS}
                            selectedAd={adType}
                            onSelect={setAdType}
                            onNext={nextStep}
                        />
                    )}

                    {/* Step 1: Configuration */}
                    {currentStep === 1 && (
                        <CampaignConfiguration
                            adType={adType}
                            details={details}
                            setDetails={setDetails}
                            errors={errors}
                            onNext={nextStep}
                            onBack={prevStep}
                            adOptions={adOptions}
                        />
                    )}

                    {currentStep === 2 && (
                        <div className="text-center p-12 border border-dashed border-slate-300 rounded-xl">
                            <h2 className="text-xl font-bold text-slate-700">Payment</h2>
                            <p className="text-slate-500">Stripe integration goes here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}