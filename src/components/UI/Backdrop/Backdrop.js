import React from 'react'
import StyleSheet from './Backdrop.module.css'

const backdrop = (props) =>
  props.show ? (
    <div className={StyleSheet.Backdrop} onClick={props.click}></div>
  ) : null

export default backdrop
