export interface Farmer {
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

export interface ReportItem {
  species_name: string;
  quantity: number;
}

export interface Recentdistribution {
    id: number;
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
