import React from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions/index'
import Wrapper from '../../hoc/Wrapper/Wrapper'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      purchasing: false,
    }

    this.updatePurchaseState = this.updatePurchaseState.bind(this)
    this.purchasingHandler = this.purchasingHandler.bind(this)
    this.closeModalHandler = this.closeModalHandler.bind(this)
    this.continueToOrderHandler = this.continueToOrderHandler.bind(this)
  }

  componentDidMount() {
    this.props.initIngredients()
  }

  updatePurchaseState() {
    const ingredients = { ...this.props.ings }
    const sumOfQty = Object.values(ingredients).reduce(
      (sum, cur) => sum + cur,
      0,
    )

    return sumOfQty > 0
  }

  purchasingHandler() {
    this.setState({
      purchasing: true,
    })
  }

  closeModalHandler() {
    this.setState({
      purchasing: false,
    })
  }

  continueToOrderHandler() {
    this.props.initPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = { ...this.props.ings }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>
        Sorry, the burger ingredients couldn't be loaded.
      </p>
    ) : (
      <Spinner />
    )

    if (this.props.ings) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            disabled={disabledInfo}
            price={this.props.tPrice}
            canPurchase={this.updatePurchaseState()}
            order={this.purchasingHandler}
          />
        </Wrapper>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.tPrice}
          cancel={this.closeModalHandler}
          continue={this.continueToOrderHandler}
        />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.closeModalHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    removeIngredient: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    initPurchase: () => dispatch(actionCreators.purchaseInit()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))
