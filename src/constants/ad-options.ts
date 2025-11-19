import { AdOption } from "@/models/AdOption";
import { ImageIcon, Play, Type } from "lucide-react";

export const AD_OPTIONS: AdOption[] = [
    {
        id: 'text',
        title: 'Text Advertisement',
        description: 'High-intent focus. Best for search results and sidebar placements where reading is priority.',
        pricePerMille: 4.50,
        icon: Type,
        features: ['Headline (30 chars)', 'Description (90 chars)', 'Click-through URL']
    },
    {
        id: 'photo',
        title: 'Display / Photo Ad',
        description: 'Visual engagement. Ideal for feed interruptions and banner placements to build brand awareness.',
        pricePerMille: 8.75,
        icon: ImageIcon,
        features: ['1080x1080 or 16:9', 'PNG/JPG Support', 'Visual Call-to-Action']
    },
    {
        id: 'video',
        title: 'Video Commercial',
        description: 'Maximum conversion. Immersive storytelling for pre-roll or in-feed autoplay placements.',
        pricePerMille: 15.00,
        icon: Play,
        recommended: true,
        features: ['Up to 30 seconds', 'Auto-play enabled', 'Sound-on optional']
    }
];
