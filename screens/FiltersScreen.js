import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constans/Colors';
import { setFilters } from '../store/actions/meals';


const FilterSwitch = (props) => (
    <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Platform.OS === 'android' ? 'gray' : ''}
            value={props.state}
            onValueChange={props.onChange}
        />
    </View>
);
const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsGay] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    //useCallback - пересоздает функцию только когда ее зависимости меняются.
    //для предоставления кнопке из хэдера из react-navigation текущих стейтов
    const saveFilters = useCallback(()=>{

        const appliedFilters = {
             glutenFree: isGlutenFree,
             lactoseFree: isLactoseFree,
             vegan: isVegan,
             vegetarian: isVegetarian
        };

       dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(()=>{
        //передаю saveFilters в парамы navigation, чтобы потом использовать ее в navigationOptions 
        //новые парамсы будут merged со старыми
        props.navigation.setParams({save: saveFilters});
    }, [saveFilters]); //этот useEffect вызывается только, когда эта функция пересоздается, а пересоздается она только, когда
    //ее зависимости, проставленные в useCallback меняются

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                onChange={newValue => setIsGay(newValue)}
            />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => ({
    headerTitle: 'Filters',
    headerLeft:
        (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.openDrawer();
                    }} />
            </HeaderButtons>
        ),
    headerRight:
        (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="save"
                    onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        ),
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    }
})

export default FiltersScreen;