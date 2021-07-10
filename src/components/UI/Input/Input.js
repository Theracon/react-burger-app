import React from 'react'

import StyleSheet from './Input.module.css'

const input = (props) => {
  let inputElement = null
  let invalidClass = ''

  if (props.shouldValidate && !props.isValid && props.touched) {
    invalidClass = StyleSheet.Invalid
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={`${StyleSheet.InputElement} ${invalidClass}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={`${StyleSheet.Textarea} ${invalidClass}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'select':
      inputElement = (
        <select
          className={`${StyleSheet.InputElement} ${invalidClass}`}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((optionProp) => (
            <option key={optionProp.value} value={optionProp.value}>
              {optionProp.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={`${StyleSheet.InputElement} ${invalidClass}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
  }

  return (
    <div className={StyleSheet.Input}>
      <label className={StyleSheet.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input
