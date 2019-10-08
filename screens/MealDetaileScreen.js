import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MealDetaileScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Meal Detailes Screen</Text>
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

export default MealDetaileScreen;