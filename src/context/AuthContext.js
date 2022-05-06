import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState()
    const [isLoading, setIsLoading] = useState()

    const login = (email, password) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/login`, {
                email,
                password,
            })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo);
                setUserInfo(userInfo)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                console.log('TOKEN' + ' ' + userInfo.token);
                setIsLoading(false)
            })
            .catch(e => {
                console.log(`logien error ${e}`);
                setIsLoading(false)
            })
    }

    // const logout = () => {
    //     setIsLoading(true);
    
    //     axios
    //       .get(`${BASE_URL}/logout`, {},
    //         {
    //           headers: {Authorization: `Bearer ${userInfo.token}`},
    //         },
    //       )
    //       .then(res => {
    //         console.log(res.data);
    //         AsyncStorage.removeItem('userInfo');
    //         setUserInfo({});
    //         setIsLoading(false);
    //       })
    //       .catch(e => {
    //         console.log(`logout error ${e}`);
    //         setIsLoading(false);
    //       });
    //   };

    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                login,
            }}>
            {children}
        </AuthContext.Provider>
    )
}