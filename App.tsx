import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTabNavigator from './main/navigation/MainTabNavigator';
import CreateWorkoutScreen from './main/screens/CreateWorkoutScreen';
import ProfileScreen from './main/screens/ProfileScreen';
import BodyAreasScreen from './registration/body';
import BreathScreen from './registration/breath';
import EnduranceScreen from './registration/endurance';
import FlexibilityScreen from './registration/flexibility';
import GoalsScreen from './registration/goal';
import HelloScreen from './registration/hello';
import InfoScreen from './registration/info';
import LoadingScreen from './registration/loading';
import MotivationScreen from './registration/motivation';
import NotificationPage from './registration/noitfication';
import GoalFormationScreen from './registration/program';
import RegistPage from './registration/reg';
import RestrictionsScreen from './registration/restrictions';
import SkillScreen from './registration/skill';
import TimeScreen from './registration/time';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Hello"
            screenOptions={{ 
              headerShown: false,
              gestureEnabled: false // Отключаем свайп-назад
            }}
          >
            <Stack.Screen name="Hello" component={HelloScreen} />
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="Reg" component={RegistPage} />
            <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
            <Stack.Screen name="BodyAreas" component={BodyAreasScreen} />
            <Stack.Screen name="Motivation" component={MotivationScreen} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Skill" component={SkillScreen} />
            <Stack.Screen name="Flexibility" component={FlexibilityScreen} />
            <Stack.Screen name="Endurance" component={EnduranceScreen} />
            <Stack.Screen name="Breath" component={BreathScreen} />
            <Stack.Screen name="Restrictions" component={RestrictionsScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="Time" component={TimeScreen} />
            <Stack.Screen name="GoalFormation" component={GoalFormationScreen} />
            <Stack.Screen name="Notification" component={NotificationPage} />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Профиль' }}
            />
            <Stack.Screen 
              name="CreateWorkout" 
              component={CreateWorkoutScreen}
              options={{ title: 'Создание тренировки' }}
            />
            {/* цель,skill,flexibility,endurance,breath,restrictions,info*/}

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;