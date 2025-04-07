import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../navigationTypes';

type NewsItem = {
  id: number;
  title: string;
  preview_image: string;
  tags: Array<{
    id: number;
    name: string;
  }>;
};

const NewsScreen = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

  useEffect(() => {
    fetch('http://10.179.120.139:8000/api/news/')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
    >
      <Image source={{ uri: item.preview_image }} style={styles.newsImage} />
      <View style={styles.overlay}>
        <View style={styles.tagContainer}>
          {item.tags.map(tag => (
            <View key={tag.id} style={styles.tag}>
              <Text style={styles.tagText}>#{tag.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.newsTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE9E4',
  },
  listContainer: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
  newsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'Lora-Regular',
  },
});

export default NewsScreen; 