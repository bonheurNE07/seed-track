import React from 'react'
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { Pencil } from 'lucide-react';
import { updateSpecies } from '@/services/species';

interface Specie {
    id: number;
    name: string;
    description: string;
}

function SpeciesEditModel({specie, onUpdate}: {specie: Specie, onUpdate?: (updatedSpecie: Specie) => void}) {
    const [form, setForm] = useState({ ...specie });
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await updateSpecies(specie.id, form);
            toast.success("Farmer updated successfully");
            onUpdate?.(updated);
            setOpen(false);
        } catch (error) {
            console.error("Error updating specie:", error);
            toast.error("Failed to update specie");
        } finally {
            setSaving(false);
        }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Pencil className="w-4 h-4 mr-2" />Edit</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">✏️ Edit Specie</DialogTitle>
          <DialogDescription>Update specie details below:</DialogDescription>
        </DialogHeader>

        <form className="grid grid-cols-1 gap-6 mt-4">
          <div className='space-y-2'><Label>Name</Label><Input name="name" value={form.name} onChange={handleChange} /></div>
          <div className='space-y-2'><Label>Description</Label><Textarea name="description" value={form.description} onChange={handleChange} /></div>
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
  )
}

export default SpeciesEditModel