import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { MainTabParamList } from '../navigationTypes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NewsDetailRouteProp = RouteProp<MainTabParamList, 'NewsDetail'>;

type NewsDetail = {
  id: number;
  title: string;
  preview_image: string;
  tags: Array<{
    id: number;
    name: string;
  }>;
  first_heading: string;
  first_content: string;
  second_heading: string;
  second_content: string;
};

const BASE_URL = 'http://10.179.120.139:8000';

const NewsDetailScreen = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/news/${route.params.newsId}/`)
      .then(response => response.json())
      .then(data => setNewsDetail(data))
      .catch(error => console.error('Error fetching news detail:', error));
  }, [route.params.newsId]);

  if (!newsDetail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const imageUrl = `${BASE_URL}${newsDetail.preview_image}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Image 
          source={imageError ? require('../../assets/default-avatar.png') : { uri: imageUrl }} 
          style={styles.newsImage}
          onError={() => {
            console.error('Error loading news detail image:', imageUrl);
            setImageError(true);
          }}
        />
        <View style={styles.overlay}>
          <View style={styles.tagContainer}>
            {newsDetail.tags.map(tag => (
              <View key={tag.id} style={styles.tag}>
                <Text style={styles.tagText}>#{tag.name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>{newsDetail.title}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>{newsDetail.first_heading}</Text>
        <Text style={styles.contentText}>{newsDetail.first_content}</Text>
        
        <Text style={styles.heading}>{newsDetail.second_heading}</Text>
        <Text style={styles.contentText}>{newsDetail.second_content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE9E4',
  },
  imageContainer: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsImage: {
    width: '100%',
    height: 300,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Lora-Regular',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Lora-Regular',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    marginBottom: 12,
    fontFamily: 'Lora-Regular',
  },
  contentText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#666',
    fontFamily: 'Lora-Regular',
  },
});

export default NewsDetailScreen; 