import fetchWithAuth from "./fetchWithAuth";

const apiUrl = "http://localhost:5000/api/categories";

const categoryApi = {
  async getAllCategories() {
    const response = await fetchWithAuth(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    return await response.json();
  },
};

export default categoryApi;
