import { View, Text, SafeAreaView } from "react-native"
import {useSelector} from 'react-redux'
import styles from './styles'

const ProductScreen = () => {
  const product = useSelector((state) => state.vehicle.product)

  return (
    <SafeAreaView style={styles.container}>
    {
      Object.entries(product).map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{item[0]}</Text>
          <Text style={styles.value}>{item[1]}</Text>
        </View>
      ))
    }
  </SafeAreaView>
  )
}

export default ProductScreen;