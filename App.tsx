import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistPage from './registration/reg';
import GoalsScreen from './registration/goal';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Regist" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Regist" component={RegistPage} />
        <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
