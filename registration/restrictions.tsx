import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

type RestrictionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Restrictions'>;

const RestrictionsScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const navigation = useNavigation<RestrictionsScreenNavigationProp>();

  const options = [
    { id: 1, text: "Травмы коленей" },
    { id: 2, text: "Проблемы с позвоночником" },
    { id: 3, text: "Травмы плеч" },
    { id: 4, text: "Травмы запястий" },
    { id: 5, text: "Гипертония" },
    { id: 6, text: "Нет ограничений" }
  ];

  const handleOptionToggle = (id: number) => {
    if (id === 6) {
      // Если выбрано "Нет ограничений", снимаем все остальные выборы
      setSelectedOptions([6]);
    } else {
      // Если выбрано что-то другое, убираем "Нет ограничений" из выбора
      setSelectedOptions(prev => {
        const filtered = prev.filter(option => option !== 6);
        return prev.includes(id) 
          ? filtered.filter(option => option !== id) 
          : [...filtered, id];
      });
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      navigation.navigate('Info');
    }
  };

  return (
    <View style={styles.container}>      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.completedProgressBar]} />
        <View style={[styles.progressBar, styles.activeProgressBar]} />
        <View style={[styles.progressBar, styles.completedProgressBar]} />
      </View>
      
      <Text style={styles.questionText}>У вас есть физические 
      ограничения?</Text>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOptions.includes(option.id) && styles.selectedOptionButton
            ]}
            onPress={() => handleOptionToggle(option.id)}
            activeOpacity={0.7}
          >
            <Checkbox
              value={selectedOptions.includes(option.id)}
              onValueChange={() => handleOptionToggle(option.id)}
              color={selectedOptions.includes(option.id) ? '#4CAF50' : undefined}
            />
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedOptions.length === 0 && styles.disabledContinueButton
        ]}
        onPress={handleContinue}
        disabled={selectedOptions.length === 0}
      >
        <Text style={styles.continueButtonText}>Продолжить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ECE9E4',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  activeProgressBar: {
    backgroundColor: '#4CAF50',
  },
  completedProgressBar: {
    backgroundColor: '#ACACAC', 
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedOptionButton: {
    backgroundColor: '#87D0B2',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: '#4D4D4D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledContinueButton: {
    backgroundColor: '#4D4D4D',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestrictionsScreen;
