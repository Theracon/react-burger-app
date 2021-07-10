import React from 'react'

import StyleSheet from './Order.module.css'

const order = (props) => {
  const ingredients = []

  for (let ing in props.ingredients) {
    ingredients.push({
      name: ing,
      quantity: props.ingredients[ing],
    })
  }

  return (
    <div className={StyleSheet.Order}>
      Ingredients:
      <ul>
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.name}
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: 5,
              }}
            >
              {ingredient.name}: {ingredient.quantity}
            </li>
          )
        })}
      </ul>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  )
}

export default order
