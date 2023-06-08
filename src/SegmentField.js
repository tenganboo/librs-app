import './SegmentField.css';
import {genUniqueID} from './utils'

function SegmentField(props){
    const segname = props.segname;
    const display = props.display;
    const segmentdata = props.segmentdata;

    if(segmentdata){
        
        return(
            <fieldset style={display}>
               <legend>{segname}</legend>  
                <ExpandSegmentsTable segmentdata={segmentdata}></ExpandSegmentsTable>
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

function ExpandSegmentsDL(props){
    console.log(props.segmentdata);
     let ddlist = [];
     props.segmentdata.forEach(i=>
        Object.keys(i).forEach(s=>{
        if(i[s].trim().length === 0)i[s]="Not Set";
         ddlist.push(<><dt key={genUniqueID(25)}>{s}</dt><dd key={genUniqueID(25)}>{i[s]}</dd></>);
        })
       )
        return(
            <dl>
                {ddlist}
            </dl>
       )
 
}

function ExpandSegmentsTable(props){
    console.log(props.segmentdata);
     let headers = Object.keys(props.segmentdata[0]).map(th => <th key={genUniqueID(25)}>{th}</th>);
     let body = [];
     props.segmentdata.forEach(i=>{
        let td = [];
        Object.keys(i).forEach(s=>{
        td.push(<td key={genUniqueID(25)}>{i[s]}</td>);
        });
        body.push(<tr key={genUniqueID(25)}>{td}</tr>);
    })
        return(
             <table className="segTable">
                <thead><tr>{headers}</tr></thead>
                <tbody>{body}</tbody>
             </table>
       )
 
}

export default SegmentField;