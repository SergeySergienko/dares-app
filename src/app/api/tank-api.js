const API_URL = process.env.API_URL;

export const tankApi = {
  getTanksList: async (limit = 0) => {
    const response = await fetch(`${API_URL}/tanks?limit=${limit}`);
    return response.json();
  },
};

export const fetchTanksByInspectionDate = async (monthsAgo, limit = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);

  const response = await fetch(
    `${API_URL}/tanks?endLastInspectionDate=${encodeURIComponent(
      date.toISOString()
    )}&limit=${limit}`
  );

  return response.json();
};

export const fetchTanksByHydrotestDate = async (monthsAgo, limit = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);

  const response = await fetch(
    `${API_URL}/tanks?endLastHydrotestDate=${encodeURIComponent(
      date.toISOString()
    )}&limit=${limit}`
  );

  return response.json();
};

export const fetchTankByInternalNumber = async (internalNumber) => {
  const response = await fetch(
    `${API_URL}/tanks?internalNumber=${internalNumber}`
  );
  const [tank] = await response.json();

  return tank;
};
