import CheckBox from '@react-native-community/checkbox';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  BodyAreas: undefined;
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const GoalsScreen = ({ navigation }: Props) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    "Похудение",
    "Набор мышечной массы",
    "Поддержание формы",
    "Улучшение выносливости",
    "Реабилитация после травм"
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(item => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.activeProgressBar]} />
        <View style={styles.progressBar} />
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.title}>Какие у вас цели?</Text>
      <Text style={styles.subtitle}>Выберите одну или несколько целей</Text>

      <View style={styles.checkboxContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.checkboxWrapper}>
            <CheckBox
              value={selectedGoals.includes(goal)}
              onValueChange={() => toggleGoal(goal)}
              tintColors={{ true: '#007AFF', false: '#767577' }}
            />
            <Text style={styles.checkboxLabel}>{goal}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.button, selectedGoals.length === 0 && styles.disabledButton]}
        onPress={() => navigation.navigate('BodyAreas')}
        disabled={selectedGoals.length === 0}
      >
        <Text style={styles.buttonText}>Продолжить</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  activeProgressBar: {
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  checkboxContainer: {
    marginBottom: 30,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  disabledButton: {
    backgroundColor: '#B3E0FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
console.log("GoalsScreen загружен");
export default GoalsScreen;