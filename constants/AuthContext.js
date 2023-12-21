import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [listProductCart, setListProductCart] = useState([]);

  const [favouriteItems, setFavouriteItems] = useState([]);

  return (
    <AuthContext.Provider value={{ listProductCart, setListProductCart, favouriteItems, setFavouriteItems }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
