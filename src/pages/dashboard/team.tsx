import React from 'react'
import {BsFillFilePersonFill} from 'react-icons/bs'

function team() {
  return (
    <div>
        <h1>My Team</h1>
        <div className="grid">
            <BsFillFilePersonFill/>

            <div className="grid">
                <h3>Upline: <span>Tester1</span></h3>
            </div>
        </div>
        <div className="grid">
            <div className="grid">
                <p>Total</p>
            </div>
        </div>
    </div>
  )
}

export default team