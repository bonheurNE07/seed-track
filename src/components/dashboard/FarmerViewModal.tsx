import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CalendarDays, Phone, User, MapPin, BadgeInfo } from "lucide-react";
import { format } from "date-fns";

interface Farmer {
  full_name: string;
  national_id: string;
  phone_number: string;
  province: string;
  registreted_at: string;
}

export default function FarmerViewModal({ farmer }: { farmer: Farmer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">👤 Farmer Details</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Detailed information about this registered farmer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 text-sm">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 mt-1 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Full Name</p>
              <p className="text-gray-700 dark:text-gray-300">{farmer.full_name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BadgeInfo className="w-5 h-5 mt-1 text-purple-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">National ID</p>
              <p className="text-gray-700 dark:text-gray-300">{farmer.national_id}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 mt-1 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Phone</p>
              <p className="text-gray-700 dark:text-gray-300">{farmer.phone_number}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 text-red-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Province</p>
              <p className="text-gray-700 dark:text-gray-300">{farmer.province}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 mt-1 text-yellow-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Registered At</p>
              <p className="text-gray-700 dark:text-gray-300">
                {format(new Date(farmer.registreted_at), "PPPp")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
