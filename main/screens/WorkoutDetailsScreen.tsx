import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type Exercise = {
  name: string;
  duration: number;
  videoUrl?: string;
};

type Workout = {
  id: string;
  title: string;
  image: any;
  duration: string;
  calories: number;
  exercises: Exercise[];
};

type RootStackParamList = {
  WorkoutDetails: { workout: Workout };
};

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetails'>;

const WorkoutDetailsScreen = ({ route, navigation }: Props) => {
  const { workout } = route.params;
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleExercisePress = (index: number) => {
    if (activeExerciseIndex === index) {
      setActiveExerciseIndex(null);
      setIsPlaying(false);
    } else {
      setActiveExerciseIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={workout.image}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{workout.title}</Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Feather name="clock" size={20} color="#fff" />
              <Text style={styles.statText}>{workout.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="zap" size={20} color="#fff" />
              <Text style={styles.statText}>{workout.calories} ккал</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Упражнения</Text>
        {workout.exercises.map((exercise: Exercise, index: number) => (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.exerciseItem,
                activeExerciseIndex === index && styles.activeExerciseItem
              ]}
              onPress={() => handleExercisePress(index)}
            >
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseTime}>
                  {formatTime(exercise.duration)}
                </Text>
              </View>
              <Feather 
                name={activeExerciseIndex === index ? "pause-circle" : "play-circle"} 
                size={24} 
                color="#00adf5" 
              />
            </TouchableOpacity>
            
            {activeExerciseIndex === index && exercise.videoUrl && (
              <View style={styles.videoContainer}>
                <Video
                  ref={videoRef}
                  source={{ uri: exercise.videoUrl }}
                  style={styles.video}
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  shouldPlay={isPlaying}
                  useNativeControls
                />
                <TouchableOpacity
                  style={styles.playPauseButton}
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  <Feather
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 300,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
  },
  activeExerciseItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#00adf5',
    borderWidth: 1,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d4150',
    marginBottom: 4,
  },
  exerciseTime: {
    fontSize: 14,
    color: '#666',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutDetailsScreen; 