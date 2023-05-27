import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const goBuyScreen = () => {
        navigation.navigate('BuyScreen');
    };

    const goHistoryScreen = () => {
        navigation.navigate('HistoryScreen');
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to the Index Screen!</Text>
            <Button title="Go to Buy page" onPress={goBuyScreen} />
            <Button title="Go to History page" onPress={goHistoryScreen} />
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