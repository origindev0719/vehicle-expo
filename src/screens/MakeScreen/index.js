import React, {useEffect, useState} from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchModel } from '../../features/vehicleSlice';
import styles from './styles';

const MakeScreen = ({route}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const make = useSelector((state) => state.vehicle.make)

  const [item, setItem] = useState([])
  const year = route.params?.year;

  const handleFetchMake = (makeId, makeName) => {
    dispatch(fetchModel({year, makeId}));
    navigation.navigate('Model', {year: year, model: makeName})
  }

  useEffect(() => {
    setItem(make)
  }, [make])
  return(
    <SafeAreaView>
      <FlatList
          data={make}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleFetchMake(item.MakeId, item.MakeName)}>
              <View style={styles.item}>
                  <Text>{item.MakeName}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item.MakeId}
          onEndReachedThreshold={0.1}
        />
    </SafeAreaView>
  )
}

export default MakeScreen;