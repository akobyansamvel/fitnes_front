import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Achievements: { date: string };
  WorkoutDetails: { workoutId: number };
};

type AchievementsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Achievements'>;
type AchievementsScreenRouteProp = RouteProp<RootStackParamList, 'Achievements'>;

type Props = {
  navigation: AchievementsScreenNavigationProp;
  route: AchievementsScreenRouteProp;
};

type WorkoutType = {
  id: number;
  title: string;
  duration: string;
  calories: number;
  image: string;
  isSpecial?: boolean;
};

const workouts: { [key: string]: WorkoutType[] } = {
  '2025-04-08': [
    {
      id: 1,
      title: 'Йога для начинающих',
      duration: '30 мин',
      calories: 150,
      image: 'https://via.placeholder.com/100',
    },
  ],
  '2025-04-10': [
    {
      id: 2,
      title: 'Утренняя растяжка',
      duration: '20 мин',
      calories: 100,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      title: 'Медитация',
      duration: '15 мин',
      calories: 50,
      image: 'https://via.placeholder.com/100',
      isSpecial: true,
    },
    {
      id: 4,
      title: 'Вечерняя йога',
      duration: '25 мин',
      calories: 120,
      image: 'https://via.placeholder.com/100',
      isSpecial: true,
    },
  ],
};

const AchievementsScreen = ({ route, navigation }: Props) => {
  const { date } = route.params;
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const dayWorkouts = workouts[date] || [];
  const totalDuration = dayWorkouts.reduce((acc, workout) => {
    const minutes = parseInt(workout.duration);
    return acc + minutes;
  }, 0);
  const totalCalories = dayWorkouts.reduce((acc, workout) => acc + workout.calories, 0);

  const renderWorkoutCard = (workout: WorkoutType) => (
    <TouchableOpacity 
      key={workout.id}
      style={styles.workoutCard}
      onPress={() => navigation.navigate('WorkoutDetails', { workoutId: workout.id })}
    >
      <Image source={{ uri: workout.image }} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutTitle}>{workout.title}</Text>
          {workout.isSpecial && (
            <Feather name="star" size={16} color="#FFD700" />
          )}
        </View>
        <View style={styles.workoutStats}>
          <Text style={styles.workoutStat}>{workout.duration}</Text>
          <Text style={styles.workoutStat}>{workout.calories} ккал</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#2d4150" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Мои достижения</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.date}>{formattedDate}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{dayWorkouts.length}</Text>
            <Text style={styles.statLabel}>Тренировок</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalDuration}</Text>
            <Text style={styles.statLabel}>Минут</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalCalories}</Text>
            <Text style={styles.statLabel}>Калорий</Text>
          </View>
        </View>

        <View style={styles.workoutsContainer}>
          <Text style={styles.sectionTitle}>Тренировки</Text>
          {dayWorkouts.map(renderWorkoutCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d4150',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  workoutsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 16,
  },
  workoutCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  workoutInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d4150',
  },
  workoutStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  workoutStat: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 12,
  },
});

export default AchievementsScreen; 