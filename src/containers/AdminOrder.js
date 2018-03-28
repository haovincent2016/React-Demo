import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'
import OrderDriver from '../components/OrderDriver'

class AdminOrder extends React.Component {

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onProgress = this.onProgress.bind(this)
  }

  renderBody() {
    const { history, match, data: { loading, order } } = this.props
    const isPending = order.status === 'PENDING'
    const canProgress = isPending || order.status === 'INPROGRESS' 

    return (
      <div>
        { order.driver ?  <OrderDriver className="border-bottom" driver={order.driver} />  : (isPending && <Loading />) }
        <h3>User Info</h3>
        <OrderItem order={order} />
        {canProgress &&
          <div className="row-submit">
    				<input className="addressinput" ref="mobileinput" placeholder="Driver mobile number" />
    				<button className="addressbutton" onClick={this.onProgress}>Assign Order</button>
    			</div>
        }
      </div>
    )
  }

  onClose() {
    this.props.history.push('/admin/orders')
  }

  onProgress() {
    const { match, progressOrder } = this.props

    if (window.confirm('Assign Order?')) {
      progressOrder(match.params.id, this.refs.mobileinput.value)
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

export default withRouter(connect()(AdminOrder))