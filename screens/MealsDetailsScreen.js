import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealsDetailesScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Meals Detailes Screen</Text>
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

export default MealsDetailesScreen;