const API_URL = process.env.API_URL;

export const inspectionApi = {
  getInspectionList: async (limit = 0) => {
    const response = await fetch(`${API_URL}/inspection?limit=${limit}`);
    return response.json();
  },
  createInspection: async (inspectionData) => {
    const response = await fetch(`${API_URL}/inspection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inspectionData),
    });

    return response.json();
  },
};
