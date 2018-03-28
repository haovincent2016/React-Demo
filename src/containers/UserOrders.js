import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'

const UserOrders = ({ history, data: { loading, userOrders } }) => (
  <div className="modal">
    <div className="modal-content full-height">
      <div className="modal-header">
        <span className="controll-btn float-l" onClick={() => window.location = '/authorize/logout'}>
          <i className="material-icons">power_settings_new</i>
        </span>
        <span className="controll-btn float-r" onClick={() => history.push('/')}>
          <i className="material-icons">close</i>
        </span>
        <div className="header-title large">My Orders</div>
      </div>
      <div className="modal-body">
        {loading ? <Loading /> :
          userOrders.map(order => (
            <Link className="block border-bottom" to={`/orders/${order.id}`} key={order.id}>
              <OrderItem order={order} />
            </Link>
          ))
        }
      </div>
    </div>
  </div>
)

export default withRouter(connect()(UserOrders))