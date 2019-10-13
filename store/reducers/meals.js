import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const mealIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            //если такая жратва есть, то убераю ее из любимых
            if (mealIndex >= 0) {
                const newFavorits = [...state.favoriteMeals];
                newFavorits.splice(mealIndex, 1);

                return { ...state, favoriteMeals: newFavorits }
            }
            //если нет, то добавляю
            return { ...state, favoriteMeals: [...state.favoriteMeals, state.meals.find(meal => meal.id === action.mealId)] }
        case SET_FILTERS:
            const filteredMeals = state.meals.filter(meal => {
                return !((action.filters.glutenFree && !meal.isGlutenFree) || 
                (action.filters.vegan && !meal.isVegan) || 
                (action.filters.lactoseFree && !meal.isLactoseFree) ||
                (action.filters.vegetarian && !meal.isVegetarian))
            });
            return { ...state, filteredMeals }
        default:
            return state;
    }
}

export default mealsReducer;