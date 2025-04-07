import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ResizeMode, Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MainTabParamList } from '../navigationTypes';
import ExitLessonModal from '../components/ExitLessonModal';
import { saveLessonToHistory } from '../storage/lessonHistory';

type LessonScreenRouteProp = RouteProp<MainTabParamList, 'LessonScreen'>;
type LessonScreenNavigationProp = StackNavigationProp<MainTabParamList, 'LessonScreen'>;

const LessonScreen = () => {
  const route = useRoute<LessonScreenRouteProp>();
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const { lesson } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [showExitModal, setShowExitModal] = useState(false);
  const videoRef = useRef<Video>(null);

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Проверяем, что мы находимся на экране урока и не пришли из истории
      if (navigation.isFocused() && !route.params?.fromHistory) {
        setShowExitModal(true);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation, route.params?.fromHistory]);

  useEffect(() => {
    // Формируем URL для streaming endpoint
    const videoFileName = lesson.video_file.split('/').pop();
    if (!videoFileName) {
      setError('Неверный формат видеофайла');
      return;
    }
    const streamUrl = `http://10.179.120.139:8000/api/lessons/stream/${encodeURIComponent(videoFileName)}`;
    setVideoUrl(streamUrl);
    
    // Проверяем доступность видео
    const checkVideo = async () => {
      try {
        console.log('Checking video availability...');
        const response = await fetch(streamUrl);
        console.log('Video check response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error checking video:', error);
        setError('Не удалось загрузить видео. Пожалуйста, проверьте подключение к интернету.');
      }
    };
    checkVideo();
  }, [lesson.video_file]);

  // Пауза видео при потере фокуса
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (videoRef.current) {
          videoRef.current.pauseAsync();
        }
      };
    }, [])
  );

  const handleVideoError = (error: string) => {
    console.error('Ошибка воспроизведения видео:', error);
    console.error('Попытка воспроизвести видео по URL:', videoUrl);
    setError('Не удалось загрузить видео. Пожалуйста, проверьте подключение к интернету.');
    setIsLoading(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 
      ? `${hours} ч ${mins} мин`
      : `${mins} мин`;
  };

  const handleExit = async (saveLesson: boolean) => {
    console.log('Exit handler called, saveLesson:', saveLesson);
    if (saveLesson) {
      try {
        console.log('Attempting to save lesson:', lesson);
        await saveLessonToHistory(lesson);
        console.log('Lesson saved successfully');
      } catch (error) {
        console.error('Error saving lesson to history:', error);
      }
    }
    setShowExitModal(false);
    
    // Если пришли из истории, возвращаемся в историю
    if (route.params?.fromHistory) {
      navigation.navigate('LastLesson');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            if (route.params?.fromHistory) {
              navigation.navigate('LastLesson');
            } else {
              setShowExitModal(true);
            }
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2d4150" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.videoContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={24} color="#666" />
              <Text style={styles.loadingText}>Загрузка видео...</Text>
            </View>
          )}
          
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              onLoadStart={() => setIsLoading(true)}
              onLoad={() => setIsLoading(false)}
              onError={(error) => {
                console.error('Video error details:', error);
                handleVideoError('Ошибка загрузки видео');
              }}
            />
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.statText}>
                {formatDuration(lesson.duration_minutes)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={20} color="#666" />
              <Text style={styles.statText}>
                {lesson.calories} ккал
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{lesson.description}</Text>
        </View>
      </ScrollView>

      <ExitLessonModal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        onExit={handleExit}
      />
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    color: '#2d4150',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    height: Dimensions.get('window').width * (9/16),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: '#ff6b6b',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    color: '#666',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  backButton: {
    padding: 8,
  },
});

export default LessonScreen; 