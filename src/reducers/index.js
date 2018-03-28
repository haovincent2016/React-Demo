import { combineReducers } from 'redux'

import loginState from './loginState'
import userInfo from './userInfo'

const reducers = combineReducers({
  loginState,
  userInfo
})

export default reducers
