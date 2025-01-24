import AdminTagContext from "../adminContexts/AdminTagContext";
import { getAllTags } from "../adminServices/tagService";
import { useEffect } from "react";
import { useState } from "react";

const AdminTagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const tagData = await getAllTags();
      setTags(tagData);
    } catch (error) {
      console.error("Error in fetching tags.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTagToState = (newTag) => {
    setTags([...tags, newTag]);
  };

  const updateTagInState = (updatedTag) => {
    const updatedTags = tags.map((tag) => {
      if (tag._id === updatedTag._id) {
        return updatedTag;
      }
      return tag;
    });
    setTags(updatedTags);
  };

  const deleteTagFromState = (tagId) => {
    const updatedTags = tags.filter((tag) => tag._id !== tagId);
    setTags(updatedTags);
  };

  const adminTagInfo = {
    loading,
    fetchTags,
    tags,
    addTagToState,
    updateTagInState,
    deleteTagFromState,
  };
  return (
    <AdminTagContext.Provider value={adminTagInfo}>
      {children}
    </AdminTagContext.Provider>
  );
};

export default AdminTagProvider;
