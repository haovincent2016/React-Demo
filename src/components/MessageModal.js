import React from 'react'

export default ({ header, content, onClose, ...rest }) => (
  <div {...rest}>
  	<div className="modal">
  		<div className="modal-content full-height">
  			<div className="modal-header">
  				<span onClick={onClose} className="controll-btn float-r">&times</span>
  				<div className="header-title large">{header}</div>
  			</div>
  			<div className="modal-body">
          {content}
  			</div>
  		</div>
  	</div>
  </div>
)
