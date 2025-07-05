import api from './api';

export const fetchSpacies = async (query = "") => {
  const res = await api.get(`/species/?search=${query}`);
  return res.data;
};

export const addSpecies = async (data: { name: string; description?: string }) => {
  const res = await api.post('/species/', data);
  return res.data;
};

export const updateSpecies = async (id: number, data: { name: string; description?: string }) => {
  const res = await api.put(`/species/${id}/`, data);
  return res.data;
};