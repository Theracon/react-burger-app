import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import StyleSheet from './NavigationItems.module.css'

const navigationItems = (props) => (
  <ul className={StyleSheet.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Signup/Login</NavigationItem>
  </ul>
)

export default navigationItems
