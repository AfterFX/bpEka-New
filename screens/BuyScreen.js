import React, { useState, useEffect, Component } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Button, TouchableOpacity, Alert, Dimensions} from 'react-native';

import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Slider from '@react-native-community/slider';

import { AntDesign, Fontisto } from "@expo/vector-icons";

const PriceTable = ({ navigation }) => {
    const [tableData, setTableData] = useState({
        healthy: {
            item1: { units: '', prices: '', results: '', name: 'EUR A1' },
            item2: { units: '', prices: '', results: '', name: 'EUR A'  },
            item3: { units: '', prices: '', results: '', name: 'EUR B'  },
            item4: { units: '', prices: '', results: '', name: 'LSD', underline: true },
            item5: { units: '', prices: '', results: '', name: 'SD'  },
            item6: { units: '', prices: '', results: '', name: 'SD AP'  },
            item7: { units: '', prices: '', results: '', name: 'PM'  },
            item8: { units: '', prices: '', results: '', name: 'KNAUF', underline: true  },
            item9: { units: '', prices: '', results: '', name: 'LSD, FIN'  },
            item10: { units: '', prices: '', results: '', name: 'SD, perimetriniai'  },
            item11: { units: '', prices: '', results: '', name: 'PM, perimetriniai, SD AP'  },
            item12: { units: '', prices: '', results: '', name: 'KNAUF'  },
            item13: { units: '', prices: '', results: '', name: 'CP1'  },
            item14: { units: '', prices: '', results: '', name: 'CP6', underline: true  },
            item15: { units: '', prices: '', results: '', name: 'LSD, SD'  },
            item16: { units: '', prices: '', results: '', name: 'CP3'  },
            item17: { units: '', prices: '', results: '', name: 'CP9', underline: true  },
            item18: { units: '', prices: '', results: '', name: 'PAROC', underline: true  },
            item19: { units: '', prices: '', results: '', name: 'KNAUF', underline: true  },
            item20: { units: '', prices: '', results: '', name: '600x800'  },
            item21: { units: '', prices: '', results: '', name: '800x800'  },
            item22: { units: '', prices: '', results: '', name: '1000x1000'  },
            item23: { units: '', prices: '', results: '', name: '1100x1100'  },
            item24: { units: '', prices: '', results: '', name: '1200x1200'  },
            item25: { units: '', prices: '', results: '', name: '1100x1300 PRS'  },
            item26: { units: '', prices: '', results: '', name: 'Nestandartiniai padėklai', underline: true  },
            item27: { units: '', prices: '', results: '', name: '800x1200 (Šviesūs)'  },
            item28: { units: '', prices: '', results: '', name: '800x1200 (Tamsūs)'  },
            item29: { units: '', prices: '', results: '', name: '600x800 (Šviesūs)'  },
            item30: { units: '', prices: '', results: '', name: '600x800 (Tamsūs)'  },
            item31: { units: '', prices: '', results: '', name: 'Nestandartai', underline: true },
            item32: { units: '', prices: '', results: '', name: 'Mediniai padėklai'  },
        },
        repair: {
            item1: { units: '', prices: '', results: '' },
            item2: { units: '', prices: '', results: '' },
            item3: { units: '', prices: '', results: '' },
            item4: { units: '', prices: '', results: '', underline: true },
            item5: { units: '', prices: '', results: '' },
            item6: { units: '', prices: '', results: '' },
            item7: { units: '', prices: '', results: '' },
            item8: { units: '', prices: '', results: '', underline: true },
            item9: { units: '', prices: '', results: '' },
            item10: { units: '', prices: '', results: '' },
            item11: { units: '', prices: '', results: '' },
            item12: { units: '', prices: '', results: '' },
            item13: { units: '', prices: '', results: '' },
            item14: { units: '', prices: '', results: '', underline: true },
            item15: { units: '', prices: '', results: '' },
            item16: { units: '', prices: '', results: '' },
            item17: { units: '', prices: '', results: '', underline: true },
            item18: { units: '', prices: '', results: '', underline: true },
            item19: { units: '', prices: '', results: '', underline: true },
            item20: { units: '', prices: '', results: '' },
            item21: { units: '', prices: '', results: '' },
            item22: { units: '', prices: '', results: '' },
            item23: { units: '', prices: '', results: '' },
            item24: { units: '', prices: '', results: '' },
            item25: { units: '', prices: '', results: '' },
            item26: { units: '', prices: '', results: '', underline: true },
            item27: { units: '', prices: '', results: '' },
            item28: { units: '', prices: '', results: '' },
            item29: { units: '', prices: '', results: '' },
            item30: { units: '', prices: '', results: '' },
            item31: { units: '', prices: '', results: '', underline: true },
            item32: { units: '', prices: '', results: '' },
        },
        sumUnits: 0,
        sumPrices: 0,
    });

    const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [pricesInputEnabled, setPricesInputEnabled] = useState(false);
    const [textSize, setTextSize] = useState(20);

    useEffect(() => {
        // Load prices from storage when component mounts
        loadPricesFromStorage();
    }, []);

    useEffect(() => {
        // Save prices to storage when tableData changes
        savePricesToStorage();
    }, [tableData]);

    const goHistoryScreen = () => {
        navigation.navigate('Istorija');
    };

    const loadPricesFromStorage = async () => {
        try {
            const priceData = await AsyncStorage.getItem('priceData');
            if (priceData) {
                const parsedPrices = JSON.parse(priceData);
                setTableData(parsedPrices);
            }
        } catch (error) {
            console.log('Error loading prices from storage:', error);
        }
    };

    const savePricesToStorage = async () => {
        try {
            await AsyncStorage.setItem('priceData', JSON.stringify(tableData));
        } catch (error) {
            console.log('Error saving prices to storage:', error);
        }
    };

    const handleUnitChange = (item, value, rowName) => {
        setTableData((prevState) => {
            const newTableData = { ...prevState };
            newTableData[rowName][item].units = Number(value);
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

    const handleClearAllUnits = (toast) => {
        return () => {
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

            if (toast) {
                Toast.show({
                    type: 'success',
                    text1: toast,
                    visibilityTime: 2000,
                    autoHide: true,
                });
            }
        };
    };

    const updateResult = (item, price, unit, rowName) => {
        setTableData((prevState) => {
            const newTableData = { ...prevState };
            newTableData[rowName][item].results = Number((price * unit).toFixed(2));
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
        if (pricesInputEnabled) savePricesToStorage().then(handleClearAllUnits(false));
    };

    const handleSave = async () => {
        try {
            if(unitTotal){
                const history = await AsyncStorage.getItem('tableData');

                const priceHistory = history ? JSON.parse(history) : {};
                const newId = Date.now().toString(); // Generate a unique ID
                tableData["sumUnits"] = unitTotal;
                tableData["sumPrices"] = resultTotal;
                // Create a new entry in the priceHistory using the new ID
                priceHistory[newId] = tableData;

                await AsyncStorage.setItem('tableData', JSON.stringify(priceHistory)).then(handleClearAllUnits(false));
                Toast.show({
                    type: 'success',
                    text1: 'Išsaugota sėkmingai',
                    visibilityTime: 3000,
                    autoHide: true,
                });
            }else{
                Toast.show({
                    type: 'error',
                    text1: 'Klaida',
                    text2: 'Neįvesta prekių kiekis ❌',
                    visibilityTime: 3000,
                    autoHide: true,
                    text1Style: {backgroundColor: "red",  fontSize: 36 }, // Adjust the font size here

                });
            }
        } catch (error) {
            console.log('Error saving prices to history:', error);
        }
    };

    const removeStorage = async () => {
        try {
            await AsyncStorage.removeItem('tableData');
        } catch (e) {
            // remove error
        }
        console.log('Done.');
    };

    const handleTextSizeChange = (value) => {
        setTextSize(value);
    };

    const renderRow = (rowName) => {
        const items = Object.keys(tableData[rowName]);

        return (
            <View style={styles.rowContainer}>
                {items.map((item) => (
                    <View key={item} style={styles.row}>
                        {rowName === 'healthy' ? <TextInput
                            style={[styles.WrapperName,
                                { fontSize: textSize },
                                tableData[rowName][item].underline === true ? {borderBottomWidth: 2} : '',
                            ]}
                            editable={false}
                            multiline={true}
                            numberOfLines={1}
                        >
                            {tableData[rowName][item].name === 0 ? '' : tableData[rowName][item].name}
                        </TextInput> : ''}

                        <TextInput
                            style={[
                                styles.input,
                                focusedInputIndex?.rowName === rowName &&
                                focusedInputIndex?.item === item &&
                                focusedInputIndex?.inputType === 'units'
                                    ? styles.focusedInput
                                    : null,
                                { fontSize: textSize },
                                tableData[rowName][item].underline === true ? {borderBottomWidth: 2} : '',
                            ]}
                            keyboardType="numeric"
                            value={(tableData[rowName][item].units).toString()}
                            onChangeText={(value) => handleUnitChange(item, value, rowName)}
                            onFocus={() => handleInputFocus(rowName, item, 'units')}
                            onBlur={handleInputBlur}
                            editable={!pricesInputEnabled}
                            multiline={true}
                            numberOfLines={1}
                        />
                        <TextInput
                            style={[
                                styles.prices,
                                focusedInputIndex?.rowName === rowName &&
                                focusedInputIndex?.item === item &&
                                focusedInputIndex?.inputType === 'prices'
                                    ? styles.focusedInput
                                    : null,
                                { fontSize: textSize },
                                pricesInputEnabled ? { backgroundColor: 'green' } : { backgroundColor: 'white' },
                                tableData[rowName][item].underline === true ? {borderBottomWidth: 2} : '',
                            ]}
                            keyboardType="numeric"
                            value={(tableData[rowName][item].prices).toString()}
                            onChangeText={(value) => handlePriceChange(item, value, rowName)}
                            onFocus={() => handleInputFocus(rowName, item, 'prices')}
                            onBlur={handleInputBlur}
                            editable={pricesInputEnabled}
                            multiline={true}
                            numberOfLines={1}
                        />
                        <TextInput
                            style={[styles.result,
                                { fontSize: textSize },
                                tableData[rowName][item].underline === true ? {borderBottomWidth: 2} : '',
                            ]}
                            editable={false}
                            multiline={true}
                            numberOfLines={1}
                        >
                            {tableData[rowName][item].results === 0 ? '' : tableData[rowName][item].results}
                        </TextInput>
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

    const TableWrapperTextStyle = () => {
        return [{ textAlign: 'center', width: 200, height: 184+(textSize/1.5),  transform: [{ rotate: '-90deg' }]}, { fontSize: textSize }]
    }

    const { resultTotal, unitTotal } = calculateResultTotal();

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container1}>
                    <View style={styles.top}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.footerText, {fontSize: textSize}]}>Viso prekių: {unitTotal} {"\n"} Viso EUR: {resultTotal}</Text>

                        </View>
                        <TouchableOpacity
                            onPress={goHistoryScreen}
                            style={{position: "absolute", textAlign:'right', right: 0}}
                        >
                            <Fontisto name={'history'} size={50} color={'green'} />
                        </TouchableOpacity>
                    </View>
                    <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1, borderRightWidth: 1}}>
                        {/* Left Wrapper */}
                        <TouchableOpacity
                            style={styles.singleHead}
                            onPress={handleSave}
                        >
                            <AntDesign style={styles.saveBtn} name={'printer'} size={70} color={'red'} />
                        </TouchableOpacity>


                        {/*style={{ fontSize: textSize }}*/}
                        {/* Right Wrapper */}
                        <TableWrapper style={{flex:1}}>
                            <Cols data={[['Sveiki'], ['Remontas']]}  style={{backgroundColor: '#c8e1ff'}} flexArr={[1, 1]} textStyle={{ textAlign: 'center', fontWeight: "bold", fontSize: textSize }}/>
                            <Cols data={[['Kiekis'], ['Kaina € /vnt'], ['Suma'], ['Kiekis'], ['Kaina € /vnt'], ['Suma'],]} style={{backgroundColor: '#c8e1ff'}} flexArr={[1, 1, 1, 1, 1, 1, 1]} heightArr={[50]} textStyle={{ fontSize: textSize, textAlign: 'center'}}/>
                        </TableWrapper>
                    </Table>
                    <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                        {/* Left Wrapper */}
                        <TableWrapper style={{width: 35}}>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[<Text style={TableWrapperTextStyle()}>800x1200</Text>, <Text style={TableWrapperTextStyle()}>1000x1200</Text>, <Text style={TableWrapperTextStyle()}>1140</Text>, <Text style={TableWrapperTextStyle()}></Text>, <Text style={TableWrapperTextStyle()}></Text>, <Text style={TableWrapperTextStyle()}>Nestandartai</Text>, <Text style={TableWrapperTextStyle()}>Šarnyrai</Text>, <Text style={TableWrapperTextStyle()}></Text>]} style={styles.head} heightArr={[242, 180, 92, 30, 31, 211, 151, 31]} textStyle={styles.text} />
                            </TableWrapper>
                        </TableWrapper>

                        {/* Right Wrapper */}
                        <TableWrapper style={{flex:1}}>
                            <Cols data={[
                                ['', <View style={styles.leftColumn}>{renderRow('healthy')}</View>],
                                ['', <View style={styles.rightColumn}>{renderRow('repair')}</View>],
                            ]} heightArr={[1]} flexArr={[2.38, 1]}  textStyle={styles.text}/>
                            {/*widthArr={[50, 50]}*/}
                        </TableWrapper>
                    </Table>
                </View>


            </View>
            <View style={styles.footer}>
                <Button
                    title={pricesInputEnabled ? 'Išsaugoti kainų redagavimą' : 'Įgalinti kainų redagavimą'}
                    onPress={handleTogglePricesInput}
                />
                <Button title="Išvalyti laukelius" onPress={handleClearAllUnits('Sėkmingai laukeliai išvalyti')} />
                <Button title="Išvalyti istorija" onPress={removeStorage} />
                <Slider
                    style={styles.slider}
                    minimumValue={10}
                    maximumValue={20}
                    step={1}
                    value={textSize}
                    onValueChange={handleTextSizeChange}
                />
            </View>
            <Toast />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        top: -30,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    leftColumn: {
        flex: 1,
        // marginRight: 0,
        borderRightWidth: 3
    },
    rightColumn: {
        flex: 1,
        // marginLeft: 50,
    },
    rowContainer: {
        // width: 500
        // paddingRight: 20
    },
    rowContainer1: {
        // width: 200,
        paddingLeft: 50
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    rowName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        flex: 1,
        backgroundColor: '#f3dd90',
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 0,
        padding: 0,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 1,
    },
    prices: {
        flex: 1,
        // marginRight: 10,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 0,
        padding: 0,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 1,
    },
    focusedInput: {
        borderColor: 'blue',
        backgroundColor: "yellow"
    },
    result: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 0,
        padding: 0,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 1,
    },
    WrapperName: {
        flex: 4,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 0,
        textAlign: 'left',
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 5
    },
    top: {
        alignItems: 'center',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontWeight: 'bold',
    },
    slider: {
        width: '80%',
        marginTop: 20,
    },
    saveBtn: {
        textAlignVertical: 'center',
        alignSelf: "center",
        flex: 1
    },
    editBtn: {
        position: "absolute",
        textAlign:'right',
        right: 0
    },
    container1: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    singleHead: { flex: 0.75, height: 78, backgroundColor: '#047e0e' },
    head: { flex: 1, backgroundColor: '#D0D0D0FF' },
    title: { flex: 2, backgroundColor: '#f6f8fa' },
    titleText: { marginRight: 6, textAlign:'right' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' }
});

export default PriceTable;
