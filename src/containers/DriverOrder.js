import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'
import OrderDriver from '../components/OrderDriver'

class DriverOrder extends React.Component {

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onComplete = this.onComplete.bind(this)
  }

  renderBody() {
    const { history, match, data: { loading, order } } = this.props
    const isInProgress = order.status === 'INPROGRESS'

    return (
      <div>
        { order.driver && <OrderDriver className="border-bottom" driver={order.driver} />}
        <h3>User Info</h3>
        <OrderItem order={order} />
  			{ isInProgress &&
          <div className="row-submit">
            <button className="placeorder" onClick={this.onComplete}>complete order</button>
    			</div>
        }
      </div>
    )
  }

  onClose() {
    this.props.history.push('/driver/orders')
  }

  onComplete() {
    const { match, updateOrderStatus } = this.props

    if (window.confirm('have you completed order?')) {
      updateOrderStatus(match.params.id, 'COMPLETED')
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
            <div className="header-title">Order ID：{ match.params.id }</div>
          </div>
          <div className="modal-body">
            {loading ? <Loading /> : order && this.renderBody()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(DriverOrder))
