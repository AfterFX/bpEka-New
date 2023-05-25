import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from '../screens/IndexScreen';
import BuyScreen from '../screens/BuyScreen';
import TableScreen from '../screens/TableScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Index" component={IndexScreen} />
                <Stack.Screen name="BuyHistory" component={BuyScreen} />
                <Stack.Screen name="Table" component={TableScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;