import React from 'react'
import PropTypes from 'prop-types'
import StyleSheet from './BurgerIngredient.module.css'

class BurgerIngredient extends React.Component {
  render() {
    let ingredient = null

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={StyleSheet.BreadBottom}></div>
        break
      case 'bread-top':
        ingredient = (
          <div className={StyleSheet.BreadTop}>
            <div className={StyleSheet.Seeds1}></div>
            <div className={StyleSheet.Seeds2}></div>
          </div>
        )
        break
      case 'meat':
        ingredient = <div className={StyleSheet.Meat}></div>
        break

      case 'cheese':
        ingredient = <div className={StyleSheet.Cheese}></div>
        break
      case 'salad':
        ingredient = <div className={StyleSheet.Salad}></div>
        break
      case 'bacon':
        ingredient = <div className={StyleSheet.Bacon}></div>
        break
      default:
        ingredient = null
    }

    return ingredient
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
}

export default BurgerIngredient
