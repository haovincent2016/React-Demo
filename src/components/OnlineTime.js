import React from 'react'

export default (props) => (
  <select {...props}>
    <option value="1">08:00 - 10:00</option>
    <option value="2">10:00 - 12:00</option>
    <option value="3">12:00 - 14:00</option>
    <option value="4">14:00 - 16:00</option>
    <option value="5">16:00 - 18:00</option>
    <option value="6">18:00 - 20:00</option>
    <option value="7">20:00 - 22:00</option>
    <option value="8">22:00 - 24:00</option>
    <option value="9">12:00am - 03:00am</option>
    <option value="10">All day</option>
  </select>
)
