import CheckBox from '@react-native-community/checkbox';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  NextScreen: undefined;
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const BodyAreasScreen = ({ navigation }: Props) => {
  const [primaryArea, setPrimaryArea] = useState<string | null>(null);
  const [secondaryAreas, setSecondaryAreas] = useState<string[]>([]);

  const bodyAreas = [
    "Руки",
    "Ноги",
    "Спина",
    "Грудь",
    "Плечи",
    "Пресс",
    "Ягодицы"
  ];

  const togglePrimaryArea = (area: string) => {
    if (primaryArea === area) {
      setPrimaryArea(null);
    } else {
      setPrimaryArea(area);
      setSecondaryAreas([]);
    }
  };

  const toggleSecondaryArea = (area: string) => {
    if (primaryArea) return;
    
    if (secondaryAreas.includes(area)) {
      setSecondaryAreas(secondaryAreas.filter(item => item !== area));
    } else {
      setSecondaryAreas([...secondaryAreas, area]);
    }
  };

  const isAreaSelected = (area: string) => {
    return primaryArea === area || secondaryAreas.includes(area);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.completedProgressBar]} />
        <View style={[styles.progressBar, styles.activeProgressBar]} />
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.title}>Какие области тела хотите проработать?</Text>
      <Text style={styles.subtitle}>
        {primaryArea 
          ? "Вы выбрали основную зону. Можно выбрать только одну основную зону."
          : "Выберите основную зону или несколько второстепенных"}
      </Text>

      <View style={styles.contentContainer}>
        {/* <Image
          source={require('../assets/body-image.png')}
          style={styles.bodyImage}
          resizeMode="contain"
        /> */}

        <View style={styles.checkboxColumn}>
          {bodyAreas.map((area, index) => (
            <View key={index} style={styles.checkboxWrapper}>
              <CheckBox
                value={isAreaSelected(area)}
                onValueChange={() => 
                  primaryArea 
                    ? togglePrimaryArea(area) 
                    : toggleSecondaryArea(area)
                }
                tintColors={{ true: '#007AFF', false: '#767577' }}
              />
              <Text style={styles.checkboxLabel}>{area}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.button, 
          (!primaryArea && secondaryAreas.length === 0) && styles.disabledButton
        ]}
        onPress={() => navigation.navigate('NextScreen')}
        disabled={!primaryArea && secondaryAreas.length === 0}
      >
        <Text style={styles.buttonText}>Продолжить</Text>
      </TouchableOpacity>
    </View>
  );
};

// Стили остаются такими же как в предыдущем примере

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
  completedProgressBar: {
    backgroundColor: '#4CAF50',
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
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
  },
  bodyImage: {
    width: '50%',
    height: 300,
  },
  checkboxColumn: {
    width: '50%',
    paddingLeft: 15,
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

export default BodyAreasScreen;