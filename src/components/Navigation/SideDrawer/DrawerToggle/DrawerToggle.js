import React from 'react'
import StyleSheet from './DrawerToggle.module.css'

const drawerToggle = (props) => (
  <div className={StyleSheet.DrawerToggle} onClick={props.click}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle
