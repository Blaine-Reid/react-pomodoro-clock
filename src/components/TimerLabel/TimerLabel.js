import React from 'react'
import './TimerLabel.css'


function TimerLabel(props) {
  return (
    <div id="timer-label-bar">
      <div id="timer-label" className="glow">
        {props.session}
      </div>

    </div>


  )
}




export default TimerLabel