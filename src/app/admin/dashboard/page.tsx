import {SiteHeader} from "@/components/site-header"
import {AdminSectionCards} from "@/components/admin-section-cards"
import {ChartAreaPurchasedAds} from "@/components/chart-area-purchased-ads"
import {ChartBarRevenue} from "@/components/chart-bar-revenue"
import {AdsTable} from "@/components/ads-table"
import {MOCK_ADS} from "@/data/mock-ads"

export default function AdminDashboardPage() {
    return (
        <div>
            <SiteHeader
                title="Admin Dashboard"
                description="Overview of platform analytics and metrics"
            />
            <div className="w-full flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <AdminSectionCards/>
                        <div className="px-4 lg:px-6">
                            <ChartAreaPurchasedAds/>
                        </div>
                        <div className="px-4 lg:px-6">
                            <ChartBarRevenue/>
                        </div>
                        <div className="px-4 lg:px-6">
                            <h2 className="text-lg font-semibold mb-4">Submitted Ads</h2>
                            <AdsTable
                                ads={MOCK_ADS.filter(ad => ad.approvalState === 'submitted')}
                                viewDetailsPath="/admin/ads"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
