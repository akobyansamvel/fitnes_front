import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Regist'>;
};

const RegistPage = ({ navigation }: Props) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Чтобы мы могли предложить вам наилучшие тренировки, расскажите немного о себе.
      </Text>

      <Image style={styles.image} source={require('../assets/human.png')} resizeMode="contain" />

      <Text style={styles.additionalText}>Выберите пол</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, selectedGender === 'female' && styles.selectedButton]} 
          onPress={() => {
            setSelectedGender('female');
            navigation.navigate('GoalsScreen');
          }}
        >
          <Text style={styles.buttonText}>Женский</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, selectedGender === 'male' && styles.selectedButton]} 
          onPress={() => {
            setSelectedGender('male');
            navigation.navigate('GoalsScreen');
          }}
        >
          <Text style={styles.buttonText}>Мужской</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, selectedGender === 'nonbinary' && styles.selectedButton]} 
          onPress={() => {
            setSelectedGender('nonbinary');
            navigation.navigate('GoalsScreen');
          }}
        >
          <Text style={styles.buttonText}>Небинарный</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ECE9E4', },
  text: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  additionalText: { fontSize: 16, marginVertical: 20, textAlign: 'center', color: '#555' },
  image: { width: '100%', height: 200, marginBottom: 10, borderRadius: 8, },
  buttonsContainer: { marginTop: 20 },
  button: { backgroundColor: '#F7F7F7', padding: 15, borderRadius: 8, marginBottom: 10, },
  selectedButton: { backgroundColor: '#87D0B2' },
  buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: 'left' },
});

export default RegistPage;
