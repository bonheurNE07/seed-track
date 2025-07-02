import api from './api';

// Dashboard Stats
export const fetchDashboardStats = async () => {
  const res = await api.get('/dashboard/stats/');
  return res.data;
};

// Recent Farmers
export const fetchRecentFarmers = async () => {
  const res = await api.get('/dashboard/recent-farmers/');
  return res.data;
};

// Recent Distributions
export const fetchRecentDistributions = async () => {
  const res = await api.get('/dashboard/recent-distributions/');
  return res.data;
};

// Calendar View
export const fetchDistributionCalendar = async (month: string) => {
  const res = await api.get(`/dashboard/distribution-calendar/?month=${month}`);
  return res.data;
};
