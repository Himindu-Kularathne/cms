import { useState, useContext } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import LoginPage from './Pages/Login';
// import MenuPage from './Pages/Menu';
import Navbar from './Compoenets/NavBar';
import Contacts from './Pages/Contacts';
import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './Pages/Home';
import { MenuButtonContext } from './context/MenuButtonContext';

import Settings from './Compoenets/Settings';
import AddContactForm from './Compoenets/AddNewContacts';
function App() {
  // const [count, setCount] = useState(0)
  const {selectedKey} = useContext(MenuButtonContext);
  console.log(selectedKey);


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
        element: <LoginPage />
      },
      {
        path: '/home',
        element: getSelectedElement(selectedKey)

      }
    ]
  )

  return (
    <RouterProvider router={routers} />
      
  )
}

export default App
