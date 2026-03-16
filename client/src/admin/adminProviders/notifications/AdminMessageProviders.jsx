import { useCallback, useEffect, useState } from "react";

import { getMyContacts } from "../../adminServices/contactService";
import AdminMessageContext from "./adminMessageContext";

const AdminMessageProviders = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const [messageResponse] = await Promise.all([getMyContacts()]);
      setMessages(messageResponse.contacts);
    } catch (error) {
      console.error("Error fetching categories:", +error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const adminMessageInfo = {
    messages,
    setMessages,
    loading,
  };

  return (
    <AdminMessageContext.Provider value={adminMessageInfo}>
      {children}
    </AdminMessageContext.Provider>
  );
};

export default AdminMessageProviders;
