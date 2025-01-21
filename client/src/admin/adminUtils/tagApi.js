import fetchWithAuth from "./fetchWithAuth";

const apiUrl = "http://localhost:5000/api/tags";

const tagApi = {
  async getAllTags() {
    const response = await fetchWithAuth(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching tags: ${response.statusText}`);
    }
    return await response.json();
  },
};

export default tagApi;
