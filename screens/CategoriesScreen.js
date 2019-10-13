import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridItem from '../components/CategoryGridItem';

const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridItem
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryMeals',
                        //передаю аргументы через navigation
                        params: {
                            categoryId: itemData.item.id
                        }
                    })
                }} />
        );
    };

    //каждый элемент navigation-стака получает в пропы navigation, через который можно делать "рауты"
    return (
        <FlatList keyExtractor={(item) => item.id} numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
    );
};

//react navigation ищет такую штуку на компоненте сам, но лучше делать это в самом навигаторе в create...Navigator функции
CategoriesScreen.navigationOptions = (navData) => ({
    headerTitle: 'Meals Categories',
    headerLeft:
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="menu"
                onPress={() => {
                    navData.navigation.openDrawer();
                }} />
        </HeaderButtons>
});


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CategoriesScreen;