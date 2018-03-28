import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withProps } from "recompose"
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  DirectionsRenderer,
} from "react-google-maps"
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import Navigation from '@/components/Navigation'
import AddressInput from '@/components/AddressInput'
import AddressModal from '@/components/AddressModal'
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { logoutUser } from '@/requests'
import FontIcon from 'material-ui/FontIcon'
import { setLogin, resetUser } from '@/actions'

const mapStateToProps = state => {
  return {
    isLogin: state.loginState
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA88ghj7UuFc7SGr64Hotd-zYJQDihvnlE&libraries=places",
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withRouter,
  connect(mapStateToProps),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        open: false,
        onOpenStateChanged: (open) => {
          this.setState({ open: open })
        },
        openDrawer: () => {
          this.setState({ open: true })
        },
        checkOrders: () => {
          const { history } = this.props
          history.push('/orders')
          this.setState({ open: false })
        },
        logout: () => {
          const { dispatch } = this.props
          dispatch(setLogin('logout'))
          dispatch(resetUser())
          this.setState({ open: false })
          logoutUser()
        },
        signin: () => {
          const { history } = this.props
          history.push('/auth/login')
          this.setState({ open: false })
        },

        center: { lat : 49.181215, lng : -123.018513 },
        showPassenger: false,
  		  passenger: 1,
      	togglePassenger: () => this.setState({ showPassenger: !this.state.showPassenger }),
        onPassengerChanged: (passenger) => {
          this.setState({ passenger, showPassenger: false })
        },
        startTimeLabel: 'now',
        showStartTime: false,
      	toggleStartTime: (isReset) => {
          if(isReset === true) {
            this.setState({ startTimeLabel: 'now' })
          } 
          this.setState({ showStartTime: !this.state.showStartTime })
        },
        onStartTimeChanged: () => {
          const { bookDate, bookHour, bookMinute } = refs
          this.setState({
            showStartTime: false,
            startTimeLabel: `${bookDate.value} ${bookHour.value}:${bookMinute.value}`,
          })
        },
        showAddressModal: false,
        //start address modal
        addressModalType: 'start',
        startAddressLabel: 'start address',
        startAddressPos: null,
        //target address modal
        endAddressLabel: 'target address',
        endAddressPos: null,
        distance: null,
        totalCost: null,
        mobileNumber: null,
        //check before submit order
        canSubmit: () => {
          const {
            passenger,
            mobileNumber,
            startAddressPos,
            endAddressPos,
            distance,
            totalCost,
          } = this.state
          return !(!passenger || !startAddressPos || !endAddressPos || !distance || !totalCost || !mobileNumber || mobileNumber.length < 10)
        },
        //submit order
        onSubmit: () => {
          const { history, createOrder } = this.props
          const {
            passenger,
            mobileNumber,
            startTimeLabel,
            startAddressLabel,
            startAddressPos,
            endAddressLabel,
            endAddressPos,
            distance,
            totalCost,
            canSubmit,
          } = this.state
          //if user not fill all form fields
          if (!canSubmit()) {
            return alert('please enter all infos')
          }

          const startTime = startTimeLabel === 'now'? null : new Date(startTimeLabel).getTime()
          const startLocation = {
            type: 'Point',
            text: startAddressLabel,
            coordinates: [startAddressPos.lng, startAddressPos.lat],
          }
          const endLocation = {
            type: 'Point',
            text: endAddressLabel,
            coordinates: [endAddressPos.lng, endAddressPos.lat],
          }
          //post order form
          /*
          createOrder({
            passenger,
            mobileNumber,
            startTime,
            startLocation,
            endLocation,
            totalCost,
            distance,
          }).then((res) => {
            if (!res.errors) {
              history.push(`/orders/${res.data.createOrder.id}`)
            } else {
              alert(JSON.stringify(res.errors))
            }
          })
          */
        },
        //track user current location
      	setCurrentLocation: () => {
      		if (navigator.geolocation) {
      			navigator.geolocation.getCurrentPosition((position) => {
      				const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
              const geocoder = new google.maps.Geocoder()
      				geocoder.geocode({
      					'latLng' : latLng
      				}, (result, status) => {
      					if (status == google.maps.GeocoderStatus.OK) {
      						if (result[0]) {
      							const currentAddress = result[0].formatted_address
      							const geometry = result[0].geometry
                    const center = { lat: geometry.location.lat(), lng: geometry.location.lng() }
                    this.setState({
                      center,
                      startAddressLabel: currentAddress,
                      startAddressPos: center,
                    })
                    //this.state.googleRoute()
      						}
      					} else {
      						alert("failed to track address:"+status)
      					}
      				})
      			}, () => {
      				alert("please open GPS and retry")
      			})
      		} else {
      			alert("please allow app to track your address")
      		}
        },
        //calculate fees
        calculateFees: (distance) => {
          const base_money = 5
          return Math.round(base_money + Math.max(0, distance/1000 - 3) * 2)
        },
        //get directions between starting and end address
        googleRoute: () => {
          const {
            startAddressLabel,
            endAddressLabel,
            calculateFees,
          } = this.state
          if (startAddressLabel.length <= 3 || endAddressLabel.length <= 3) {
            return
          }

          const directionsService = new google.maps.DirectionsService()
          directionsService.route({
            origin: startAddressLabel,
            destination: endAddressLabel,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              })
            } else {
              alert(`failed to fetch directions ${result}`)
            }
          })

          const distanceService = new google.maps.DistanceMatrixService()
          distanceService.getDistanceMatrix({
            origins: [startAddressLabel],
            destinations: [endAddressLabel],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, (response, status) => {
            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
              const distance = response.rows[0].elements[0].distance.value
              this.setState({
                distance,
                totalCost: calculateFees(distance),
              })
            } else {
              alert("sorry, no route info found")
            }
          })

        },
        //convert real address to LatLng, then get directionss+distance
        onAddressInputEnter: (address) => {
          const { addressModalType, googleRoute } = this.state

          const geocoder = new google.maps.Geocoder()
      		geocoder.geocode({ address }, (result, status) => {
      			if (status === google.maps.GeocoderStatus.OK) {
      				const center = {
      					lat : result[0].geometry.location.lat(),
      					lng : result[0].geometry.location.lng()
      				}
              const address = result[0].formatted_address

              if (addressModalType === 'start') {
                this.setState({
                  center,
                  showAddressModal: false,
                  startAddressLabel: address,
                  startAddressPos: center,
                })
              } else {
                this.setState({
                  center,
                  showAddressModal: false,
                  endAddressLabel: address,
                  endAddressPos: center,
                })
              }
              googleRoute()
            } else {
              alert("invalid address")
            }
          })
        },
        //open address input modal
        onAddressInputOpen: (addressModalType) => {
          this.setState({
            addressModalType: addressModalType,
            showAddressModal: true
          })
        },
        onmobileNumberChange: (event) => this.setState({ mobileNumber: event.target.value }),
        onAddressInputClose: () => this.setState({ showAddressModal: false }),
        onMapMounted: ref => refs.map = ref,
        onBookDateMounted: ref => refs.bookDate = ref,
        onBookHourMounted: ref => refs.bookHour = ref,
        onBookMinuteMounted: ref => refs.bookMinute = ref,
      })
    }
  })
)(props => {
  let dateNow = new Date()
  let now = dateFormat(dateNow, 'mm dd yyyy').split(' ')
  let content = null
  if(props.isLogin === 'login') {
    content = (
      <Drawer docked={false}
        width={190}
        open={props.open}
        onRequestChange={(open) => props.onOpenStateChanged(open)}
      >
        <MenuItem style={{marginTop: '20px', padding: '0px'}} onClick={props.checkOrders} leftIcon={<FontIcon className="material-icons" style={{color: '#ddd'}}>find_in_page</FontIcon>}>My Orders</MenuItem>
        <MenuItem style={{padding: '0px'}} onClick={props.logout} leftIcon={<FontIcon className="material-icons" style={{color: '#ddd'}}>settings</FontIcon>}>Logout</MenuItem>
      </Drawer>
    )
  } else {
    content = (
      <Drawer docked={false}
        width={190}
        open={props.open}
        onRequestChange={(open) => props.onOpenStateChanged(open)}
        style={{textAlign: 'center'}}
      >
        <RaisedButton style={{marginTop: '20px'}} onClick={props.signin} label="Login" />
      </Drawer>
    )
  }
  return <GoogleMap
    ref={props.onMapMounted}
    center={props.center}
    defaultOptions={{
  		center: {
  			lat : 49.181215,
  			lng : -123.018513
      },
  		scrollwheel: false,
  		zoom: 11,
  		gestureHandling: "greedy",
  		zoomControl: true,
  		mapTypeControl: false,
  		zoomControlOptions : {
  			position : google.maps.ControlPosition.RIGHT_TOP
  		}
    }}
  >
    <Navigation onRightIconClick={() => props.setCurrentLocation()} onLeftIconClick={() => props.openDrawer()} />
		{content}
    <div className="form">
      { props.showStartTime &&
  			<div className="row-bg">
          <select className="select-control" ref={props.onBookDateMounted} defaultValue={`${now[0]}-${now[1]}-${now[2]}`}>
            { [...Array(20)].map((n, i) => {
                if (i > 0) {
                  dateNow.setDate(dateNow.getDate() + 1)
                  now = dateFormat(dateNow, 'mm dd yyyy hh MM').split(' ')
                }
                return (
                  <option value={`${now[0]}-${now[1]}-${now[2]}`} key={'bookday'+i}>{`${now[1]}-${now[2]}`}</option>
                )
              })
            }
          </select>
          <select className="select-control" ref={props.onBookHourMounted} defaultValue={0}>
            { [...Array(24)].map((n, i) =>
                <option value={i} key={'booktime'+i}>{i}</option>)
            }
          </select>
          <select className="select-control" ref={props.onBookMinuteMounted} defaultValue="45">
            <option value="00">00m</option>
            <option value="15">15m</option>
            <option value="30">30m</option>
            <option value="45">45m</option>
          </select>
          <button className="buttoncancel" onClick={() => props.toggleStartTime(true)}>close</button>
          <button className="buttonconfirm" onClick={props.onStartTimeChanged}>ok</button>
  			</div>
      }
      { props.showPassenger &&
  			<div className="row-bg" id="passenger">
  				<table>
            <tbody>
    					<tr>
    						<td>Passengers：</td>
                { [...Array(7)].map((n, i) =>
      						<td className="cell-item" key={'passenger-' + (i+1)} onClick={() => props.onPassengerChanged(i+1)}>{ i+1 }</td>
                )}
    					</tr>
            </tbody>
  				</table>
  			</div>
      }
			<div className="row-trans" id="detail">
				<table>
          <tbody>
  					<tr>
  						<td>
  							<div className="row-option">$ <span>{ props.totalCost }</span></div>
  						</td>
  						<td>
  							<div className="row-option" onClick={props.togglePassenger}><span>{ props.passenger }</span>people</div>
  						</td>
  						<td>
  							<div className="row-option" onClick={props.toggleStartTime}>{ props.startTimeLabel }</div>
  						</td>
  					</tr>
          </tbody>
				</table>
			</div>
			<div className="row-trans">
  			<input type="number" className="phoneinput full-width" placeholder="please enter your phone" pattern="[0-9]{10,14}" required onChange={props.onmobileNumberChange} />
      </div>
      <AddressInput onClick={() => props.onAddressInputOpen('start')} label={props.startAddressLabel} className="row" iconSrc="/static/image/pin1ss.png" />
      <AddressInput onClick={() => props.onAddressInputOpen('end')} label={props.endAddressLabel} className="row" iconSrc="/static/image/pin2ss.png" />
      { props.showAddressModal && <AddressModal onEnter={(value) => props.onAddressInputEnter(value)} onClose={props.onAddressInputClose} /> }
      { props.startAddressPos && <Marker position={props.startAddressPos} icon="/static/image/pin1ss.png" /> }
      { props.endAddressPos && <Marker position={props.endAddressPos} icon="/static/image/pin2ss.png" /> }
			<div className="row-submit">
				<button className="placeorder" disabled={!props.canSubmit()} onClick={props.onSubmit}>confirm</button>
			</div>
		</div>
    {props.directions && <DirectionsRenderer options={{ suppressMarkers: true, preserveViewport: false }} directions={props.directions} />}
  </GoogleMap>
})

