import React from 'react'
import classnames from 'classnames'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'

class AdminOrders extends React.Component {

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

  render() {
    const { history, data: { loading, orders } } = this.props
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
            <Link style={{ padding: '0 15px' }} className="" to="/admin/orders">Orders</Link>
            <Link style={{ padding: '0 15px' }} className="color-disable" to="/admin/drivers">Drivers</Link>
          </div>
        </div>
        <div className="modal-body">
          {(loading || refetching) ? <Loading /> :
            orders.map(order => (
              <Link className="block border-bottom" to={`/admin/orders/${order.id}`} key={order.id}>
                <OrderItem order={order} />
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  }

}

export default withRouter(connect()(AdminOrders))
