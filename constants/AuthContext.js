import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('localstorage.db');

const AuthProvider = ({ children }) => {
  const [listProductCart, setListProductCart] = useState([]);

  const [favouriteItems, setFavouriteItems] = useState([]);
  const [userData, setUserData] = useState();

  const getData = () => {
    try {
        db.transaction(async (tx) => {
            tx.executeSql(
                'SELECT * FROM userlocal', 
                [],
                (txObj, result) => {
                    var len = result.rows.length;
                    if(len > 0) {
                        console.log("row in db: ",result.rows.item(0));
                        console.log('sql lenght: ',len);  
                        const parsedUserData = JSON.parse(result.rows.item(0).user_json_data);
                        console.log('user data: ',parsedUserData);
                        setUserData(parsedUserData);
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
        tx.executeSql('CREATE TABLE IF NOT EXISTS userlocal (id INTEGER PRIMARY KEY, user_json_data TEXT)')
        console.log('passed check table exists');
    });
    getData();
  }, []);

  useEffect(()=>{
    if (userData) {
      const serializedUserData = JSON.stringify(userData);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT OR REPLACE INTO userlocal (id,user_json_data) VALUES (?,?);',
          [1, serializedUserData],
          (txObj, result) => {
            console.log('User data updated in the database.');
          },
          (txObj, error) => console.log('Failed to update user data in the database')
        );
      });
    }
  },[userData]);


  return (
    <AuthContext.Provider value={{ listProductCart, setListProductCart, favouriteItems, setFavouriteItems, userData, setUserData,}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
