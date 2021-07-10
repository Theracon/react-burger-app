import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactForm from './ContactForm/ContactForm'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.continueToOrderHandler = this.continueToOrderHandler.bind(this)
    this.cancelOrderHandler = this.cancelOrderHandler.bind(this)
  }

  cancelOrderHandler() {
    this.props.history.goBack()
  }

  continueToOrderHandler() {
    this.props.history.push(this.props.match.path + '/contact-form')
  }

  render() {
    let summary = <Redirect to="/" />

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null

      summary = (
        <React.Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            postOrder={this.continueToOrderHandler}
            cancelOrder={this.cancelOrderHandler}
          />
          <Route
            path={this.props.match.path + '/contact-form'}
            component={ContactForm}
          />
        </React.Fragment>
      )
    }
    return summary
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout)
