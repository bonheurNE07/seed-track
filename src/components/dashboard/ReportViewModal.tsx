import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReportItem {
  species_name: string;
  quantity: number;
}

interface Report {
  farmer_name: string;
  village: string;
  sector: string;
  district: string;
  province: string;
  distributed_at: string;
  farmer_id: string;
  farmer_phone: string;
  farmer_is_verified: string;
  items: ReportItem[];
  agent_id: string;
  agent_name: string;
}

export default function ReportViewModal({ report }: { report: Report }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">View Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>📄 Distribution Report</DialogTitle>
          <DialogDescription>
            <div className="space-y-2 text-sm text-gray-800 dark:text-gray-100 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><strong>Name:</strong> {report.farmer_name}</p>
                <p><strong>Phone:</strong> {report.farmer_phone}</p>
                <p><strong>National ID:</strong> {report.farmer_id}</p>
                <p><strong>Verified:</strong> {report.farmer_is_verified}</p>
                <p><strong>Province:</strong> {report.province}</p>
                <p><strong>District:</strong> {report.district}</p>
                <p><strong>Sector:</strong> {report.sector}</p>
                <p><strong>Village:</strong> {report.village}</p>
                <p className="sm:col-span-2">
                  <strong>Distributed At:</strong> {new Date(report.distributed_at).toLocaleString()}
                </p>
              </div>

              <hr className="my-2 border-gray-300 dark:border-gray-700" />

              <div>
                <h4 className="font-semibold">🧪 Items Distributed:</h4>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  {report.items.map((item, index) => (
                    <li key={index}>
                      {item.species_name}: <span className="font-medium">{item.quantity} kg</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-sm text-muted-foreground">
                <p><strong>Agent ID:</strong> {report.agent_id}</p>
                <p><strong>Agent Name:</strong> {report.agent_name}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
