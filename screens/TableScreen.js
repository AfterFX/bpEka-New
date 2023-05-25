import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const PriceTable = () => {
    const [tableData, setTableData] = useState({
        healthy: {
            item1: { units: '', prices: '', results: '' },
            item2: { units: '', prices: '', results: '' },
            // ... repeat item3 to item20
            item20: { units: '', prices: '', results: '' },
        },
        repair: {
            item1: { units: '', prices: '', results: '' },
            item2: { units: '', prices: '', results: '' },
            // ... repeat item3 to item20
            item20: { units: '', prices: '', results: '' },
        },
    });

    const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [pricesInputEnabled, setPricesInputEnabled] = useState(false);

    useEffect(() => {
        // Load prices from storage when component mounts
        loadPricesFromStorage();
    }, []);

    useEffect(() => {
        // Save prices to storage when tableData changes
        savePricesToStorage();
    }, [tableData]);

    const loadPricesFromStorage = async () => {
        try {
            const prices = await AsyncStorage.getItem('tableData');
            if (prices) {
                const parsedPrices = JSON.parse(prices);
                setTableData(parsedPrices);
            }
        } catch (error) {
            console.log('Error loading prices from storage:', error);
        }
    };

    const savePricesToStorage = async () => {
        try {
            await AsyncStorage.setItem('tableData', JSON.stringify(tableData));
        } catch (error) {
            console.log('Error saving prices to storage:', error);
        }
    };

    const handleUnitChange = (item, value, rowName) => {
        setTableData((prevState) => {
            const newTableData = { ...prevState };
            newTableData[rowName][item].units = value;
            updateResult(item, newTableData[rowName][item].prices, newTableData[rowName][item].units, rowName);
            return newTableData;
        });
    };

    const handlePriceChange = (item, value, rowName) => {
        setTableData((prevState) => {
            const newTableData = { ...prevState };
            newTableData[rowName][item].prices = value;
            updateResult(item, newTableData[rowName][item].prices, newTableData[rowName][item].units, rowName);
            return newTableData;
        });
    };

    const handleClearAllUnits = () => {
        setTableData((prevState) => {
            const newTableData = { ...prevState };

            Object.keys(newTableData).forEach((rowName) => {
                Object.keys(newTableData[rowName]).forEach((item) => {
                    newTableData[rowName][item].units = '';
                    updateResult(item, newTableData[rowName][item].prices, newTableData[rowName][item].units, rowName);
                });
            });

            return newTableData;
        });

        Toast.show({
            type: 'success',
            text1: 'Clear Completed',
            visibilityTime: 2000,
            autoHide: true,
        });
    };

    const updateResult = (item, price, unit, rowName) => {
        setTableData((prevState) => {
            const newTableData = { ...prevState };
            newTableData[rowName][item].results = price * unit;
            return newTableData;
        });
    };

    const handleInputFocus = (rowName, item, inputType) => {
        setFocusedInputIndex({ rowName, item, inputType });
    };

    const handleInputBlur = () => {
        setFocusedInputIndex(null);
    };

    const handleTogglePricesInput = () => {
        setPricesInputEnabled(!pricesInputEnabled);
    };

    const handleSave = () => {
        savePricesToStorage().then(handleClearAllUnits);
        Toast.show({
            type: 'success',
            text1: 'Prices Saved',
            visibilityTime: 2000,
            autoHide: true,
        });
    };

    const renderRow = (rowName) => {
        const items = Object.keys(tableData[rowName]);

        return (
            <View style={styles.rowContainer}>
                <Text style={styles.rowName}>{rowName}</Text>
                {items.map((item) => (
                    <View key={item} style={styles.row}>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInputIndex?.rowName === rowName &&
                                focusedInputIndex?.item === item &&
                                focusedInputIndex?.inputType === 'units'
                                    ? styles.focusedInput
                                    : null,
                            ]}
                            keyboardType="numeric"
                            value={tableData[rowName][item].units}
                            onChangeText={(value) => handleUnitChange(item, value, rowName)}
                            onFocus={() => handleInputFocus(rowName, item, 'units')}
                            onBlur={handleInputBlur}
                            editable={!pricesInputEnabled}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                focusedInputIndex?.rowName === rowName &&
                                focusedInputIndex?.item === item &&
                                focusedInputIndex?.inputType === 'prices'
                                    ? styles.focusedInput
                                    : null,
                            ]}
                            keyboardType="numeric"
                            value={tableData[rowName][item].prices}
                            onChangeText={(value) => handlePriceChange(item, value, rowName)}
                            onFocus={() => handleInputFocus(rowName, item, 'prices')}
                            onBlur={handleInputBlur}
                            editable={pricesInputEnabled}
                        />
                        <Text style={styles.result}>{tableData[rowName][item].results}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const calculateResultTotal = () => {
        let resultTotal = 0;
        let unitTotal = 0;

        Object.values(tableData).forEach((row) => {
            Object.values(row).forEach((item) => {
                resultTotal += parseFloat(item.results || 0);
                unitTotal += parseFloat(item.units || 0);
            });
        });

        return { resultTotal, unitTotal };
    };

    const { resultTotal, unitTotal } = calculateResultTotal();

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.leftColumn}>{renderRow('healthy')}</View>
                <View style={styles.rightColumn}>{renderRow('repair')}</View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Result Total: {resultTotal}</Text>
                <Text style={styles.footerText}>Unit Total: {unitTotal}</Text>
                <Button
                    title={pricesInputEnabled ? 'Disable Prices Input' : 'Enable Prices Input'}
                    onPress={handleTogglePricesInput}
                />
                <Button title="Clear All" onPress={handleClearAllUnits} />
                <Button title="Save" onPress={handleSave} />
            </View>
            <Toast />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    leftColumn: {
        flex: 1,
        marginRight: 5,
    },
    rightColumn: {
        flex: 1,
        marginLeft: 5,
    },
    rowContainer: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rowName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
    },
    focusedInput: {
        borderColor: 'blue',
    },
    result: {
        // flex: 1,
        // marginLeft: 10,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default PriceTable;
