import React from 'react'
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actionCreators from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import StyleSheet from './Auth.module.css'

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter Email',
        },
        value: '',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter Password',
        },
        value: '',
        validation: { required: true, minLength: 8 },
        valid: false,
        touched: false,
      },
    },
    signUpMode: true,
  }

  checkValidity(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.isEmail) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      isValid = re.test(String(value).toLowerCase()) && isValid
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid
    }

    return isValid
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation,
        ),
        touched: true,
      },
    }
    this.setState({ controls: updatedControls })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUpMode,
    )
  }

  switchAuthMode = () => {
    this.setState((state) => ({
      signUpMode: !state.signUpMode,
    }))
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        isValid={formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
      />
    ))

    let displayForm = <Spinner />
    let errorMessage = null

    if (this.props.error) {
      errorMessage = (
        <div>
          <p style={{ color: 'darkred' }}>
            {this.props.error.message
              .replace(/-|_/, ' ')
              .toLowerCase()
              .slice(0, 1)
              .toUpperCase() +
              this.props.error.message
                .replace(/-|_/, ' ')
                .toLowerCase()
                .slice(1) +
              '!'}
          </p>
        </div>
      )
    }

    if (!this.props.loading) {
      displayForm = (
        <React.Fragment>
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">
              {this.state.signUpMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
          </form>
          <br />
          <p style={{ margin: 0, padding: 0, lineHeight: 0 }}>
            {this.state.signUpMode
              ? 'Already registered?'
              : "Don't have an account?"}
          </p>
          <Button btnType="Danger" click={this.switchAuthMode}>
            {this.state.signUpMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {this.props.error ? (
          <div className={StyleSheet.Auth}>{errorMessage}</div>
        ) : null}
        <div className={StyleSheet.Auth}>{displayForm}</div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, SignUpMode) =>
      dispatch(actionCreators.auth(email, password, SignUpMode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
