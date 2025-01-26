const API_URL = process.env.API_URL;

export const createInspection = async (inspectionData) => {
  const response = await fetch(`${API_URL}/inspection`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inspectionData),
  });

  return response.json();
};
