import React, {useState , createContext} from "react";

export const MenuButtonContext = createContext();


export const MenuButtonProvider = ({children}) => {
   const [selectedKey, setSelectedKey] = useState("1"); 
   const [collapsed, setCollapsed] = useState(false);
   const toggleCollapsed = () => {
     setCollapsed(!collapsed);
   };
   return (
     <MenuButtonContext.Provider value={{collapsed, toggleCollapsed, selectedKey, setSelectedKey}}>
       {children}
     </MenuButtonContext.Provider>
);
}