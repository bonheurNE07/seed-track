import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
 import { Button } from "../ui/button";


 interface Farmer {
  full_name: string;
  national_id: string;
  phone_number: string;
  province: string;
  registreted_at: string;
}

export default function FarmerViewModal({ farmer }: { farmer: Farmer }) {
  return (<Dialog>
  <DialogTrigger>View</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>👤 Farmer Details</DialogTitle>
      <DialogDescription>
        <p><strong>Name:</strong> {farmer.full_name}</p>
        <p><strong>National ID:</strong> {farmer.national_id}</p>
        <p><strong>Phone:</strong> {farmer.phone_number}</p>
        <p><strong>Province:</strong> {farmer.province}</p>
        <p><strong>Registered:</strong> {new Date(farmer.registreted_at).toLocaleString()}</p>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  );
}
