import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Link } from 'react-router-dom';
import { Users, Leaf, Clock, CheckCircle  } from 'lucide-react';
import { format } from 'date-fns';
import FarmerViewModal from '@/components/dashboard/FarmerViewModal';
import FarmerEditModal from '@/components/dashboard/FarmerEditModal';
import type { Farmer } from '@/types';
import type { Recentdistribution } from '@/types';
import ReportViewModal from '@/components/dashboard/ReportViewModal';
import { downloadDistributionReport } from '@/services/dashboard';
import { fetchAgentDistributionChart } from "@/services/dashboard";
import { ChartAreaInteractive } from '@/components/dashboard/AgentDistributionChart';


import {
  fetchDashboardStats,
  fetchRecentFarmers,
  fetchRecentDistributions,
  fetchDistributionCalendar
} from '@/services/dashboard';

import { toast } from 'react-toastify';

export default function Home() {
  const [agentChartData, setAgentChartData] = useState([]);

  const [stats, setStats] = useState({
    total_farmers: 0,
    seeds_distributed_today: 0,
    total_species: 0,
    pending_verifications: 0
  });

  const [recentFarmers, setRecentFarmers] = useState<Farmer[]>([]);
  const [recentDistributions, setRecentDistributions] = useState<Recentdistribution[]>([]);
  const [distributionCalendar, setDistributionCalendar] = useState({});

  const SkeletonCard = () => (
    <div className="min-w-[280px] h-[140px] bg-muted animate-pulse rounded-lg shadow p-4 flex flex-col justify-between space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
      <div className="flex gap-2 mt-auto">
        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );

  const SkeletonDistributionCard = () => (
    <div className="min-w-[280px] h-[160px] bg-muted animate-pulse rounded-lg shadow p-4 flex flex-col justify-between space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
      <ul className="mt-2 space-y-1 text-sm">
        <li className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        <li className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
      </ul>
      <div className="flex gap-2 mt-auto">
        <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAgentDistributionChart();
        setAgentChartData(data);

        const [statsData, farmersData, distributionsData, calendarData] = await Promise.all([
          fetchDashboardStats(),
          fetchRecentFarmers(),
          fetchRecentDistributions(),
          fetchDistributionCalendar('2025-06') // could also be dynamic from `new Date()`
        ]);

        setStats(statsData);
        setRecentFarmers(farmersData);
        setRecentDistributions(distributionsData);
        setDistributionCalendar(calendarData);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className=" container p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
        <Card className="bg-card dark:bg-card text-gray-900 dark:text-gray-200 flex-col gap-1 ">
          <CardContent className="flex items-center justify-between py-3 sm:py-4">
            <div>
              <p className="text-sm mb-2">Registered Farmers</p>
              <h2 className="text-2xl font-bold">{stats.total_farmers}</h2>
            </div>
            <Users className="w-6 h-6" />
          </CardContent>
          <CardFooter className="hidden sm:block flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Registred Farmers
            </div>
        </CardFooter>
        </Card>

        <Card className="bg-card dark:bg-card text-gray-900 dark:text-gray-200 flex-col gap-1">
          <CardContent className="flex items-center justify-between py-3 sm:py-4">
            <div>
              <p className="text-sm mb-2">Seeds Today</p>
              <h2 className="text-2xl font-bold">{stats.seeds_distributed_today}</h2>
            </div>
            <Leaf className="w-6 h-6" />
          </CardContent>
          <CardFooter className="hidden sm:block flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Seeds Distributed Today
            </div>
        </CardFooter>
        </Card>

        <Card className="bg-card dark:bg-card text-gray-900 dark:text-gray-200 flex-col gap-1">
          <CardContent className="flex items-center justify-between py-3 sm:py-4">
            <div>
              <p className="text-sm mb-2">Species</p>
              <h2 className="text-2xl font-bold">{stats.total_species}</h2>
            </div>
            <CheckCircle className="w-6 h-6" />
          </CardContent>
          <CardFooter className="hidden sm:block flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Seed Species We have
            </div>
        </CardFooter>
        </Card>

        <Card className="bg-card dark:bg-card text-gray-900 dark:text-gray-200 flex-col gap-1">
          <CardContent className="flex items-center justify-between py-3 sm:py-4">
            <div>
              <p className="text-sm mb-2">Pending Verifications</p>
              <h2 className="text-2xl font-bold">{stats.pending_verifications}</h2>
            </div>
            <Clock className="w-6 h-6" />
          </CardContent>
          <CardFooter className="hidden sm:block flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Farmer Registrations Panding Verification
            </div>
        </CardFooter>
        </Card>
      </div>

      {/* Recent Farmers */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">🧑‍🌾 Recent Farmer Registrations</h3>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto space-x-4 pb-2 snap-x">
          {recentFarmers.length === 0
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : recentFarmers.slice(0, 5).map((farmer) => (
                <div
                  key={farmer.id}
                  className="min-w-[280px] bg-card dark:bg-card rounded-lg shadow p-4 snap-start flex flex-col justify-between"
                >
                  <div>
                    <p className="font-medium">{farmer.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {farmer.province} · {farmer.phone_number}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <FarmerViewModal farmer={farmer} />
                    <FarmerEditModal
                      farmer={farmer}
                      onUpdate={(updatedFarmer) => {
                        setRecentFarmers((prev) =>
                          prev.map((f) => (f.id === updatedFarmer.id ? updatedFarmer : f))
                        );
                        toast.success("Farmer updated successfully ✅");
                      }}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Recent Distributions */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">🌱 Recent Seed Distributions</h3>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-hide space-x-4 pb-2 snap-x"> 
          {recentDistributions.length === 0
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonDistributionCard key={i} />)
            : recentDistributions.slice(0, 5).map((dist, index) => (
            <div
              key={index}
              className="min-w-[280px] bg-card dark:bg-card rounded-lg shadow p-4 snap-start flex flex-col justify-between"
            >
              <div>
                <div className="mb-1 font-medium">{dist.farmer_name}</div>
                <div className="text-sm text-muted-foreground">
                  {dist.province} / {dist.district} / {dist.sector} / {dist.village} ·{" "}
                  {format(new Date(dist.distributed_at), "PPP")}
                </div>
                <ul className="mt-2 list-disc list-inside text-sm">
                  {dist.items.map((item, idx) => (
                    <li key={idx}>
                      {item.species_name}: {item.quantity}kg
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <ReportViewModal report={dist} />
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => downloadDistributionReport(dist.id)}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🔍 Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button variant="default" asChild>
            <Link to="/farmer-regist">🧾 Register Farmer</Link>
          </Button>
          <Button variant="default">
            <Link to="/seed-record">🚚 New Distribution</Link>
          </Button>
          <Button variant="default">
            <Link to="/farmers">👥 Farmers</Link>
          </Button>
          <Button variant="default">
            <Link to="/species">🏷️ Add Species</Link>
          </Button>
        </div>
      </div>

      {/* Calendar Placeholder */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar (Fixed Width) */}
        <div className="md:w-[280px] w-full">
          <h3 className="text-lg font-semibold mb-2">📅 Activity Calendar</h3>
          <div className="rounded-xl bg-white dark:bg-card shadow p-4 h-full">
            <Calendar
              mode="single"
              selected={new Date()}
              onSelect={() => {}}
              className="rounded"
              modifiers={{
                hasDistribution: Object.keys(distributionCalendar).map((d) => new Date(d)),
              }}
              modifiersClassNames={{
                hasDistribution: "bg-green-300 dark:bg-green-700 text-white",
              }}
            />
          </div>
        </div>

        {/* Chart (Flexible Width & Height) */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">📈 My Daily Distribution Chart</h3>
          <div className="bg-white dark:bg-card shadow p-4 rounded-xl h-full">
            <ChartAreaInteractive chartData={agentChartData} />
          </div>
        </div>
      </div>

    </div>
  );
}