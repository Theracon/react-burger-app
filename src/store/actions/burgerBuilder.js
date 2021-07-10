import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (ing) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ing,
  }
}

export const removeIngredient = (ing) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ing,
  }
}

const fetchIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients,
  }
}

const setError = () => {
  return {
    type: actionTypes.HANDLE_ERROR,
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        'https://react-burger-app-a3169-default-rtdb.firebaseio.com/ingredients.json',
      )
      .then((response) => dispatch(fetchIngredients(response.data)))
      .catch((error) => dispatch(setError()))
  }
}
