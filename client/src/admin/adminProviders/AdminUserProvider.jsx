import { useCallback, useEffect, useState } from "react";

import AdminUserContext from "../adminContexts/AdminUserContext";
import { getAllUsers } from "../adminServices/userService";

const AdminUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error in fetching users.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUsersToState = (newUser) => {
    setUsers([...users, newUser]);
  };

  const updateUsersInState = (updatedUser) => {
    const updatedUsers = users.map((user) => {
      if (user._id === updatedUser._id) {
        return updatedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const deleteUserFromState = (userId) => {
    const updatedUser = users.filter((user) => user._id !== userId);
    setUsers(updatedUser);
  };

  const adminUserInfo = {
    loading,
    users,
    fetchUsers,
    addUsersToState,
    updateUsersInState,
    deleteUserFromState,
  };

  return (
    <AdminUserContext.Provider value={adminUserInfo}>
      {children}
    </AdminUserContext.Provider>
  );
};

export default AdminUserProvider;
