import React from 'react'
import StyleSheet from './BuildControl.module.css'

const buildControl = (props) => (
  <div className={StyleSheet.BuildControl}>
    <div className={StyleSheet.Label}>{props.label}</div>
    <button
      className={StyleSheet.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={StyleSheet.More} onClick={props.added}>
      More
    </button>
  </div>
)

export default buildControl
