import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import StyleSheet from './BuildControls.module.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
  <div className={StyleSheet.BuildControls}>
    <p className={StyleSheet.Price}>
      Current Price:{' '}
      {props.price.toLocaleString('en-NG', {
        style: 'currency',
        currency: 'NGN',
      })}
    </p>
    {controls.map((control) => {
      return (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      )
    })}
    <button
      className={StyleSheet.OrderButton}
      disabled={!props.canPurchase}
      onClick={props.order}
    >
      ORDER NOW
    </button>
  </div>
)

export default buildControls
