import React from 'react'

import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component {
  componentDidUpdate() {
    console.log('[OrderSummary.js]: OrderSummary updated.')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((key) => {
      return (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
          {this.props.ingredients[key]}
        </li>
      )
    })

    return (
      <div>
        <h3>Your Order</h3>
        <p>Your order is a yummy burger with the following ingredients:</p>
        <ol>{ingredientSummary}</ol>
        <p>
          <strong>
            Total:{' '}
            {this.props.price.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType={'Danger'} click={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType={'Success'} click={this.props.continue}>
          CONTINUE
        </Button>
      </div>
    )
  }
}

export default OrderSummary
