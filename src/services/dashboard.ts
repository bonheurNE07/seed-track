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
  console.log(res.data)
  return res.data;
};

// Calendar View
export const fetchDistributionCalendar = async (month: string) => {
  const res = await api.get(`/dashboard/distribution-calendar/?month=${month}`);
  return res.data;
};

// Download Recent Distributions Report
export const downloadDistributionReport = async (distributionId: number) => {
  const res = await api.get(`/distributions/${distributionId}/pdf/`, {
    responseType: 'blob', // Important for file downloads
  });

  // Trigger download in browser
  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `distribution-${distributionId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
