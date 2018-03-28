import React from 'react'
export default class AddressModal extends React.Component {

  /*static defaultProps = {
    onEnter: () => {},
    onClose: () => {},
  }*/

  _onEnter() {
    const { onEnter } = this.props
    onEnter(this.refs.addressinput.value)
  }

  componentDidMount() {
    const options = {
      types : [ 'geocode' ],
      componentRestrictions : {
        country : 'ca'
      }
    }

		const autocomplete = new google.maps.places.Autocomplete(this.refs.addressinput, options)
		autocomplete.addListener('place_changed', () => this._onEnter())
  }

  render() {
    const { onClose, onEnter } = this.props

    return (
      	<div className="address-modal">
      		<div className="address-modal-content">
            <div className="address-modal-header">
      				<span onClick={onClose} className="controll-btn float-r">&times;</span>
      				<div className="header-title large">Please enter address</div>
      			</div>
      			<div className="address-modal-body">
      				<input className="addressinput" ref="addressinput" placeholder="Please enter address" />
      				<button className="addressbutton" onClick={(e) => this._onEnter(e)}>confirm</button>
      			</div>
      		</div>
      	</div>
    )
  }
}
