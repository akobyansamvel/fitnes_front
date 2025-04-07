import { NavigatorScreenParams } from '@react-navigation/native';
import { Lesson } from './types';

export type MainTabParamList = {
  Home: undefined;
  CategoryScreen: {
    categoryId: string;
    categoryTitle: string;
    lessons: Lesson[];
  };
  LessonScreen: {
    lesson: Lesson;
    fromHistory?: boolean;
    returnScreen?: string;
  };
  Profile: undefined;
  CreateWorkout: undefined;
  NewsDetail: {
    newsId: number;
  };
  NewsScreen: undefined;
  LastLesson: undefined;
};

export type RootStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  LastLesson: undefined;
  Achievements: {
    date: string;
  };
  CreateWorkout: undefined;
  WorkoutDetails: {
    workoutId: string;
  };
}; 