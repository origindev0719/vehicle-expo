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
import { createProduct } from '../../features/vehicleSlice';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ModelScreen = ({route}) => {
  const model = useSelector((state) => state.vehicle.model)
  const dispatch = useDispatch()
  const [item, setItem] = useState([])

  const navigation = useNavigation()
  const year = route.params?.year;

  const handleSetProduct = (make, model) => {
    dispatch(createProduct({make, model, year}))
    navigation.navigate('Product')
  }

  useEffect(() => {
    setItem(model)
  }, [model])
  return(
    <SafeAreaView>
      <FlatList
          data={item}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSetProduct(item.Make_Name, item.Model_Name)}>
              <View style={styles.item}>
                  <Text>{item.Model_Name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item.Make_ID}
          onEndReachedThreshold={0.1}
        />
    </SafeAreaView>
  )
}

export default ModelScreen;