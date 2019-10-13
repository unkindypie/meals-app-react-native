import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux'


import MealItem from '../components/MealItem';

const MealList = (props) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = (itemData) => {
        //if (!itemData.item) return;

        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)

        return <MealItem
            // title={itemData.item.title}
            // duration = {itemData.item.duration} 
            {...itemData.item}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetails', params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite
                    }
                });
            }} />
    };

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
                style={{ width: '100%' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});

export default MealList;