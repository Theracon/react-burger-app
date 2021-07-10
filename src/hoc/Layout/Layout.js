import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

import Wrapper from '../Wrapper/Wrapper'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import StyleSheet from './Layout.module.css'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showSideDrawer: false }
    this.closeSideDrawerHandler = this.closeSideDrawerHandler.bind(this)
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this)
  }

  closeSideDrawerHandler() {
    this.setState({
      showSideDrawer: false,
    })
  }

  sideDrawerToggleHandler() {
    this.props.toggleSidedrawer()
  }

  render() {
    return (
      <Wrapper>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          close={this.sideDrawerToggleHandler}
          showSideDrawer={this.props.showSidedrawer}
        />
        <main className={StyleSheet.Content}>{this.props.children}</main>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showSidedrawer: state.sidedrawer.showSidedrawer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidedrawer: () => dispatch(actionCreators.toggleSidedrawer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
