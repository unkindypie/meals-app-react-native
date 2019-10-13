import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'; //в react-navigation v4 нужно подключать такие штуки, там где юзаешь соответствующий навигатор
import { createAppContainer } from 'react-navigation';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDatailsScreen from '../screens/MealDetailsScreen';
import FavoritsScreen from '../screens/FavoritesScreen';
import Colors from '../constans/Colors';
import Filters from '../screens/FiltersScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : undefined,
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

//словарь "раутов" навигатора, возвращает React-комопнент, но чтобы его юзать его надо прогнать через createAppContainer
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Categories'
        }
    },
    CategoryMeals: {
        //эквивалент того, что сверху
        screen: CategoryMealsScreen,
        navigationOptions: {

        }
    },
    MealDetails: MealDatailsScreen
},
    //2 аргумент - дефолтные опции для всех экранов. к примеру, можно задать стили хедера
    {
        mode: Platform.OS === 'ios' ? 'modal' : 'card', //анимация смены экранов(кард по дефолту)
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FacNavigator = createStackNavigator({
    Favorits: FavoritsScreen,
    MealDetails: MealDatailsScreen
}, {
        defaultNavigationOptions: defaultStackNavOptions
    })

const tabsScreenConfig = {
    //первым табом будет мой первый навигатор по всем категориям/блюдам, т.к. навигаторы можно вкладывать друг в друга
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            //иконка таба
            tabBarIcon: (tabInfo) => {
                return <MaterialIcons name='restaurant' size={25} color={tabInfo.tintColor} />
            },
            //для красивой анимации перехода цвета таба в matirialbottomtabnavigato'ре
            tabBarColor: Colors.primaryColor,
            //т.к. в createMaterialBottomTabNavigator нельзя настроить стили, то для андроида нужно делать стили табов в самих табах
            tabBarLabel: Platform.OS === 'android'? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>: 'Meals'
        },

    },
    Favorits: {
        screen: FacNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <MaterialIcons name='favorite' size={25} color={tabInfo.tintColor} />
            },
            //для красивой анимации перехода цвета таба в matirialbottomtabnavigato'ре
            tabBarColor: Colors.accentColor,
            //т.к. в createMaterialBottomTabNavigator нельзя настроить стили, то для андроида нужно делать стили табов в самих табах
            tabBarLabel: Platform.OS === 'android'? <Text style={{fontFamily: 'open-sans-bold'}}>Favorits</Text>: 'Favorits'
        }
    }

}

//навигатор по табам, включающий мой первый навигатор
const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabsScreenConfig, {
        activeColor: 'white',
        shifting: true
    })
    : createBottomTabNavigator(tabsScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
        //используется, когда этот навигатор используют как скрин в другом навигаторе
        navigationOptions: {
            drawerLabel: 'Meal Filters'
        },
        //дефолтные стили для всех скринов этого навигатора
        defaultNavigationOptions: defaultStackNavOptions
    })

//вкладываю в этот меню-навигатор другие навигаторы
const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);