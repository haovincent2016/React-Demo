import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Loading from '../components/Loading'
import CarBrandSelect from "../components/CarBrandSelect"
import RegionSelect from "../components/RegionSelect"
import OnlineTime from "../components/OnlineTime"
import GenderSelect from "../components/GenderSelect"

class AdminDriver extends React.Component {

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.onStatusChanged = this.onStatusChanged.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.state = {
      status: 'OFFLINE',
    }
  }

  onStatusChanged(event) {
    this.setState({ status: event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    const { data: { driver }} = nextProps
    if (driver && driver.status !== this.state.status) {
      this.setState({ status: driver.status })
    }
  }

  renderBody() {
    const { history, match, data: { loading, driver } } = this.props

    return (
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
            <td>Gender：</td>
            <td><GenderSelect className="addressinput" defaultValue={driver.gender} disabled /></td>
          </tr>
          <tr>
            <td>Birthday：</td>
            <td>{ driver.birthday }</td>
          </tr>
          <tr>
            <td>Email：</td>
            <td>{ driver.email }</td>
          </tr>
          <tr>
            <td>Wechat ID：</td>
            <td>{ driver.wechat }</td>
          </tr>
          <tr>
            <td>Type：</td>
            <td>{ driver.registerType === 1 ? 'taxi' : 'travel' }</td>
          </tr>
          <tr>
            <td>Area：</td>
            <td><RegionSelect className="addressinput" defaultValue={driver.region} disabled /></td>
          </tr>
          <tr>
            <td>Online Time：</td>
            <td><OnlineTime className="addressinput" defaultValue={driver.availableTime} disabled /></td>
          </tr>
          <tr>
            <td>Experience：</td>
            <td>{ driver.experience }</td>
          </tr>
          <tr>
            <td>Brand：</td>
            <td><CarBrandSelect className="addressinput" defaultValue={driver.car.brand} disabled /></td>
          </tr>
          <tr>
            <td>Model：</td>
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
          <tr>
            <td>Status：</td>
            <td>
              <select className="addressinput" onChange={this.onStatusChanged} value={this.state.status}>
                <option value="ONLINE">Approved</option>
                <option value="OFFLINE">Rejected</option>
                <option value="BLACKLIST">Blacklist</option>
              </select>
      		  <button className="tinycart-button" onClick={this.onProgress}>Update</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  onClose() {
    this.props.history.push('/admin/drivers')
  }

  onProgress() {
    const { match, updateDriverStatus } = this.props

    if (window.confirm('are you sure?')) {
      updateDriverStatus(match.params.id, this.state.status)
      .catch(err => alert(err.graphQLErrors[0].message))
    }
  }

  render() {
    const { history, data: { loading, driver } } = this.props

    return (
      <div className="modal">
        <div className="modal-content full-height">
          <div className="modal-header">
            <span className="controll-btn float-l" onClick={this.onClose}>
              <i className="material-icons">keyboard_arrow_left</i>
            </span>
            <div className="header-title">Driver：{ !loading && driver.nickname }</div>
          </div>
          <div className="modal-body">
            {loading ? <Loading /> : driver && this.renderBody()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(AdminDriver))
