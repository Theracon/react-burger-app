import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import StyleSheet from './SideDrawer.module.css'

const sideDrawer = (props) => {
  let attachedClasses = [StyleSheet.SideDrawer, StyleSheet.Close]
  if (props.showSideDrawer) {
    attachedClasses = [StyleSheet.SideDrawer, StyleSheet.Open]
  }

  return (
    <Wrapper>
      <Backdrop show={props.showSideDrawer} click={props.close} />
      <div className={attachedClasses.join(' ')}>
        <div className={StyleSheet.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Wrapper>
  )
}

export default sideDrawer
