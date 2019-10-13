import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';


const FavoritesScreen = props => {
    const availableMeals = useSelector(state => state.meals.favoriteMeals)

    if (availableMeals.length === 0 || !availableMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No favotie meals found. Try add few.</DefaultText>
            </View>
        );
    };

    return (
        <MealList listData={availableMeals} navigation={props.navigation} />
    );
};


FavoritesScreen.navigationOptions = (navData) => ({
    headerTitle: 'Your Favorits',
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;