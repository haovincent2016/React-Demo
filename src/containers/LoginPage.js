import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Header from '@/components/Header'
import { loginUser } from '@/requests' 
import { setUser, setLogin } from '@/actions'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      open: false
    }
    this.onEmailChanged = this.onEmailChanged.bind(this)
    this.onPasswordChanged = this.onPasswordChanged.bind(this)
    this.login = this.login.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
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
  
  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  async login() {
    const { email, password } = this.state
    const { history, dispatch } = this.props
    if(this.state.email === '' || this.state.password === '') {
      this.setState({ error: 'please fill in all fields', open: true })
      return
    }
    try {
      const res = await loginUser({ email, password })
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
        <div className="btn-login">
          <RaisedButton onClick={this.login} label="Login" />
        </div>
        <Snackbar open={this.state.open} 
          message={this.state.error} 
          autoHideDuration={3000} 
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header type="register"></Header>
        {this.renderBody()}
      </div>
    )
  }
}

export default withRouter(connect()(LoginPage))