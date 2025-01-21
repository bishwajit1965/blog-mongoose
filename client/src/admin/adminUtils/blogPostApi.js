import fetchWithAuth from "./fetchWithAuth";

const apiUrl = "http://localhost:5000/api/blogPost";

const blogPostApi = {
  // Create blog post
  async createBlogPost(postData) {
    return await fetchWithAuth(`${apiUrl}`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
  },

  // Get all blog post
  async getAllBlogPosts() {
    return await fetchWithAuth(`${apiUrl}`, {
      method: "GET",
    });
  },

  // Update blog  post
  async updateBlogPost(id, updatedData) {
    return await fetchWithAuth(`${apiUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
    });
  },

  // Delete blog post
  async deleteBlogPost(id) {
    return await fetchWithAuth(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  },
};

export default blogPostApi;
