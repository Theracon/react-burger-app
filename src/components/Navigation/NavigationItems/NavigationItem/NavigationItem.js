import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as actionCreators from '../../../../store/actions/index'
import StyleSheet from './NavigationItem.module.css'

class navigationItem extends React.Component {
  toggleSidedrawerHandler = () => {
    this.props.toggleSidedrawer()
  }

  render() {
    return (
      <li
        className={StyleSheet.NavigationItem}
        onClick={this.toggleSidedrawerHandler}
      >
        <NavLink to={this.props.link} activeClassName={StyleSheet.active} exact>
          {this.props.children}
        </NavLink>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidedrawer: () => dispatch(actionCreators.toggleSidedrawer()),
  }
}

export default connect(null, mapDispatchToProps)(navigationItem)
