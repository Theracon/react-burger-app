import React from 'react'
import StyleSheet from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  let ingredientsArray = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return <BurgerIngredient key={ingKey + index} type={ingKey} />
      })
    })
    .reduce((acc, cur) => {
      return acc.concat(cur)
    }, [])

  if (ingredientsArray.length === 0) {
    ingredientsArray = <p>Start adding ingredients!</p>
  }

  return (
    <div className={StyleSheet.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger
