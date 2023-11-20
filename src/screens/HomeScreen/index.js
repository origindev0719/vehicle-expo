import React, {useEffect} from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchMake } from '../../features/vehicleSlice';
import styles from './styles';

const HomeScreen = () => {
  const years = Array.from({length: 2024 - 1995 + 1}, (_, i) => i + 1995).reverse();

  
  const dispatch = useDispatch();
  const make = useSelector((state) => state.vehicle.make)

  const navigation = useNavigation();

  const handleFetchMake = (item) => {
    dispatch(fetchMake(item));
    navigation.navigate('Make', {year: item})
  }

  return (
    <SafeAreaView>
      <FlatList
          data={years}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleFetchMake(item)}>
              <View style={styles.item}>
                  <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          onEndReachedThreshold={0.1}
        />
    </SafeAreaView>
  )
}

export default HomeScreen;