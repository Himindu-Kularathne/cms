import { useContext, useEffect, useState } from 'react';
import './App.css';
import LoginPage from './Pages/Login';
import Home from './pages/Home';
import AddContactForm from './Components/AddNewContacts';
import { MenuButtonContext } from './context/MenuButtonContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { message } from 'antd';
import Contacts from './Pages/Contacts';
import ContactGroups from './Pages/Goups';

function App() {
  const { selectedKey } = useContext(MenuButtonContext);
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      console.log('User fetched:', user);
      messageApi.open({
        type: 'success',
        content: 'User is successfully logged in',
      });
    } else {
      setLoggedIn(false);
    }
    console.log({ "user": user });
  }, [user, messageApi]);  // Added messageApi to dependencies to prevent stale closures

  const getSelectedElement = (selectedKey) => {
    switch (selectedKey) {
      case '1':
        return <Home />;
      case '2':
        return <Contacts />;
      case '3':
        return <AddContactForm />;
      case '4':
        return <ContactGroups />;
      default:
        return <Home />;
    }
  };

  const routers = createBrowserRouter([
    {
      path: '/',
      element: loggedIn ? getSelectedElement(selectedKey) : <LoginPage />,
    },
  ]);

  return (
    <RouterProvider router={routers}>
      <div className="App">
        {contextHolder}
      </div>
    </RouterProvider>
  );
}

export default App;
