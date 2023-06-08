import './SegmentField.css';
import {genUniqueID} from './utils'

function SegmentField(props){
    const segname = props.segname;
    const display = props.display;
    const segmentdata = props.segmentdata;

    if(segmentdata){
        console.log(segmentdata);
        const slist = segmentdata.map(s=>Object.keys(s).map(i=><li key={genUniqueID(25)}>{s[i]}</li>));
        return(
            <fieldset style={display}>
               <legend>{segname}</legend>  
               {slist}
            </fieldset>
       )
    }
    else {
        return(
            <fieldset style={display}>
               <legend>{segname}</legend>  
            </fieldset>
        )
    }
}

export default SegmentField;