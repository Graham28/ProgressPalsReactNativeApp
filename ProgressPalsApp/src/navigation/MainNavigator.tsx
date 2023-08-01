import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import PrivatePage from '../screens/PrivatePage';
import { AuthContext } from '../context/AuthContext'; 
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("MainNavigator must be used within an AuthProvider.");
  }

  const { isAuthenticated } = authContext;


  if (isAuthenticated) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="SignUp" component={SignUp} />
        <Tab.Screen name="Profile" component={Profile} /> 
        <Tab.Screen name="PrivatePage" component={PrivatePage} />
        {/* Add more private screens here */}
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
