import { DashboardShell } from '@/components/dashboard-shell'
import { LiveOrders } from '@/components/live-orders'
import { MetricCards } from '@/components/metric-cards'
import { RecentActivity } from '@/components/recent-activity'
import { ReservationsTable } from '@/components/reservations-table'
import { RevenueChart } from '@/components/revenue-chart'
import { TopProducts } from '@/components/top-products'

export default function Page() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <MetricCards />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <ReservationsTable />
            <RevenueChart />
            <LiveOrders />
          </div>
          <div className="flex flex-col gap-6">
            <TopProducts />
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
