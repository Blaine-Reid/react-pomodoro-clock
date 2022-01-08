import React from 'react'
import './Timers.css'


function Timers(props) {
  return (
    <div id='timers'>
      <div id="session">
        <div id="session-collection">
          <p id="session-label">Session Time</p>
          <div id="session-length" className="glow">{props.sessionTime}</div>
          <div className="incDecBtns">
            <button id="session-increment" className="incDecBtn" title="Session Increment" onClick={props.sessionIncrement}><i className="fas fa-arrow-up"></i></button>
            <button id="session-decrement" className="incDecBtn" title="Session Decrement" onClick={props.sessionDecrement}><i className="fas fa-arrow-down"></i></button>
          </div>
        </div>
      </div>
      <div id="break">
        <div id="break-collection">
          <p id="break-label">Break Time</p>
          <div id="break-length" className="glow">{props.breakTime}</div>
          <div className="incDecBtns">
            <button id="break-increment" className="incDecBtn" title="Break Increment" onClick={props.breakIncrement}><i className="fas fa-arrow-up"></i></button>
            <button id="break-decrement" className="incDecBtn" title="Break Decrement" onClick={props.breakDecrement}><i className="fas fa-arrow-down"></i></button>
          </div>
        </div>
      </div>

    </div>

  )//end return 


}//end Timers

export default Timers