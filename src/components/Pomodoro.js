import React, { Component } from 'react'
import './Pomodoro.css'
import beep from '../resources/sound/808-cym06.wav'
import TimerLabel from './TimerLabel/TimerLabel'
import Timers from './Timers/Timers'
import StartStop from './StartStop/StartStop'

//have to lift timers to global variables for them to work correctly
let sessionTimer, breakTimer;
let SESSION = 1500
let BREAK = 300

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: SESSION,
      sessionChime: false,
      breakTime: BREAK,
      breakChime: false,
      beep: beep
    }//end state

    this.startStop = this.startStop.bind(this)
    this.reset = this.reset.bind(this)
    this.sessionIncrement = this.sessionIncrement.bind(this)
    this.sessionDecrement = this.sessionDecrement.bind(this)
    this.breakIncrement = this.breakIncrement.bind(this)
    this.breakDecrement = this.breakDecrement.bind(this)
  }//end constructor

  //checks to see if the session time or break time runs out and then plays chine sound
  componentWillUpdate() {
    if (this.state.sessionTime === 1 && this.state.sessionChime === false) {
      new Audio(beep).play()
      this.setState({
        sessionChime: true
      })
    }
    if (this.state.breakTime === 1 && this.state.breakChime === false) {
      new Audio(beep).play()
      this.setState({
        breakChime: true
      })
    }
  }

  //START/STOP FUNCTION----------------------------------------------------------------------------
  startStop() {
    //if sessionTimer is null, setInterval
    if (!sessionTimer && this.state.sessionTime > 0) {

      sessionTimer = setInterval(() => {

        this.setState({
          sessionTime: this.state.sessionTime - 1
        })

      }, 1000)

      //if sessionTImer isn't null ie is active
    } else if (sessionTimer) {
      //pause the session timer
      clearInterval(sessionTimer)
      sessionTimer = null

    }

    //if sesson time is out but breakTime hasn't been started
    if (this.state.sessionTime === 0 && !breakTimer) {
      //start timer
      breakTimer = setInterval(() => {

        this.setState({
          breakTime: this.state.breakTime - 1
        })

      }, 1000)
      //else pause the breakTimer
    } else if (breakTimer) {
      clearInterval(breakTimer)
      breakTimer = null
    }

  }

  //RESET TIMER FUNCTION---------------------------------------------------------------------------------
  reset() {
    clearInterval(sessionTimer)
    clearInterval(breakTimer)

    this.setState({
      sessionTime: SESSION,
      sessionChime: false,
      breakTime: BREAK,
      breakChime: false
    })

  }

  //SESSION INCREMENT--------------------------------------------------------------------------------------
  sessionIncrement() {
    //if attempting to set value of session above 60 min...exit
    if (SESSION >= 3600) return

    //add 60 sec to SESSION
    SESSION += 60
    //add 60 sec to session time
    this.setState({
      sessionTime: SESSION
    })
  }

  //SESSION DECREMENT----------------------------------------------------------------------------------------
  sessionDecrement() {
    //if attempting to set value of session below 1 min...exit
    if (SESSION <= 60) return

    //subrtact 60 sec from session time
    SESSION -= 60
    //subtract 60 sec to session
    this.setState({
      sessionTime: SESSION
    })
  }

  //BREAK INCREMENT-------------------------------------------------------------------------------------------
  breakIncrement() {
    //if attempting to set value of break above 60 min...exit
    if (BREAK >= 3600) return

    //add 60 secs to break
    BREAK += 60
    //add 60 sec to break
    this.setState({
      breakTime: BREAK
    })
  }

  //BREAK DECREMENT--------------------------------------------------------------------------------------------
  breakDecrement() {
    //if attempting to set value of break below 1 min...exit
    if (BREAK <= 60) return

    //subtract 60 seconds from break
    BREAK -= 60
    //subtract 60 sec to break
    this.setState({
      breakTime: BREAK
    })
  }

  render() {
    //DISPLAY EITHER 'SESSION' OR 'BREAK' IN THE DISPLAY
    let sessionBreak = (this.state.sessionTime > 0) ? "Session" : "Break"
    //FINDS THE AMOUNT OF MINUTES IN THE SESSION
    let sessionMin = Math.floor(this.state.sessionTime / 60)
    //FINDS THE SECS IN THE SESSION
    let sessionSec = (this.state.sessionTime - (sessionMin * 60)) === 0 ? "00" :
      (this.state.sessionTime - (sessionMin * 60)) < 10 ? `0${(this.state.sessionTime - (sessionMin * 60))}` :
        (this.state.sessionTime - (sessionMin * 60))
    //FINDS THE MINS IN THE BREAK
    let breakMin = Math.floor(this.state.breakTime / 60)
    //FINDS THE SECS IN THE BREAK
    let breakSec = (this.state.breakTime - (breakMin * 60)) === 0 ? '00' :  // 
      (this.state.breakTime - (breakMin * 60)) < 10 ? `0${(this.state.breakTime - (breakMin * 60))}` :
        (this.state.breakTime - (breakMin * 60))

    //DISPLAYS SESSION MINUTES AND SECONDS
    let sessionDisplay = `${sessionMin}:${sessionSec}`
    //DISPLAYS BREAK MINUTES AND SECONDS
    let breakDisplay = `${breakMin}:${breakSec}`



    //IF THE SESSION TIME HITS 0 SEC THEN CLEAR THE SESSION INTERVAL
    if (this.state.sessionTime === 0) {
      //clear interval
      clearInterval(sessionTimer)
      //set to null to yes in truthy/falsy
      sessionTimer = null
    }
    //IF THE SESSION IS OUT OF TIME AND THE BREAK TIME ISN'T AND NOT setINTERVAL IS ACTIVE
    //THEN SET AN INTERVAL FOR THE BREAK
    if (this.state.sessionTime === 0 && this.state.breakTime > 0 && !breakTimer) {
      breakTimer = setInterval(() => {

        this.setState({
          breakTime: this.state.breakTime - 1
        })

      }, 1000)
    }


    //if break ends and session is ended...start over
    if (this.state.breakTime === 0) {
      //clear interval
      clearInterval(breakTimer)
      //set to null to yes in truthy/falsy
      breakTimer = null

      //set timers to original time set
      this.setState({
        sessionTime: SESSION,
        sessionChime: false,
        breakTime: BREAK,
        breakChime: false
      })

      sessionTimer = setInterval(() => {

        this.setState({
          sessionTime: this.state.sessionTime - 1
        })

      }, 1000)
    }

    return (
      <div id="pomodoro">
        <TimerLabel session={sessionBreak} />
        <Timers sessionTime={sessionDisplay} breakTime={breakDisplay}
          sessionIncrement={this.sessionIncrement} sessionDecrement={this.sessionDecrement}
          breakIncrement={this.breakIncrement} breakDecrement={this.breakDecrement} />
        <StartStop startStop={this.startStop} reset={this.reset} />
      </div>
    )//end return
  }//end render


}//end Pomodoro

export default Pomodoro