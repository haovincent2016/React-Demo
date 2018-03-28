const initialState = {
    id: '',
    username: '',
    email: '',
    avatar: ''
}
export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case 'SETINFO':
            return Object.assign({}, state, action.info)
        case 'RESETINFO':
            return initialState
        default:
            return state
    }
}