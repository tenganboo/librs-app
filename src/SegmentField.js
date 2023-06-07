import './SegmentField.css';

function SegmentField(props){
    const segname = props.segname;
    const display = props.display;

    return(
         <fieldset style={display}>
            <legend>{segname}</legend>
         </fieldset>
    )
}

export default SegmentField;