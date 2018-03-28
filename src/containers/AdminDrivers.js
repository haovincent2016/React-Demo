import React from 'react'
import classnames from 'classnames'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'

class AdminDrivers extends React.Component {

  constructor(props) {
    super(props)
    this.onRefetch = this.onRefetch.bind(this)
    this.state = {
      refetching: false,
    }
  }

  onRefetch() {
    this.setState({ refetching: true })
    this.props.data.refetch()
    setTimeout(() => {
      this.setState({ refetching: false })
    }, 1000)
  }

  statusToString(status) {
    switch (status) {
      case 'ONLINE':
        return 'Approved'
      case 'OFFLINE':
        return 'Rejected'
      case 'BLACKLIST':
        return 'Blacklist'
    }
  }

  render() {
    const { history, data: { loading, drivers } } = this.props
    const { refetching } = this.state

    return <div className="modal">
      <div className="modal-content full-height">
        <div className="modal-header">
          <span className="controll-btn float-l" onClick={() => window.location = '/authorize/logout'}>
            <i className="material-icons">power_settings_new</i>
          </span>
          { !loading &&
            <span className={classnames("controll-btn float-r", { spinning: refetching })} onClick={this.onRefetch}>
              <i className="material-icons">refresh</i>
            </span>
          }
          <div className="header-title large">
            <Link style={{ padding: '0 15px' }} className="color-disable" to="/admin/orders">Order</Link>
            <Link style={{ padding: '0 15px' }} className="" to="/admin/drivers">Driver</Link>
          </div>
        </div>
        <div className="modal-body">
          {(loading || refetching) ? <Loading /> :
            drivers.map(driver => (
              <Link className="block border-bottom" to={`/admin/drivers/${driver.id}`} key={driver.id}>
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
                    <td>Status：</td>
                    <td><b>{ this.statusToString(driver.status) }</b></td>
                  </tr>
                </tbody>
              </table>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  }

}

export default withRouter(connect()(AdminDrivers))
