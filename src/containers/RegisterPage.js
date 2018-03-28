import React, {Component} from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import Header from '@/components/Header'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'         
import { registerUser } from '@/requests'
import { setUser, setLogin } from '@/actions'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      open: false
    }
    this.onUsernameChanged = this.onUsernameChanged.bind(this)
    this.onEmailChanged = this.onEmailChanged.bind(this)
    this.onPasswordChanged = this.onPasswordChanged.bind(this)
    this.onConfirmPasswordChanged = this.onConfirmPasswordChanged.bind(this)
    this.register = this.register.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  onUsernameChanged(event, newVal) {
    this.setState({
      username: newVal
    })
  }

  onEmailChanged(event, newVal) {
    this.setState({
      email: newVal
    })
  }

  onPasswordChanged(event, newVal) {
    this.setState({
      password: newVal
    })
  }

  onConfirmPasswordChanged(event, newVal) {
    this.setState({
      confirmPassword: newVal
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }


  async register() {
    const { history, dispatch } = this.props
    const { username, email, password, confirmPassword } = this.state
    if(this.state.email === '' || this.state.username === '' || this.state.password === '' || this.state.confirmPassword === '') {
      this.setState({
        error: 'please fill in all fields',
        open: true
      })
      return
    }
    if (confirmPassword !== password) {
      this.setState({
        error: 'you have entered two different passwords',
        open: true
      })
      return
    }
    try {
      const res = await registerUser({ username, email, password })
      if(res.data.error) {
        this.setState({ error: res.data.error })
      } else {
        const info = { id: res.data.id, username: res.data.username, email: res.data.email, avatar: res.data.avatar }
        dispatch(setUser(info))
        dispatch(setLogin('login'))
        history.push('/')
      }
    } catch(err) {
        console.log(err)
    }
  } 

  renderBody() {
    return (
      <div className='wrapper'>
        <TextField
          floatingLabelText="Username"
          onChange={this.onUsernameChanged}
          value={this.state.username}
          type="text"
        /><br />
        <TextField
          floatingLabelText="Email"
          onChange={this.onEmailChanged}
          value={this.state.email}
          type="email"
        /><br />
        <TextField
          floatingLabelText="Password"
          onChange={this.onPasswordChanged}
          value={this.state.password}
          type="password"
        /><br />
        <TextField
          floatingLabelText="Confirm Password"
          onChange={this.onConfirmPasswordChanged}
          value={this.state.confirmPassword}
          type="password"
        /><br />
        <div className="btn-register">
          <RaisedButton onClick={this.register} label="Register" />
        </div>
        <Snackbar open={this.state.open} 
          message={this.state.error} 
          autoHideDuration={3000} 
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

  render () {
    return (
      <div>
        <Header type="login"></Header>
        {this.renderBody()}
      </div>
    )
  }
}

export default withRouter(connect()(RegisterPage))