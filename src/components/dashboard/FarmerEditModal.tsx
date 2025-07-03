import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Farmer {
  id: number;
  full_name: string;
  national_id: string;
  phone_number: string;
  province: string;
  registreted_at: string;
}

export default function FarmerEditModal({ farmer }: { farmer: Farmer }) {
  const [form, setForm] = useState({
    full_name: farmer.full_name,
    phone_number: farmer.phone_number,
    province: farmer.province,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Save changes for:", farmer.id, form);
    // Later: await updateFarmer(farmer.id, form);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Farmer</DialogTitle>
          <DialogDescription>Update farmer information below.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Input
              id="province"
              name="province"
              value={form.province}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
