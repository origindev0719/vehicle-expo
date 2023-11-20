import React, { createContext, useContext, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import store from './store';

import HomeScreen from './src/screens/HomeScreen'
import MakeScreen from './src/screens/MakeScreen';
import ModelScreen from './src/screens/ModelScreen';
import ProductScreen from './src/screens/ProductScreen';

import styles from './styles'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const SelectedContext = createContext();

function TopTabNavigator() {  
  return (
    <SafeAreaView style={{ flex: 1,  justifyContent: 'space-between' }}>
      <Tab.Navigator>
        <Tab.Screen name="Year" component={HomeScreen} options={{title: 'Year'}} />
        <Tab.Screen name="Make" component={MakeScreen} options={{title: 'Make'}}  />
        <Tab.Screen name="Model" component={ModelScreen} options={{title: 'Model'}} />
      </Tab.Navigator> 
    </SafeAreaView>
 );
}

function MainStackNavigator() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={{headerBackTitleVisible: false, headerBackImage: () => (
      <Image
        source={require('./assets/icon_chevronRight.png')}
        style={styles.backIcon}
      />
    ),}}>
      <Stack.Screen name="Year" options={{title: 'Year'}} component={HomeScreen} />
      <Stack.Screen name="Make" options={({ route }) => ({ title: '', header: () => (
        <SafeAreaView style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image
              source={require('./assets/icon_chevronRight.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Make</Text>
            <Text style={styles.hederSubText}>{route.params.year}</Text>
          </View>
        </SafeAreaView>
          ), })}  component={MakeScreen} />

      <Stack.Screen name="Model" options={({ route }) => ({ title: '', header: () => (
        <SafeAreaView style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image
              source={require('./assets/icon_chevronRight.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Model</Text>
            <View style={styles.headerModelTextContainer}>
              <Text style={styles.hederSubText}>{route.params.year}</Text>
              <Text style={styles.hederSubText}>{route.params.model}</Text>
            </View>
          </View>
      </SafeAreaView>
        ), })}  component={ModelScreen} />
    </Stack.Navigator>
  );
}


function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Year';
  return routeName;
}

export default function App() {
  const [selected, setSelected] = useState({
    year: null,
    make: null,
    model: null,
  })

 return (
   <Provider store={store}>
     <SelectedContext.Provider value={{ selected, setSelected }}>
     <SafeAreaProvider>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="MainStack" 
              options={({ route }) => { 
                const title = getHeaderTitle(route);
                let HeaderComponent;
                switch(title) {
                  case 'Year':
                    HeaderComponent = <SafeAreaView style={{backgroundColor: '#fff'}}><Text style={{fontSize: 18, textAlign: 'center', backgroundColor: '#fff'}}>{`Choose Year`}</Text></SafeAreaView>
                    break;
                  case 'Make':
                    HeaderComponent = <SafeAreaView style={{backgroundColor: '#fff'}}><Text style={{fontSize: 18, textAlign: 'center', backgroundColor: '#fff'}}>{`Choose Make ${route.params?.year}`}</Text></SafeAreaView>
                    break;
                  default:
                   HeaderComponent = <SafeAreaView style={{backgroundColor: '#fff'}}><Text style={{fontSize: 18, textAlign: 'center', backgroundColor: '#fff'}}>Model</Text></SafeAreaView>
                }
                return {
                  header: ()=> HeaderComponent
                }
              }}
              component={TopTabNavigator} 
            />
            <Stack.Screen 
              name='Product' 
              component={ProductScreen} 
              options={{ 
                headerBackTitleVisible: false,
                title: 'Product',
                headerBackImage: () => (
                  <Image
                    source={require('./assets/icon_chevronRight.png')} 
                    style={styles.backIcon} 
                  />
                ),
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>

     </SafeAreaProvider>
     </SelectedContext.Provider>
    </Provider>
 );
}