import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AdOption } from "@/models/AdOption";
import { CampaignDetails } from "@/hooks/use-campaign-creator";
import { useMemo } from "react";

interface CostEstimationCardProps {
    details: CampaignDetails;
    setDetails: (value: React.SetStateAction<CampaignDetails>) => void;
    currentOption: AdOption;
}

export default function CostEstimationCard({
    details,
    setDetails,
    currentOption
}: CostEstimationCardProps) {

    const viewsCost = useMemo(() => {
        return (details.views / 1000) * currentOption.pricePerMille;
    }, [details.views, currentOption]);

    const totalEstimate = viewsCost;

    return (
        <Card className="border-slate-200 shadow-sm h-full">
            <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="space-y-8">
                    {/* Target Views Slider Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-semibold text-slate-900">Target Views</Label>
                            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                                {details.views.toLocaleString()}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Slider
                                defaultValue={[details.views]}
                                value={[details.views]}
                                max={30000}
                                min={1000}
                                step={1000}
                                onValueChange={(vals) => setDetails(prev => ({ ...prev, views: vals[0] }))}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>1k views</span>
                                <span>30k views</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Cost Breakdown */}
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Price per 1k views (CPM)</span>
                            <span className="font-medium text-slate-900">${currentOption.pricePerMille.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Views</span>
                            <span className="font-medium text-slate-900">{details.views.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Total Estimate */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-slate-900">Total Estimate</span>
                        <span className="text-3xl font-bold text-blue-600">
                            ${totalEstimate.toFixed(2)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
