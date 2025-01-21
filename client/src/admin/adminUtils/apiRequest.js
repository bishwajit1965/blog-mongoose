import Swal from "sweetalert2";

const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  token = null,
  options = {}
) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(data &&
      !(data instanceof FormData) && { "Content-Type": "application/json" }),
  };

  const fetchOptions = {
    method,
    headers,
    ...(data && {
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "An error occurred");
    }

    // Display success message with SweetAlert2
    if (options.autoMessage !== false) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: responseData.message || "Operation is successful!",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }

    return {
      success: true,
      data: responseData,
      message: responseData.message || "Request is successful!",
    };
  } catch (error) {
    // Display error message with SweetAlert2
    if (options.autoMessage !== false) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong!",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }

    return {
      success: false,
      error: error.message || "Network error",
    };
  }
};

export default apiRequest;
