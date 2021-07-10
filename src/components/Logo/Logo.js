import React from 'react'
import StyleSheet from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = (props) => (
  <div className={StyleSheet.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="Burger Maker Logo" />
  </div>
)

export default logo
