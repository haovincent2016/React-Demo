import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

/* another way to use dispatch */
const mapStateToProps = state => {
  return {
    isLogin: state.loginState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: (status) => {
      dispatch({ type: 'SETLOGIN', status: status })
    },
    resetUser: () => {
      dispatch({ type: 'RESETINFO' })
    }
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.onLoginClicked = this.onLoginClicked.bind(this)
    this.onRegisterClicked = this.onRegisterClicked.bind(this)
  }

  onRegisterClicked() {
    const { history } = this.props
    history.push('/auth/register') 
  }

  onLoginClicked() {
    const { history } = this.props
    history.push('/auth/login')
  }

  render () {
    let content = null
    const { type, isLogin } = this.props
    if(type === 'register'){
      return (
        <div className="header-wrapper">
          <div className="logo">
            <a href="/">Logo</a>
          </div>
          <div className="navigation">
            <RaisedButton onClick={this.onRegisterClicked} label="Register" />
          </div>
        </div>
      )
    }
    if(type === 'login'){
      return (
        <div className="header-wrapper">
          <div className="logo">
            <a href="/">Logo</a>
          </div>
          <div className="navigation">
            <RaisedButton onClick={this.onLoginClicked} label="Login" />
          </div>
        </div>
      )
    }
  }
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(Header))
