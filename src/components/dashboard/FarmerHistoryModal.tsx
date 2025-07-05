import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { fetchFarmerHistory } from "@/services/farmers";

interface Props {
  farmerId: number;
}

export default function FarmerHistoryModal({ farmerId }: Props) {
  const [history, setHistory] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
        fetchFarmerHistory(farmerId).then(setHistory);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View History
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>📜 Distribution History</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No distribution history available.</p>
          ) : (
            history.map((entry, idx) => (
              <div key={idx} className="border p-2 rounded">
                <p className="text-sm font-semibold">
                  Date: {format(new Date(entry.distributed_at), "PPP")}
                </p>
                <p className="text-sm">Agent: {entry.agent_name}</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  {entry.items.map((item: any, index: number) => (
                    <li key={index}>
                      {item.species_name}: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
