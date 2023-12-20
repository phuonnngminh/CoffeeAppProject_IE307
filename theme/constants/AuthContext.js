import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    //Minh's code
    const [products, setProducts] = useState([]); 

    //

    const [favouriteItems, setFavouriteItems] = useState([]);


  return (
    <AuthContext.Provider value={{ products, setProducts, favouriteItems, setFavouriteItems }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };