import React, { createContext, useState, useEffect } from "react";
import { bankingCard } from '../constants';
const AuthContext = createContext(null);
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('localstorage.db');

const AuthProvider = ({ children }) => {
  const [listProductCart, setListProductCart] = useState([]);

  const [favouriteItems, setFavouriteItems] = useState([]);
  const [userData, setUserData] = useState();
  const [userCard, setUserCard] = useState(bankingCard)

  const getData = () => {
    try {
        db.transaction(async (tx) => {
            tx.executeSql(
                'SELECT * FROM userlocaldata', 
                [],
                (txObj, result) => {
                    var len = result.rows.length;
                    if(len > 0) {
                        console.log("row in db: ",result.rows.item(0));
                        console.log('sql lenght: ',len);  
                        const parsedUserData = JSON.parse(result.rows.item(0).user_json_data);
                        const parsedFavouriteItems = JSON.parse(result.rows.item(0).favouritelist_json_data);
                        const parsedCartList = JSON.parse(result.rows.item(0).cartlist_json_data)
                        console.log('user data: ',parsedUserData);
                        console.log('favourites list: ',parsedFavouriteItems);
                        console.log('cart list: ',parsedCartList);
                        setUserData(parsedUserData);
                        setFavouriteItems(parsedFavouriteItems);
                        setListProductCart(parsedCartList);
                    }
                },
                (txObj, error) => console.log('cannot get data from db')
            )
        })
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=>{
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userlocaldata (id INTEGER PRIMARY KEY, user_json_data TEXT, favouritelist_json_data TEXT, cartlist_json_data TEXT)')
        console.log('passed check table exists');
    });
    getData();
  }, []);

  useEffect(()=>{
    if (userData) {
      const serializedUserData = JSON.stringify(userData);
      const serializedFavouriteList = JSON.stringify(favouriteItems);
      const serializedCartList = JSON.stringify(listProductCart);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT OR REPLACE INTO userlocaldata (id,user_json_data, favouritelist_json_data, cartlist_json_data) VALUES (?,?,?,?);',
          [1, serializedUserData, serializedFavouriteList, serializedCartList],
          (txObj, result) => {
            console.log('User data updated in the database.');
          },
          (txObj, error) => console.log('Failed to update user data in the database')
        );
      });
    }
  },[userData, favouriteItems,listProductCart]);


  return (
    <AuthContext.Provider value={{ listProductCart, setListProductCart, favouriteItems, setFavouriteItems, userData, setUserData,userCard, setUserCard}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
