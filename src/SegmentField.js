import './SegmentField.css';

function SegmentField(props){
    const segname = props.segname;
    const display = props.display;
    const segmentdata = props.segmentdata;

    if(segmentdata){
        const data = segmentdata[0];
        const slist = Object.keys(data).map(i=><li key={i}>{data[i]}</li>);
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