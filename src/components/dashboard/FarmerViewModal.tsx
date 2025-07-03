import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  CalendarDays,
  Phone,
  User,
  MapPin,
  BadgeInfo,
  BadgePlus,
  CircleUserRound
} from "lucide-react";
import { format } from "date-fns";

interface Farmer {
  full_name: string;
  national_id: string;
  phone_number: string;
  province: string;
  registreted_at: string;
  birth_date: string;
  sex: string;
  country: string;
  district: string;
  sector: string;
  cellule: string;
  village: string;
}

export default function FarmerViewModal({ farmer }: { farmer: Farmer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] sm:max-w-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">👤 Farmer Details</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            A quick summary of this registered farmer.
          </DialogDescription>
        </DialogHeader>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          {/* Personal Info */}
          <InfoCard icon={<CircleUserRound className="text-blue-600" />} label="Full Name" value={farmer.full_name} />
          <InfoCard icon={<CalendarDays className="text-indigo-600" />} label="Birth Date" value={farmer.birth_date} />
          <InfoCard icon={<BadgePlus className="text-pink-500" />} label="Sex" value={farmer.sex} />
          <InfoCard icon={<BadgeInfo className="text-purple-600" />} label="National ID" value={farmer.national_id} />
          <InfoCard icon={<Phone className="text-green-600" />} label="Phone" value={farmer.phone_number} />
          <InfoCard icon={<CalendarDays className="text-yellow-600" />} label="Registered At" value={format(new Date(farmer.registreted_at), "PPPp")} />

          {/* Location Info */}
          <Divider label="Location" />
          <InfoCard icon={<MapPin className="text-red-500" />} label="Country" value={farmer.country} />
          <InfoCard icon={<MapPin className="text-red-500" />} label="Province" value={farmer.province} />
          <InfoCard icon={<MapPin className="text-red-500" />} label="District" value={farmer.district} />
          <InfoCard icon={<MapPin className="text-red-500" />} label="Sector" value={farmer.sector} />
          <InfoCard icon={<MapPin className="text-red-500" />} label="Cell" value={farmer.cellule} />
          <InfoCard icon={<MapPin className="text-red-500" />} label="Village" value={farmer.village} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-muted/30 dark:bg-muted/20 p-3 rounded-md">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm text-gray-900 dark:text-gray-100">{value || "—"}</p>
      </div>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="col-span-full border-b border-gray-300 dark:border-gray-700 pb-1 mt-4 text-sm font-medium text-muted-foreground">
      {label}
    </div>
  );
}
