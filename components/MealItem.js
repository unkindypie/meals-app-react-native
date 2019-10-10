import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const MealItem = props => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        {/* подругжаю картинки в фон по ссылке*/}
                        <ImageBackground source={{ uri: props.imageUrl }} style={styles.bgImage}>
                            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealRow: {
        flexDirection: 'row'
    },
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        overflow: 'hidden',
    },
    mealHeader: {
        height: '90%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    //т.к. эта картинка с инета, то нужно явно указать ее размер
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center',
    }

});

export default MealItem;