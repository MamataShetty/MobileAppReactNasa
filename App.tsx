import React, {FC} from 'react';
import {SafeAreaView, Text} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  DetailsScreen: {ckey: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home', headerTitleAlign: 'center'}}
        />

        <Stack.Screen
          name="DetailsScreen"
          options={{title: 'Asteroid Details', headerTitleAlign: 'center'}}
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
