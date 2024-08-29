import { ExclamationCircleFilled } from '@ant-design/icons';
import React, {craeteContext, useState, useEffect} from 'react';

const UserContext = createContext();   

const himindu = {
   name : 'Himindu Kularathne',
   email : 'himindukualrathne@gmail.com',
   phone : '077-1234567'
}

export const UserProvider = ({children}) => {
   const [user, setUser] = useState(null);
    
      useEffect(() => {
            setUser(himindu);
      }, []);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};