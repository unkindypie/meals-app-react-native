import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const renderGridItem = (itemData) => {
    return (
        <View style={styles.gridItem}>
            <Text>{itemData.item.title}</Text>
        </View>
    );
};


const CategoriesScreen = props => {
    //каждый элемент navigation-стака получает в пропы navigation, через который можно делать "рауты"
    return (
        <FlatList keyExtractor={ (item)=>item.id } numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItem: {
        flex: 1,
        margin: 15
    }
})

export default CategoriesScreen;