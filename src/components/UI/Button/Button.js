import React from 'react'
import StyleSheet from './Button.module.css'

const button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.click}
    className={[StyleSheet.Button, StyleSheet[props.btnType]].join(' ')}
  >
    {props.children}
  </button>
)

export default button
