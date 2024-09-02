import {  useContext, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import LoginPage from './Pages/Login';
import Home from './pages/Home';
import AddContactForm from './Compoenets/AddNewContacts'
import { MenuButtonContext } from './context/MenuButtonContext';
import Settings from './Compoenets/Settings';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  {UserContext}  from './context/UserContext';

function App() {
  // const [count, setCount] = useState(0)
  const {selectedKey} = useContext(MenuButtonContext);
  console.log(selectedKey);
  const {user} = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);


  //login
  useEffect(() => {
    if(user){
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    console.log({"user" : user});
  }, [user])


  //change the element for home based on the selected key 

  const getSelectedElement = (selectedKey) => {
    
    switch(selectedKey){
      case '1':
        return <Home />
      case '2':
        return <Contacts />
      case '3':
        return <AddContactForm />
      case '4':
        return <Settings />
      default:
        return <Home />
    }
  
  }
  const routers = createBrowserRouter(
    [
      {
        path: '/',
        element: loggedIn? getSelectedElement(selectedKey) : <LoginPage />
      },
     
    ]
  )

  return (
    <RouterProvider router={routers} />
   
    
  );
}
      
  

import Contacts from './Pages/Contacts';

export default App
