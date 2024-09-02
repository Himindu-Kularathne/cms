// import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState, useEffect, createContext} from 'react';

export const UserContext = createContext() ;

// const himindu = {
//    name : 'Himindu Kularathne',
//    email : 'himindukualrathne@gmail.com',
//    phone : '077-1234567'
// }

export const UserProvider = ({children}) => {
   const [user, setUser] = useState(null);
    
      
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};