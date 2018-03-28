export const setLogin = (status) => ({
  type: 'SETLOGIN',
  status
})

export const setUser = (info) => ({
  type: 'SETINFO',
  info
})

export const resetUser = (info) => ({
  type: 'RESETINFO',
  info
})