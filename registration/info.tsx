import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { useNavigation } from '@react-navigation/native';

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Info'>;

const InfoScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const navigation = useNavigation<InfoScreenNavigationProp>();

  const handleContinue = () => {
    if (name && age && height && weight) {
      navigation.navigate('GoalsScreen');
    }
  };

  return (
    <View style={styles.container}>      
      {/* Прогресс-бар (1/3) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.completedProgressBar]} />
        <View style={[styles.progressBar, styles.completedProgressBar]} />
        <View style={[styles.progressBar, styles.activeProgressBar]} />
      </View>
      
      <View style={styles.formContainer}>
        {/* Имя */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Имя</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Введите ваше имя"
          />
        </View>
        
        {/* Возраст */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Возраст</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Введите ваш возраст"
          />
        </View>
        
        {/* Рост */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Рост (см)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Введите ваш рост"
          />
        </View>
        
        {/* Вес */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Вес (кг)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Введите ваш вес"
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.continueButton,
          (!name || !age || !height || !weight) && styles.disabledContinueButton
        ]}
        onPress={handleContinue}
        disabled={!name || !age || !height || !weight}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
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
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  continueButton: {
    backgroundColor: '#4D4D4D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
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

export default InfoScreen;