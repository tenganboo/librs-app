import './css/SegmentField.css';
import {genUniqueID} from './utils'

const headersused = {
       10:[0,6,5,1],
       20:[0,12,16,6,9,1],
       30:[0,5,4],
       31:[],
       33:[],
       40:[0,9,10,12,1],
       41:[],
       50:[],
       51:[],
       52:[],
       60:[],
       61:[],
       62:[]
}

const idlength = 25;
const fistItem = 0;

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
        if(i[s].trim().length === fistItem)i[s]="Not Set";
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
    console.log(props.segname);
    console.log(props.segmentdata);
     const segmentdescriptor = props.segname.split(" ")[fistItem];
     const fields = headersused[segmentdescriptor].map(f=>Object.keys(props.segmentdata[fistItem]).sort()[f]);
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