import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistPage from './registration/reg';
import GoalsScreen from './registration/goal';
import BodyAreasScreen from './registration/body';
import MotivationScreen from './registration/motivation';
import { RootStackParamList } from './registration/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Regist"
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false // Отключаем свайп-назад
        }}
      >
        <Stack.Screen name="Regist" component={RegistPage} />
        <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
        <Stack.Screen name="BodyAreas" component={BodyAreasScreen} />
        <Stack.Screen name="Motivation" component={MotivationScreen} />
        {/* цель,skill,flexibility,endurance,breath,restrictions,info*/}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;