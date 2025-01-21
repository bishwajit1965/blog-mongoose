export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token"); // Ensure token is stored and retrieved properly

  if (!token) {
    throw new Error(
      "Authorization token not found. User might not be logged in."
    );
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Inject the token into the request header
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Handle HTTP errors
      return await response.json();
    }
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error for further handling
  }
};

export default fetchWithAuth;
