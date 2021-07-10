import React from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import * as actionCreators from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import StyleSheet from './ContactForm.module.css'

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        houseNumber: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'House number',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street name',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'City',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        state: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'State',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
          validation: { required: true },
          valid: false,
          touched: false,
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'economy', displayValue: 'Economy' },
              { value: 'swift', displayValue: 'Swift' },
            ],
          },
          value: 'economy',
          validation: {},
          valid: true,
        },
        paymentMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'online', displayValue: 'Pay Online' },
              { value: 'cash', displayValue: 'Pay On Delivery' },
            ],
          },
          value: 'online',
          validation: {},
          valid: true,
        },
        customMessage: {
          elementType: 'textarea',
          elementConfig: {
            placeholder: 'Rate our service out of 5 :)',
          },
          value: '',
          validation: {
            required: true,
            isNumber: true,
            min: 1,
            max: 5,
          },
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
    }
    this.orderHandler = this.orderHandler.bind(this)
    this.inputChangeHandler = this.inputChangeHandler.bind(this)
    this.checkValidity = this.checkValidity.bind(this)
  }

  orderHandler(event) {
    event.preventDefault()

    const formData = {}
    for (let elementId in this.state.orderForm) {
      formData[elementId] = this.state.orderForm[elementId].value
    }
    const newOrder = {
      ingredients: this.props.ings,
      price: this.props.tPrice.toLocaleString('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }),
      orderData: formData,
    }
    this.props.onBurgerOrder(newOrder)
  }

  inputChangeHandler(event, elementId) {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[elementId] }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    )
    updatedFormElement.touched = true
    updatedOrderForm[elementId] = updatedFormElement

    let formIsValid = true
    for (let elementId in updatedOrderForm) {
      formIsValid = updatedOrderForm[elementId].valid && formIsValid
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    })
  }

  checkValidity(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.isNumber) {
      isValid = !isNaN(value) && isValid
    }

    if (rules.max) {
      isValid = +value <= rules.max && isValid
    }

    if (rules.min) {
      isValid = +value >= rules.min && isValid
    }

    return isValid
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
            isValid={formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={StyleSheet.ContactForm}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData) =>
      dispatch(actionCreators.purchaseBurger(orderData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactForm, axios))
