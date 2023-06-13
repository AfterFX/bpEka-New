import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from '../screens/IndexScreen';
import BuyScreen from '../screens/BuyScreen';
import HistoryScreen from '../screens/HistoryScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Index" component={IndexScreen} />
                <Stack.Screen name="Pirkimo puslapis" component={BuyScreen} />
                <Stack.Screen name="Istorija" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;