import './css/SegmentField.css';
import {genUniqueID} from './utils'

const headersused = {
       10:[0,6,5,1,3,7],
       20:[0,12,6,9,1,7],
       30:[0,5,4],
       31:[0,8,5,7,12,13],
       33:[0,3,5,6],
       40:[0,9,10,12,1,2],
       41:[0],
       50:[0],
       51:[0],
       52:[0,5],
       60:[0,4,2,6,7,9,20,17,1],
       61:[0],
       62:[0,6,7,8,1,2]
}

const idlength = 25;
const firstItem = 0;

function SegmentField(props){
    const segname = props.segname;  //useState
    const display = props.display;   //Display State
    const segmentdata = props.segmentdata;

    if(segmentdata){
        
        return(
            <fieldset style={display}>
               <legend>{segname}</legend>  
                <ExpandSegmentsTable segname={segname} segmentdata={segmentdata}></ExpandSegmentsTable>
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
        if(i[s].trim().length === firstItem)i[s]="Not Set";
         ddlist.push(<><dt key={genUniqueID(idlength)}>{s}</dt><dd key={genUniqueID(idlength)}>{i[s]}</dd></>);
        })
       )
        return(
            <dl>
                {ddlist}
            </dl>
       )
 
}

function ExpandSegmentsTable(props){
     const segmentdescriptor = props.segname.split(" ")[firstItem];
     const availsegments = props.segmentdata[firstItem] !== undefined && Object.keys(props.segmentdata[firstItem]).sort();
     const fields = headersused[segmentdescriptor].map(f=>availsegments[f]);
     console.log(props.segmentdata);
     let headers = fields.map(th => <th key={genUniqueID(idlength)}>{th}</th>);
     let body = [];
     props.segmentdata.forEach(i=>{
        let td = [];
        fields.forEach(s=>{
                if(fields.includes(s))td.push(<td key={genUniqueID(idlength)}>{i[s]}</td>);
        });
        body.push(<tr key={genUniqueID(idlength)}>{td}</tr>);
    })
        return(
             <table className="segTable">
                <thead><tr>{headers}</tr></thead>
                <tbody>{body}</tbody>
             </table>
       )
 
}

export default SegmentField;