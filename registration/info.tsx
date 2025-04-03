import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Info'>;

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  style?: any;
}

const CustomSlider = ({ value, onValueChange, min, max, style }: CustomSliderProps) => {
  const width = Dimensions.get('window').width * 0.8;
  const position = ((value - min) / (max - min)) * width;

  return (
    <View style={[styles.sliderContainer, style]}>
      <View style={styles.sliderTrack}>
        <View style={[styles.sliderProgress, { width: position }]} />
      </View>
      <TouchableOpacity
        style={[styles.sliderThumb, { left: position - 10 }]}
        onPressIn={() => {}}
      />
    </View>
  );
};

const InfoScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const navigation = useNavigation<InfoScreenNavigationProp>();

  const handleContinue = () => {
    navigation.navigate('NextScreen');
  };

  // Весы для визуализации веса
  const renderWeightScale = () => {
    const scaleWidth = Dimensions.get('window').width * 0.8;
    const pointerPosition = (weight / 150) * scaleWidth;
    
    return (
      <View style={styles.scaleContainer}>
        <Svg height="60" width={scaleWidth + 40}>
          <Line
            x1="20" y1="30"
            x2={scaleWidth + 20} y2="30"
            stroke="#4CAF50"
            strokeWidth="3"
          />
          <Rect
            x={pointerPosition}
            y="10"
            width="4"
            height="40"
            fill="#FF5722"
          />
          <Circle
            cx={pointerPosition + 2}
            cy="10"
            r="8"
            fill="#FF5722"
          />
        </Svg>
        <Text style={styles.scaleValue}>{weight} кг</Text>
      </View>
    );
  };

  // Индикатор роста в виде человека
  const renderHeightIndicator = () => {
    const personHeight = (height / 220) * 150;
    
    return (
      <View style={styles.heightContainer}>
        <Svg height="160" width="100">
          {/* Голова */}
          <Circle cx="50" cy={160 - personHeight + 15} r="15" fill="#FFD700" />
          {/* Тело */}
          <Line
            x1="50" y1={160 - personHeight + 30}
            x2="50" y2={160 - personHeight + 80}
            stroke="#FFD700"
            strokeWidth="4"
          />
          {/* Руки */}
          <Line
            x1="20" y1={160 - personHeight + 50}
            x2="80" y2={160 - personHeight + 50}
            stroke="#FFD700"
            strokeWidth="4"
          />
          {/* Ноги */}
          <Line
            x1="50" y1={160 - personHeight + 80}
            x2="30" y2={160}
            stroke="#FFD700"
            strokeWidth="4"
          />
          <Line
            x1="50" y1={160 - personHeight + 80}
            x2="70" y2={160}
            stroke="#FFD700"
            strokeWidth="4"
          />
        </Svg>
        <Text style={styles.scaleValue}>{height} см</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Информация</Text>
      
      {/* Прогресс-бар (3/3) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.completedProgressBar]} />
        <View style={[styles.progressBar, styles.completedProgressBar]} />
        <View style={[styles.progressBar, styles.completedProgressBar]} />
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
        
        {/* Рост с индикатором */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Рост</Text>
          {renderHeightIndicator()}
          <CustomSlider
            value={height}
            onValueChange={setHeight}
            min={120}
            max={220}
            style={styles.slider}
          />
        </View>
        
        {/* Вес с весами */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Вес</Text>
          {renderWeightScale()}
          <CustomSlider
            value={weight}
            onValueChange={setWeight}
            min={30}
            max={150}
            style={styles.slider}
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
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
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    width: 60,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  completedProgressBar: {
    backgroundColor: '#4CAF50',
  },
  inactiveProgressBar: {
    backgroundColor: '#E0E0E0',
  },
  formContainer: {
    marginBottom: 20,
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
  slider: {
    width: '100%',
    height: 40,
  },
  sliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  sliderProgress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF5722',
    position: 'absolute',
    top: -8,
  },
  scaleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  heightContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  scaleValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoScreen;