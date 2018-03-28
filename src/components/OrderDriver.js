import React from 'react'

export default class OrderDriver extends React.Component {
  render() {
    const { driver } = this.props

    return (
      <div className="border-bottom">
        <h3>Driver Info</h3>
        <table className="OrderList-item">
          <tbody>
            <tr>
              <td>Name：</td>
              <td>{ driver.nickname }</td>
            </tr>
            <tr>
              <td>Mobile：</td>
              <td>{ driver.mobile }</td>
            </tr>
            <tr>
              <td>Brand：</td>
              <td>{ driver.car.brand }</td>
            </tr>
            <tr>
              <td>Type：</td>
              <td>{ driver.car.modal }</td>
            </tr>
            <tr>
              <td>Plate No.：</td>
              <td>{ driver.car.plate }</td>
            </tr>
            <tr>
              <td>Capacity：</td>
              <td>{ driver.car.capacity }</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
