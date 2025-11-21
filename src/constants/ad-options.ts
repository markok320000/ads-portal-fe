import {AdOption} from "@/models/AdOption";
import {ImageIcon, Play, Type} from "lucide-react";

export const AD_OPTIONS: AdOption[] = [
    {
        id: 'text',
        title: 'Text Advertisement',
        description:
            'Basic text-only ad. Ideal for short written messages, announcements, or simple promotional lines. Pure text format - no images.',
        pricePerMille: 10.0,
        icon: Type,
        features: [
            'Click-through URL',
            'Text-only format'
        ]
    },
    {
        id: 'photo',
        title: 'Display / Photo Ad',
        description:
            'High-visibility visual ad format for banners, feeds, or promotional sections. Best for brand impressions and clean visual impact.',
        pricePerMille: 30.0,
        icon: ImageIcon,
        features: [
            'PNG/JPG support',
            'Combine with Text (optional)'
        ]
    },
    {
        id: 'video',
        title: 'Video Commercial',
        description:
            'Premium video placement engineered for strong engagement and high conversion rates. Great for storytelling, demonstrations, and brand showcases.',
        pricePerMille: 30.0,
        icon: Play,
        recommended: true,
        features: [
            'Best for high conversion campaigns',
            'Combine with Text (optional)'
        ]
    }
];
