import React from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Asterisk from "../components/Asterisk"
import CarBrandSelect from "../components/CarBrandSelect"
import RegionSelect from "../components/RegionSelect"
import AvailableTimeSelect from "../components/OnlineTime"
import GenderSelect from "../components/GenderSelect"

const NewDriver = compose(
  withProps({
    type: "SEDAN",
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        nickname: '',
        gender: 1,
        birthday: '',
        mobile: '',
        email: '',
        wechat: '',
        registerType: 1,
        region: 1,
        availableTime: 1,
        experience: '',
        capacity: 1,
        brand: 'ACURA',
        modal: '',
        plate: '',
        success: false,
        onNicknameChanged: (event) => this.setState({ nickname: event.target.value }),
        onGenderChanged: (event) => this.setState({ gender: event.target.value }),
        onBirthdayChanged: (event) => this.setState({ birthday: event.target.value }),
        onMobileChanged: (event) => this.setState({ mobile: event.target.value }),
        onEmailChanged: (event) => this.setState({ email: event.target.value }),
        onWechatChanged: (event) => this.setState({ wechat: event.target.value }),
        onRegisterTypeChanged: (event) => this.setState({ registerType: event.target.value }),
        onRegionChanged: (event) => this.setState({ region: event.target.value }),
        onAvailableTimeChanged: (event) => this.setState({ availableTime: event.target.value }),
        onExperienceChanged: (event) => this.setState({ experience: event.target.value }),

        onCarCapacityChanged: (event) => this.setState({ capacity: event.target.value }),
        onCarBrandChanged: (event) => this.setState({ brand: event.target.value }),
        onCarModalChanged: (event) => this.setState({ modal: event.target.value }),
        onCarPlateChanged: (event) => this.setState({ plate: event.target.value }),
        canSubmit: () => {
          const {
            nickname,
            gender,
            birthday,
            mobile,
            email,
            wechat,
            registerType,
            region,
            availableTime,
            capacity,
            brand,
            modal,
            plate,
          } = this.state

          return !(!nickname || !gender || !birthday || !mobile || !email || !wechat || !registerType || !region
            || !availableTime || !capacity || !brand || !modal || !plate)
        },
        onSubmit: () => {
          const { history, createDriver } = this.props
          const {
            nickname,
            gender,
            birthday,
            mobile,
            email,
            wechat,
            registerType,
            region,
            availableTime,
            experience,
            capacity,
            brand,
            modal,
            plate,
            canSubmit,
          } = this.state
          if (!canSubmit()) {
            alert('please submit all infos')
            return
          }

          createDriver({
            nickname,
            gender,
            birthday,
            mobile,
            email,
            wechat,
            registerType,
            region,
            availableTime,
            experience,
            car : {
              capacity,
              brand,
              modal,
              plate,
            },
          }).then((res) => {
            if (!res.errors) {
              this.setState({ success: true })
            } else {
              alert(JSON.stringify(res.errors))
            }
          })
        },
      })
    },
    componentWillReceiveProps({ nickname, gender, data: { loading, currentUser }}) {
      if (!loading && !nickname && currentUser && currentUser.nickname) {
        this.setState({ nickname: currentUser.nickname, gender: currentUser.gender })
      }
    },
  })
)(props =>
	<div className="modal">
		<div className="modal-content full-height">
			<div className="modal-header">
				<div className="header-title large">Driver Application</div>
			</div>
			<div className="modal-body">
        { props.success ?
          (<div>
             <h1>Success</h1>
             <Link to="/driver/orders" className="tinycart-button float-r full-width">check orders</Link>
           </div>
          ) :
          (<div>
            <h4>Basic Requirements</h4>
            <ul className="text-left">
              <li>Have a clean, comfortable vehicle, no order than 2010</li>
              <li>Have BC province class 5 driver license</li>
            </ul>
            <h4>Driver Info</h4>
            <table className="text-left">
              <tbody>
                <tr>
                  <td>Name<Asterisk /></td>
                  <td>
                    <input type="text" className="addressinput full-width" pattern=".{1,30}" required placeholder="Name" onChange={props.onNicknameChanged}
                      value={props.nickname} />
                  </td>
                </tr>
                <tr>
                  <td>Gender<Asterisk /></td>
                  <td>
                    <GenderSelect className="addressinput full-width" onChange={props.onGenderChanged} value={props.gender} />
                  </td>
                </tr>
                <tr>
                  <td>Birthday<Asterisk /></td>
                  <td><input type="date" className="addressinput full-width" required placeholder="Birthday" onChange={props.onBirthdayChanged} value={props.birthday} /></td>
                </tr>
                <tr>
                  <td>Mobile<Asterisk /></td>
                  <td><input type="text" className="addressinput full-width" pattern="[0-9]{10,14}" required placeholder="Mobile" onChange={props.onMobileChanged} value={props.mobile} /></td>
                </tr>
                <tr>
                  <td>Email<Asterisk /></td>
                  <td><input type="email" className="addressinput full-width" required placeholder="Email" onChange={props.onEmailChanged} value={props.email} /></td>
                </tr>
                <tr>
                  <td>Wechat ID<Asterisk /></td>
                  <td><input type="text" className="addressinput full-width" pattern=".{1,30}" required placeholder="Wechat ID" onChange={props.onWechatChanged} value={props.wechat} /></td>
                </tr>
                <tr>
                  <td>Application type<Asterisk /></td>
                  <td>
                    <select className="addressinput full-width" onChange={props.onRegisterTypeChanged} value={props.registerType}>
                      <option value="taxi">taxi</option>
                      <option value="travel">travel</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Area<Asterisk /></td>
                  <td>
                    <RegionSelect className="addressinput full-width" onChange={props.onRegionChanged} value={props.region}/>
                  </td>
                </tr>
                <tr>
                  <td>Online Time<Asterisk /></td>
                  <td>
                    <AvailableTimeSelect className="addressinput full-width" onChange={props.onAvailableTimeChanged} value={props.availableTime} />
                  </td>
                </tr>
                <tr>
                  <td>Experience</td>
                  <td><textarea rows="5" className="addressinput full-width" pattern=".{1,10240}" required placeholder="Experience" onChange={props.onExperienceChanged} value={props.experience} /></td>
                </tr>
              </tbody>
            </table>
            <h4>Car Info</h4>
            <table className="text-left">
              <tbody>
                <tr>
                  <td>Capacity<Asterisk /></td>
                  <td>
                    <input type="number" className="addressinput full-width" required min="1" max="99" onChange={props.onCarCapacityChanged} value={props.capacity} />
                  </td>
                </tr>
                <tr>
                  <td>Brand<Asterisk /></td>
                  <td>
                    <CarBrandSelect className="addressinput full-width"  onChange={props.onCarBrandChanged} value={props.brand} />
                  </td>
                </tr>
                <tr>
                  <td>Model<Asterisk /></td>
                  <td><input type="text" className="addressinput full-width" pattern=".{1,30}" required placeholder="Model" onChange={props.onCarModalChanged} value={props.modal} /></td>
                </tr>
                <tr>
                  <td>Plate No.<Asterisk /></td>
                  <td><input type="text" className="addressinput full-width" pattern=".{1,30}" required placeholder="Plate No." onChange={props.onCarPlateChanged} value={props.plate} /></td>
                </tr>
              </tbody>
            </table>
      		<div className="row-submit">
              <button className="placeorder" onClick={props.onSubmit}>Submit</button>
      		</div>
    	</div>
        )}
			</div>
		</div>
	</div>
)

export default withRouter(connect()(NewDriver))