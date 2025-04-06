import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTabNavigator from './main/navigation/MainTabNavigator';
import AchievementsScreen from './main/screens/AchievementsScreen';
import CreateWorkoutScreen from './main/screens/CreateWorkoutScreen';
import EditProfileScreen from './main/screens/EditProfileScreen';
import ProfileScreen from './main/screens/ProfileScreen';
import SettingsScreen from './main/screens/SettingsScreen';
import WorkoutDetailsScreen from './main/screens/WorkoutDetailsScreen';
import BodyAreasScreen from './registration/body.tsx';
import BreathScreen from './registration/breath.tsx';
import EnduranceScreen from './registration/endurance.tsx';
import FlexibilityScreen from './registration/flexibility.tsx';
import GoalsScreen from './registration/goal.tsx';
import HelloScreen from './registration/hello.tsx';
import InfoScreen from './registration/info.tsx';
import LoadingScreen from './registration/loading.tsx';
import MotivationScreen from './registration/motivation.tsx';
import NotificationPage from './registration/noitfication.tsx';
import GoalFormationScreen from './registration/program.tsx';
import RegistPage from './registration/reg.tsx';
import RestrictionsScreen from './registration/restrictions.tsx';
import SkillScreen from './registration/skill.tsx';
import TimeScreen from './registration/time.tsx';

// Игнорируем предупреждения о react-native-video
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

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
              gestureEnabled: false, // Отключаем свайп-назад
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Hello" component={HelloScreen} />
            <Stack.Screen name="MainTab" component={MainTabNavigator} />
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
            <Stack.Screen 
              name="WorkoutDetails" 
              component={WorkoutDetailsScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{
                headerShown: false,
                presentation: 'modal'
              }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{
                headerShown: false,
                presentation: 'modal'
              }}
            />
            <Stack.Screen 
              name="Achievements" 
              component={AchievementsScreen}
              options={{
                animation: 'slide_from_right'
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;