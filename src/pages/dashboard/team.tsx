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
                <p>Total Referral Commission</p>
                <p>$97</p>
            </div>
            <div className="grid">
                <p>Referrals</p>
                <p>35</p>
            </div>
            <div className="grid">
                <p>Actival Referrals</p>
                <p>22</p>
            </div>
        </div>
    </div>
  )
}

export default team