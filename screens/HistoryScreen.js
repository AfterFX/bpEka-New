import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';

const HistoryScreen = () => {
    const [historyData, setHistoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedRowData, setSelectedRowData] = useState(null); // Store the data of the selected row
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control the visibility of the modal
    const itemsPerPage = 3; // Number of items to show per page

    useEffect(() => {
        loadHistoryFromStorage();
    }, []);

    const loadHistoryFromStorage = async () => {
        try {
            const history = await AsyncStorage.getItem('tableData');
            const checkedItems = await AsyncStorage.getItem('checkedItems');
            if (history) {
                const parsedHistory = JSON.parse(history);
                const historyArray = Object.entries(parsedHistory).map(([id, data]) => ({
                    id,
                    data,
                }));
                setHistoryData(historyArray);

                if (checkedItems) {
                    setCheckedItems(JSON.parse(checkedItems));
                }
            }
        } catch (error) {
            console.log('Error loading history from storage:', error);
        }
    };

    const sumUnits = (item) => {
        const data = item.data;
        return Object.values(data).reduce((acc, category) => {
            const categorySum = Object.values(category).reduce((sum, item) => {
                const units = parseInt(item.units) || 0;
                return sum + units;
            }, 0);
            return acc + categorySum;
        }, 0);
    };

    const handleDelete = async (id) => {
        try {
            const history = await AsyncStorage.getItem('tableData');
            if (history) {
                const parsedHistory = JSON.parse(history);
                delete parsedHistory[id];
                await AsyncStorage.setItem('tableData', JSON.stringify(parsedHistory));

                // Remove the checked item from checkedItems
                setCheckedItems((prevState) => {
                    const newState = { ...prevState };
                    delete newState[id];
                    return newState;
                });

                loadHistoryFromStorage(); // Refresh the history data after deletion
            }
        } catch (error) {
            console.log('Error deleting history:', error);
        }
    };

    const handleRowPress = (rowData) => {
        setSelectedRowData(rowData);
        setIsModalVisible(true);
    };

    const renderItem = ({ item }) => {
        const date = new Date(Number(item.id));
        const handleCheckboxToggle = () => {
            setCheckedItems((prevState) => {
                const updatedState = {
                    ...prevState,
                    [item.id]: !prevState[item.id],
                };
                AsyncStorage.setItem('checkedItems', JSON.stringify(updatedState)).catch((error) =>
                    console.log('Error saving checked items:', error)
                );
                return updatedState;
            });
        };
        const isChecked = checkedItems[item.id] || false;
        return (
            <View>
                <DataTable.Row>
                    <DataTable.Cell style={styles.cell}>{item.id}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{item.data.sumUnits}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>€{item.data.sumPrices}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                    </DataTable.Cell>
                    <DataTable.Cell  onPress={() => handleRowPress(item.data)} style={styles.cell}><MaterialIcons name="preview" size={24} color="green" /></DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        <DataTable.Cell style={styles.deleteCell}>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Fontisto name={'trash'} size={24} color={'red'} />
                            </TouchableOpacity>
                        </DataTable.Cell>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                        <TouchableOpacity onPress={handleCheckboxToggle}>
                            <Feather
                                name={isChecked ? 'check-square' : 'square'}
                                size={24}
                                color={isChecked ? 'green' : 'red'}
                            />
                        </TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
            </View>
        );
    };

    // Pagination functions
    const getPageCount = () => {
        return Math.ceil(historyData.length / itemsPerPage);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return historyData.slice(startIndex, endIndex);
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to the Buy History Screen!</Text>
            <View>
                <DataTable style={styles.dataTable}>
                    <DataTable.Header>
                        <DataTable.Title style={styles.headerCell}>id</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Kiekis</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Suma</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Laikas</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}> </DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Delete</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Čekis</DataTable.Title>
                    </DataTable.Header>
                    <View style={styles.historyItem}>
                        {/*<Text style={styles.historyId}>{item.id}</Text>*/}
                        <FlatList data={getPaginatedData()} renderItem={renderItem} keyExtractor={(item) => item.id} />
                    </View>
                </DataTable>
            </View>
            <View style={styles.pagination}>
                {Array.from({ length: getPageCount() }, (_, index) => (
                    <Button
                        key={index}
                        title={`${index + 1}`}
                        onPress={() => goToPage(index + 1)}
                        color={currentPage === index + 1 ? 'blue' : 'gray'}
                    />
                ))}
            </View>

            <Modal visible={isModalVisible} animationType="fade"  transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedRowData && (
                            <>
                                <Text style={styles.modalTitle}>Row Data</Text>
                                <Text>ID: {JSON.stringify(selectedRowData)}</Text>
                                {/* Render other row data properties */}
                                <Button title="Close" onPress={() => setIsModalVisible(false)} />
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    historyItem: {
        marginBottom: 10,
    },
    dataTable: {
        marginTop: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#f2f2f2',
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        fontSize: 14,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    deleteCell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        cursor: 'pointer',
    },
});

export default HistoryScreen;
