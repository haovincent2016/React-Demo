import React from 'react'
import styles from '@/assets/map.css'
export default ({ label, iconSrc, onClick }) => (
  <div className="row-bg" onClick={onClick}>
    <img className="marker" src={iconSrc} />
    <div className="content addresstext">{ label }</div>
  </div>
)
