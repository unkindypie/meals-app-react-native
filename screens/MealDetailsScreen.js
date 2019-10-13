import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = (props) => (
    <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
);

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');


    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const isFavorite = useSelector(state=>state.meals.favoriteMeals.some(meal => meal.id === mealId));
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(()=>{
        dispatch(toggleFavorite(mealId)) ;
    }, [dispatch, mealId]);

    useEffect(()=>{ 
        props.navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler]);

    useEffect(()=>{
        props.navigation.setParams({isFav: isFavorite});
    }, [isFavorite])

    //такой вариант отправит название в хэдер только, когда компонент полностью отрисован. а это плохо.
    // useEffect(()=>{
    //     props.navigation.setParams({mealTitle: selectedMeal.title});
    // }, [selectedMeal])

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingridients</Text>
            {selectedMeal.ingredients.map((ingridient, index) => (
                <ListItem key={index}>{ingridient}</ListItem>
            ))
            }
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((step, index) => (
                <ListItem key={index}>{step}</ListItem>
            ))
            }
        </ScrollView>
    );
};

//кнопка добавления в favorits на хэдере
MealDetailsScreen.navigationOptions = (navigationData) => {
    const isFavorite = navigationData.navigation.getParam('isFav')
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const mealTitle = navigationData.navigation.getParam('mealTitle');

    const icon = isFavorite?
        'favorite' : 'favorite-border';

    return {
        headerTitle: mealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite" iconName={icon} onPress={() => {
                toggleFavorite();
            }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
})

export default MealDetailsScreen;