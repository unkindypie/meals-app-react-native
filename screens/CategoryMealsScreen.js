import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import { FlatList } from 'react-native-gesture-handler';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props => {

    //получаю аргумент, отправленный через params в navigate
    const catId = props.navigation.getParam('categoryId');

    //в новых версиях react-redux для подключения к redux store вместо connect можно использовать useSelector
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found. Maybe it's due to your filters.</DefaultText>
            </View>
        );
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    );
};
//ставить опшинсы можно и через функцию, если тайтл нужно менять походу выполнения программы
CategoryMealsScreen.navigationOptions = (navigationData) => {
    //получаю аргумент, отправленный через params в navigate
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;