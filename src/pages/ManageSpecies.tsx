// src/pages/ManageSpecies.tsx

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import { fetchSpacies, addSpecies } from "@/services/species"
import { Search } from "lucide-react";

import SpeciesEditModel from "@/components/species/SpeciesEditModel"

interface Species {
  id: number
  name: string
  description: string
}

const ManageSpecies = () => {
  const [speciesList, setSpeciesList] = useState<Species[]>([])
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [loading, setLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSpecies()
  }, [])

  const handleSearch = () => {
        loadSpecies(searchTerm)
        toast.info("Search functionality not implemented yet")
    }

  const loadSpecies = async (query = "") => {
    try {
      const data = await fetchSpacies(query)
      setSpeciesList(data)
    } catch (err) {
      toast.error("Failed to fetch species ❌")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await addSpecies(formData)
      toast.success("Species added ✅")
      setFormData({ name: "", description: "" })
      loadSpecies()
    } catch (err) {
      toast.error("Failed to add species ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto mt-8 px-4 md:px-6 space-y-6 md:mt-12">
      <h2 className="text-xl text-center font-bold mb-4 text-primary">🌱 Manage Seed Species</h2>
      {/* Add Species Form */}
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle>🏷️ Register New Seed Species</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                />
            </div>
            <div className="col-span-full">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Saving..." : "Add Species"}
                </Button>
            </div>
            </form>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row items-center gap-3 w-full">
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

      {/* Species Table */}
      <Card>
        <CardHeader>
          <CardTitle>🌿 Existing Species</CardTitle>
        </CardHeader>
        <CardContent className="w-full overflow-x-auto px-2 sm:px-4 md:px-6">
          <table className="w-full table-auto text-sm whitespace-nowrap">
            <colgroup>
                <col className="w-[20%]" />
                <col className="w-[60%]" />
                <col className="w-[20%]" />
            </colgroup>
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2 md:px-4 w-1/4">Name</th>
                <th className="py-2 px-2 md:px-4 w-2/4">Description</th>
                <th className="py-2 px-2 md:px-4 w-1/4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {speciesList.map((species) => (
                <tr key={species.id} className="border-b hover:bg-muted">
                  <td className="py-2 px-2 md:px-4 font-medium">{species.name}</td>
                  <td className="py-2 px-2 md:px-4 text-muted-foreground">
                    {species.description || "—"}
                  </td>
                  <td className="text-right py-2 px-2 md:px-4">
                    <div>
                        <SpeciesEditModel 
                            specie={species}
                            onUpdate={(updatedSpecie) => {
                                setSpeciesList((prev) =>
                                prev.map((s) => (s.id === updatedSpecie.id ? updatedSpecie : s))
                                )
                            }}
                        />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageSpecies
