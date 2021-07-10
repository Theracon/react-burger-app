import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import StyleSheet from './Toolbar.module.css'

const toolbar = (props) => (
  <header className={StyleSheet.Toolbar}>
    <DrawerToggle click={props.drawerToggleClicked} />
    <div className={StyleSheet.Logo}>
      <Logo />
    </div>
    <nav className={StyleSheet.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar
