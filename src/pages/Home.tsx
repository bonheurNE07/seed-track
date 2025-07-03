import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Link } from 'react-router-dom';
import { Users, Leaf, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import FarmerViewModal from '@/components/dashboard/FarmerViewModal';
import ReportViewModal from '@/components/dashboard/ReportViewModal';
import { downloadDistributionReport } from '@/services/dashboard';
import FarmerEditModal from '@/components/dashboard/FarmerEditModal';

import {
  fetchDashboardStats,
  fetchRecentFarmers,
  fetchRecentDistributions,
  fetchDistributionCalendar
} from '@/services/dashboard';

import { toast } from 'react-toastify';

export default function Home() {
  const [stats, setStats] = useState({
    total_farmers: 0,
    seeds_distributed_today: 0,
    total_species: 0,
    pending_verifications: 0
  });

  const [recentFarmers, setRecentFarmers] = useState([]);
  const [recentDistributions, setRecentDistributions] = useState([]);
  const [distributionCalendar, setDistributionCalendar] = useState({});
  
  useEffect(() => {
    const loadData = async () => {
      try {
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
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm">Registered Farmers</p>
              <h2 className="text-2xl font-bold">{stats.total_farmers}</h2>
            </div>
            <Users className="w-6 h-6" />
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-100">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm">Seeds Today</p>
              <h2 className="text-2xl font-bold">{stats.seeds_distributed_today}</h2>
            </div>
            <Leaf className="w-6 h-6" />
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-100">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm">Species</p>
              <h2 className="text-2xl font-bold">{stats.total_species}</h2>
            </div>
            <CheckCircle className="w-6 h-6" />
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-100">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm">Pending Verifications</p>
              <h2 className="text-2xl font-bold">{stats.pending_verifications}</h2>
            </div>
            <Clock className="w-6 h-6" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Farmers */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🧑‍🌾 Recent Farmer Registrations</h3>
        <div className="space-y-2">
          {recentFarmers.map((farmer) => (
            <div key={farmer.id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div>
                <p className="font-medium">{farmer.full_name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {farmer.province} · {farmer.phone_number}
                </p>
              </div>
              <div className="space-x-2">
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
      <div>
        <h3 className="text-lg font-semibold mb-2">🌱 Recent Seed Distributions</h3>
        <div className="space-y-2">
          {recentDistributions.map((dist, index) => (
            <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="mb-1 font-medium">{dist.farmer_name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {dist.province} / {dist.district} / {dist.sector} / {dist.village} · {format(new Date(dist.distributed_at), 'PPP')}
              </div>
              <ul className="mt-2 list-disc list-inside text-sm">
                {dist.items.map((item, idx) => (
                  <li key={idx}>{item.species_name}: {item.quantity}kg</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
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
          <Button variant="default">📤 Export Report</Button>
          <Button variant="default">🏷️ Add Species</Button>
        </div>
      </div>

      {/* Calendar Placeholder */}
      <div>
        <h3 className="text-lg font-semibold mb-2">📅 Activity Calendar</h3>
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4">
          <Calendar mode="single" selected={new Date()} onSelect={() => {}} className="rounded" 
            modifiers={{
              hasDistribution: Object.keys(distributionCalendar).map((d) => new Date(d))
            }}
            
            modifiersClassNames={{
              hasDistribution: 'bg-green-300 dark:bg-green-700 text-white'
            }}/>
          {/* You can customize calendar day tiles using distributionCalendar */}
        </div>
      </div>
    </div>
  );
}