import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const goToBuyHistory = () => {
        navigation.navigate('BuyHistory');
    };

    const goTableScreen = () => {
        navigation.navigate('Table');
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to the Index Screen!</Text>
            <Button title="Go to Buy page" onPress={goToBuyHistory} />
            <Button title="Go to Table page" onPress={goTableScreen} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default IndexScreen;