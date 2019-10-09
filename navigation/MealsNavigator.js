import { createStackNavigator } from 'react-navigation-stack'; //в react-navigation v4 нужно подключать такие штуки, там где юзаешь соответствующий навигатор
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDatailScreen from '../screens/MealDetaileScreen';
import Colors from '../constans/Colors';

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
    MealDetails: MealDatailScreen
},
    //2 аргумент - дефолтные опции для всех экранов. к примеру, можно задать стили хедера
    {
        mode: Platform.OS === 'ios' ? 'modal' : 'card', //анимация смены экранов(кард по дефолту)
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : undefined,
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        }
    }
);

export default createAppContainer(MealsNavigator);