import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [listProductCart, setListProductCart] = useState([]);
  return (
    <AuthContext.Provider value={{ listProductCart, setListProductCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
