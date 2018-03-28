import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'
import OrderDriver from '../components/OrderDriver'

class UserOrder extends React.Component {

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  renderBody() {
    const { history, match, data: { loading, order } } = this.props
    const isPending = order.status === 'PENDING'

    return (
      <div>
        { order.driver ?  <OrderDriver className="border-bottom" driver={order.driver} />  : (isPending && <Loading />) }
        <h3>User Info</h3>
        <OrderItem order={order} />
  			{ isPending &&
          <div className="row-submit">
            <button className="placeorder" onClick={this.onCancel}>cancel order</button>
    			</div>
        }
      </div>
    )
  }

  onClose() {
    this.props.history.push('/orders')
  }

  onCancel() {
    const { match, updateOrderStatus } = this.props

    if (window.confirm('are you sure to cancel this order?')) {
      updateOrderStatus(match.params.id, 'CANCELED')
      .catch(err => alert(err.graphQLErrors[0].message))
    }
  }

  render() {
    const { history, match, data: { loading, order } } = this.props

    return (
      <div className="modal">
        <div className="modal-content full-height">
          <div className="modal-header">
            <span className="controll-btn float-l" onClick={this.onClose}>
              <i className="material-icons">keyboard_arrow_left</i>
            </span>
            <div className="header-title">order id：{ match.params.id }</div>
          </div>
          <div className="modal-body">
            {loading ? <Loading /> : order && this.renderBody()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(UserOrder))
