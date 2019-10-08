import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CategoryMealsScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Category Meal Screen</Text>
            <Button title="go to detail" onPress={props.navigation.navigate.bind(props.navigation, 'MealDetails')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CategoryMealsScreen;