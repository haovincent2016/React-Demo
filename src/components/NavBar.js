import React from 'react'

export default ({ onLeftIconClick, onRightIconClick }) => (
  <div className="header-top">
    <div className="header-title large"></div>
    <div className="is-left" onClick={onLeftIconClick}>
      <i className="material-icons">menu</i>
    </div>
    <div className="is-right" onClick={onRightIconClick}>
      <i className="material-icons">locate</i>
    </div>
  </div>
)
