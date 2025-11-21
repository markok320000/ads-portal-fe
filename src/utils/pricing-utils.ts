import {AdType} from "@/models/adType";

export const MAX_CHAR_COUNT = 500;

export const TIER_1_LIMIT = 125;
export const TIER_2_LIMIT = 250;

export const TIER_1_PRICE = 10;
export const TIER_2_PRICE = 15;
export const TIER_3_PRICE = 20;

export const IMAGE_BASE_PRICE = 30;
export const VIDEO_BASE_PRICE = 30;

export function calculateTextCPM(textLength: number): number {
    if (textLength === 0) return 0;
    if (textLength <= TIER_1_LIMIT) return TIER_1_PRICE;
    if (textLength <= TIER_2_LIMIT) return TIER_2_PRICE;
    return TIER_3_PRICE;
}

export function calculateAdCost(adType: AdType, textLength: number, views: number): {
    totalCost: number;
    baseCPM: number;
    textCPM: number;
    totalCPM: number;
} {
    let baseCPM = 0;

    switch (adType) {
        case 'photo':
            baseCPM = IMAGE_BASE_PRICE;
            break;
        case 'video':
            baseCPM = VIDEO_BASE_PRICE;
            break;
        case 'text':
        default:
            baseCPM = 0;
            break;
    }

    const textCPM = calculateTextCPM(textLength);

    let totalCPM = 0;
    if (adType === 'text') {
        // For text ads, minimum price is Tier 1 even if text is empty (starting price)
        totalCPM = textLength === 0 ? TIER_1_PRICE : textCPM;
    } else {
        totalCPM = baseCPM + textCPM;
    }

    const totalCost = (views / 1000) * totalCPM;

    return {
        totalCost,
        baseCPM,
        textCPM: (adType === 'text' && textLength === 0) ? TIER_1_PRICE : textCPM,
        totalCPM
    };
}
