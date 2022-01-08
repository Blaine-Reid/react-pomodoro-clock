import './StartStop.css'

function StartStop(props) {
  return (
    <div id="start-stop">
      <button id="start_stop" className="startStopBtn" title="Start/Stop Timer" onClick={props.startStop}>START/STOP</button>
      <button id="reset" className="startStopBtn" title="Reset Timer" onClick={props.reset}>RESET</button>
    </div>
  )
}





export default StartStop