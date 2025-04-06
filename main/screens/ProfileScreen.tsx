import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import CircularProgress from 'react-native-circular-progress-indicator';

type NavigationProp = {
  navigate: (screen: string) => void;
};

interface ProfileScreenProps {
  navigation: NavigationProp;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [stats] = useState({
    workouts: { all: 150, week: 5, month: 20, year: 150 },
    calories: { all: 12500, week: 2500, month: 8000, year: 12500 },
    minutes: { all: 1800, week: 300, month: 900, year: 1800 }
  });

  const chartData = {
    labels: ['Янв', 'Фев', 'Мар'],
    datasets: [
      {
        data: [55, 52, 48]
      }
    ]
  };

  const renderTabButton = (title: string, key: 'all' | 'week' | 'month' | 'year') => (
    <TouchableOpacity 
      style={[styles.tabButton, activeTab === key && styles.activeTabButton]}
      onPress={() => setActiveTab(key)}
    >
      <Text style={[styles.tabText, activeTab === key && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Профиль и иконки */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.iconsContainer}>
          <Feather name="clock" size={24} color="#2d4150" />
          <TouchableOpacity onPress={() => navigation.navigate('CreateWorkout')}>
            <Feather name="user" size={24} color="#2d4150" />
          </TouchableOpacity>
          <Feather name="star" size={24} color="#2d4150" />
          <Feather name="settings" size={24} color="#2d4150" />
        </View>
      </View>

      {/* Круговые диаграммы */}
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <CircularProgress
            value={stats.workouts[activeTab]}
            radius={40}
            duration={2000}
            progressValueColor={'#2d4150'}
            maxValue={200}
            title={'Тренировки'}
            titleColor={'#7f8c8d'}
            titleStyle={{ fontSize: 14 }}
          />
        </View>
        <View style={styles.progressItem}>
          <CircularProgress
            value={stats.calories[activeTab]}
            radius={40}
            duration={2000}
            progressValueColor={'#2d4150'}
            maxValue={15000}
            title={'Калории'}
            titleColor={'#7f8c8d'}
            titleStyle={{ fontSize: 14 }}
          />
        </View>
        <View style={styles.progressItem}>
          <CircularProgress
            value={stats.minutes[activeTab]}
            radius={40}
            duration={2000}
            progressValueColor={'#2d4150'}
            maxValue={2000}
            title={'Минуты'}
            titleColor={'#7f8c8d'}
            titleStyle={{ fontSize: 14 }}
          />
        </View>
      </View>

      {/* Табы периодов */}
      <View style={styles.tabContainer}>
        {renderTabButton('Все', 'all')}
        {renderTabButton('Неделя', 'week')}
        {renderTabButton('Месяц', 'month')}
        {renderTabButton('Год', 'year')}
      </View>

      {/* Календарь */}
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
        }}
      />

      {/* Информация о весе */}
      <View style={styles.weightContainer}>
        <View style={styles.weightItem}>
          <Text style={styles.weightLabel}>Начало</Text>
          <Text style={styles.weightValue}>75 кг</Text>
        </View>
        <View style={styles.weightItem}>
          <Text style={styles.weightLabel}>Сейчас</Text>
          <Text style={styles.weightValue}>70 кг</Text>
        </View>
        <View style={styles.weightItem}>
          <Text style={styles.weightLabel}>Разница</Text>
          <Text style={[styles.weightValue, { color: '#27ae60' }]}>-5 кг</Text>
        </View>
      </View>

      {/* График */}
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 173, 245, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  progressItem: {
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTabButton: {
    backgroundColor: '#00adf5',
  },
  tabText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  activeTabText: {
    color: '#ffffff',
  },
  calendar: {
    marginVertical: 16,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  weightItem: {
    alignItems: 'center',
  },
  weightLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  weightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  chartContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ProfileScreen;