import { createStackNavigator } from 'react-navigation-stack'; //в react-navigation v4 нужно подключать такие штуки, там где юзаешь соответствующий навигатор
import { createAppContainer } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDatailScreen from '../screens/MealDetaileScreen';

//словарь "раутов" навигатора, возвращает React-комопнент, но чтобы его юзать его надо прогнать через createAppContainer
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        //эквивалент того, что сверху
        screen: CategoryMealsScreen,
    },
    MealDetails: MealDatailScreen
});

export default createAppContainer(MealsNavigator);