import api from "./api"; 

export const fetchFarmers = async (query = "") => {
  const res = await api.get(`/farmers/?search=${query}`);
  return res.data;
};

export const fetchFarmerHistory = async (farmerId: number) => {
  const res = await api.get(`/farmers/${farmerId}/history/`);
  return res.data;
};
