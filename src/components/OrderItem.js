import React from 'react'
import dateFormat from 'dateformat'

export default class OrderItem extends React.Component {

  statusToString(status) {
    switch (status) {
      case 'PENDING':
        return 'waiting for driver'
      case 'INPROGRESS':
        return 'in progress'
      case 'COMPLETED':
        return 'completed'
      case 'CANCELED':
        return 'user canceled order'
    }
  }

  toKm(meter) {
    return (meter / 1000).toFixed(1)
  }

  render() {
    const { order } = this.props

    return (
      <table className="OrderList-item">
        <tbody>
          <tr>
            <td>Order ID：</td>
            <td>{ order.id }</td>
          </tr>
          <tr>
            <td>Setup Time：</td>
            <td>{ dateFormat(order.createdAt, 'yyyy-mm-dd hh:MM') }</td>
          </tr>
          <tr>
            <td>Starting Time：</td>
            <td>{ dateFormat(order.startTime, 'yyyy-mm-dd hh:MM') }</td>
          </tr>
          <tr>
            <td><img className="image-icon" src="/static/image/start_location.png" /></td>
            <td>{ order.startLocation.text }</td>
          </tr>
          <tr>
            <td><img className="image-icon" src="/static/image/end_location.png" /></td>
            <td>{ order.endLocation.text }</td>
          </tr>
          <tr>
            <td>Passengers：</td>
            <td>{ order.passenger }</td>
          </tr>
          <tr>
            <td>Mobile：</td>
            <td>{ order.mobile }</td>
          </tr>
          <tr>
            <td>Price：</td>
            <td><font color="red"><b>${ order.totalCost }</b></font></td>
          </tr>
          <tr>
            <td>Distance：</td>
            <td>{ this.toKm(order.distance) } km</td>
          </tr>
          <tr>
            <td>Status：</td>
            <td><b>{ this.statusToString(order.status) }</b></td>
          </tr>
        </tbody>
      </table>
    )
  }
}
