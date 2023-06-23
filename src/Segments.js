import ElementPosition from './ElementPosition'
import './css/Segments.css';
import {genUniqueID} from './utils'



function Segments(props){
    const segments = props.segments;
    const handleSegmentInputs = props.handleSegmentInputs;

    if(segments && segments[0].constructor === Array ){
      return(
        <table className="segments">
            <thead></thead>
            <tbody>
              {segments.map((i,row)=><tr key={genUniqueID(25)}><td className="errors">{i.length<150?"Wrong Length!":""}</td>{i.map((j,idx)=><ElementPosition handleSegmentInputs={handleSegmentInputs} key={genUniqueID(25)} row={row}  idx={idx} el={j}></ElementPosition>)}</tr>)}   
            </tbody>
          </table>
      )}
      if(segments){
        return (
          <table className="segments">
          <thead></thead>
          <tbody>
            <tr>
            {segments.map((i,idx)=><ElementPosition handleSegmentInputs={handleSegmentInputs} key={genUniqueID(25)} idx={idx} el={i}></ElementPosition>)}
            </tr>   
          </tbody>
         </table>
        )
      }
      return(
        <table className="segments">
          <thead></thead>
          <tbody>
            <tr>
            </tr>   
          </tbody>
         </table>
      )
    }

    export default Segments;