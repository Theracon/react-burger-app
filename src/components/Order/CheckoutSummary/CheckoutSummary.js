import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import StyleSheet from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
  return (
    <div className={StyleSheet.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" click={props.cancelOrder}>
          CANCEL
        </Button>
        <Button btnType="Success" click={props.postOrder}>
          CONTINUE
        </Button>
      </div>
    </div>
  )
}

export default checkoutSummary
