import { useState } from "react";
import { AdType } from "@/models/adType";
import { AD_OPTIONS } from "@/constants/ad-options";

export interface CampaignDetails {
    name: string;
    text: string;
    media: File | null;
    mediaUrl: string | null;
    views: number;
}

export interface ValidationErrors {
    name?: string;
    text?: string;
    media?: string;
}

export function useCampaignCreator() {
    // 1. Stepper State
    const [currentStep, setCurrentStep] = useState(0);

    // 2. Data State
    const [adType, setAdType] = useState<AdType>('photo');
    const [details, setDetails] = useState<CampaignDetails>({
        name: '',
        text: '',
        media: null,
        mediaUrl: null,
        views: 1000
    });
    const [errors, setErrors] = useState<ValidationErrors>({});

    // --- Logic Actions ---

    const goToStep = (step: number) => {
        setCurrentStep(step);
    };

    const validateConfiguration = (): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        if (!details.name.trim()) {
            newErrors.name = 'Campaign name is required';
            isValid = false;
        }

        if (!details.text.trim()) {
            newErrors.text = 'Ad text content is required';
            isValid = false;
        }

        // Only require media if NOT a text ad
        if (adType !== 'text' && !details.media && !details.mediaUrl) {
            newErrors.media = 'Media (photo or video) is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (validateConfiguration()) {
                setCurrentStep((prev) => prev + 1);
            }
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
    };

    // Select Ad Type logic (Modified)
    const selectAdType = (type: AdType) => {
        // Only perform updates if the type is actually different
        // This prevents accidental data wiping if they click the same card twice
        if (type !== adType) {
            setAdType(type);
            // Reset details but keep default views
            setDetails(prev => ({
                ...prev,
                name: '',
                text: '',
                media: null,
                mediaUrl: null
            }));
            setErrors({});
        }
    };

    return {
        // State
        currentStep,
        adType,
        details,
        errors,
        adOptions: AD_OPTIONS,

        // Actions
        goToStep,
        nextStep,
        prevStep,
        setAdType: selectAdType,
        setDetails,
        setErrors
    };
}