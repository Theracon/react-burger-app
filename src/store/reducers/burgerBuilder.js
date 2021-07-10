import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utils'

const initialState = {
  ingredients: null,
  totalPrice: 1000,
  error: false,
}

const INGREDIENT_PRICES = {
  salad: 200,
  cheese: 150,
  meat: 400,
  bacon: 300,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      }
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient,
      )
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedState)
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      }
      const updatedIngs = updateObject(state.ingredients, updatedIng)
      const updState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updState)
    case actionTypes.INIT_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 1000,
      })
    case actionTypes.HANDLE_ERROR:
      return updateObject(state, { error: true })
    default:
      return state
  }
}
export default reducer
