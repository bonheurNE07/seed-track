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
import { toast } from "react-toastify";
import { updateFarmer } from "@/services/dashboard";

interface Farmer {
  id: number;
  full_name: string;
  national_id: string;
  sex: string;
  birth_date: string;
  phone_number: string;
  country: string;
  province: string;
  district: string;
  sector: string;
  cellule: string;
  village: string;
  registreted_at: string;
}

export default function FarmerEditModal({
  farmer,
  onUpdate,
}: {
  farmer: Farmer;
  onUpdate?: (updatedFarmer: Farmer) => void;
}) {
  const [form, setForm] = useState({ ...farmer });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateFarmer(farmer.id, form);
      toast.success("Farmer updated successfully");
      onUpdate?.(updated);
      setOpen(false);
    } catch (error) {
      console.error("Error updating farmer:", error);
      toast.error("Failed to update farmer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">✏️ Edit Farmer</DialogTitle>
          <DialogDescription>Update farmer details below:</DialogDescription>
        </DialogHeader>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div><Label>Full Name</Label><Input name="full_name" value={form.full_name} onChange={handleChange} /></div>
          <div><Label>Sex</Label><Input name="sex" value={form.sex} onChange={handleChange} /></div>
          <div><Label>Birth Date</Label><Input type="date" name="birth_date" value={form.birth_date} onChange={handleChange} /></div>
          <div><Label>National ID</Label><Input name="national_id" value={form.national_id} onChange={handleChange} /></div>
          <div><Label>Phone Number</Label><Input name="phone_number" value={form.phone_number} onChange={handleChange} /></div>
          <div><Label>Country</Label><Input name="country" value={form.country} onChange={handleChange} /></div>
          <div><Label>Province</Label><Input name="province" value={form.province} onChange={handleChange} /></div>
          <div><Label>District</Label><Input name="district" value={form.district} onChange={handleChange} /></div>
          <div><Label>Sector</Label><Input name="sector" value={form.sector} onChange={handleChange} /></div>
          <div><Label>Cell</Label><Input name="cellule" value={form.cellule} onChange={handleChange} /></div>
          <div><Label>Village</Label><Input name="village" value={form.village} onChange={handleChange} /></div>
        </form>

        {saving && <p className="text-sm text-gray-500 mt-2">Saving farmer...</p>}

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
