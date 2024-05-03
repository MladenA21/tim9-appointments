import React from 'react'

import logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className='container w-50 mx-auto'>
      <div className='w-75 mx-auto' style={{ fontFamily: "Madimi One", color: "#6c596e", fontSize: "6rem" }}>
        <img className='mx-3' src={logo} alt="logo" style={{ width: "100px" }} />
        Reserfivy
      </div>
    </div>
  )
}

export default Header
