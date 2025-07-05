import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchFarmers } from "@/services/farmers";
import FarmerViewModal from "@/components/dashboard/FarmerViewModal";
import FarmerHistoryModal from "@/components/dashboard/FarmerHistoryModal";
import FarmerEditModal from "@/components/dashboard/FarmerEditModal";
import type { Farmer } from "@/types";
import { Search } from "lucide-react";

export default function ViewFarmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadFarmers = async (query = "") => {
    try {
      const data = await fetchFarmers(query);
      setFarmers(data);
    } catch (error) {
      console.error("Failed to fetch farmers", error);
    }
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  const handleSearch = () => {
    loadFarmers(searchTerm);
  };

  return (
    <div className="container p-4 sm:p-6 space-y-6">
      {/* Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full">
        <div className="flex flex-1 gap-2 w-full">
          <Input
            placeholder="Search by name, ID, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-1" /> Search
          </Button>
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="block sm:hidden">
        {/* CARD VIEW for mobile */}
        <div className="space-y-4">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="rounded-xl bg-white dark:bg-gray-800 shadow md:p-5 p-4 space-y-1"
            >
              <p className="font-medium">{farmer.full_name}</p>
              <p className="text-sm text-muted-foreground">{farmer.phone_number}</p>
              <p className="text-sm text-muted-foreground">{farmer.province}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(farmer.registreted_at).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <FarmerViewModal farmer={farmer} />
                <FarmerHistoryModal farmerId={farmer.id} />
                <FarmerEditModal
                  farmer={farmer}
                  onUpdate={(updatedFarmer) =>
                    setFarmers((prev) =>
                      prev.map((f) => (f.id === updatedFarmer.id ? updatedFarmer : f))
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:block w-full overflow-x-auto rounded-md shadow">
        {/* TABLE VIEW for desktop */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto text-sm whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-2 text-left">Full Name</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Province</th>
                <th className="p-2 text-left">Registered</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.id} className="border-t hover:bg-accent/30">
                  <td className="p-2">{farmer.full_name}</td>
                  <td className="p-2">{farmer.phone_number}</td>
                  <td className="p-2">{farmer.province}</td>
                  <td className="p-2">
                    {new Date(farmer.registreted_at).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-2 justify-end">
                      <FarmerViewModal farmer={farmer} />
                      <FarmerHistoryModal farmerId={farmer.id} />
                      <FarmerEditModal
                        farmer={farmer}
                        onUpdate={(updatedFarmer) =>
                          setFarmers((prev) =>
                            prev.map((f) =>
                              f.id === updatedFarmer.id ? updatedFarmer : f
                            )
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {farmers.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">No farmers found.</p>
      )}
    </div>
  );
}
