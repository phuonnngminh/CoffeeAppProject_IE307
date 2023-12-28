import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [listProductCart, setListProductCart] = useState([]);

  const [favouriteItems, setFavouriteItems] = useState([]);
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();


  return (
    <AuthContext.Provider value={{ listProductCart, setListProductCart, favouriteItems, setFavouriteItems, userData, setUserData, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
