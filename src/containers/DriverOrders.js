import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'

const component = ({ history, data: { loading, driverOrders } }) => (
  <div className="modal">
    <div className="modal-content full-height">
      <div className="modal-header">
        <span className="controll-btn float-l" onClick={() => window.location = '/authorize/logout'}>
          <i className="material-icons">power_settings_new</i>
        </span>
        <div className="header-title large">My Orders</div>
      </div>
      <div className="modal-body">
        {loading ? <Loading /> :
          driverOrders.map(order => (
            <Link className="block border-bottom" to={`/driver/orders/${order.id}`} key={order.id}>
              <OrderItem order={order} />
            </Link>
          ))
        }
      </div>
    </div>
  </div>
)

export default withRouter(connect()(component))
