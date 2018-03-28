export default function loginState(state = 'logout', action) {
    switch (action.type) {
      case 'SETLOGIN':
        return action.status
      default:
        return state
      }
  }
  