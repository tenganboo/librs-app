import {useState,useRef} from 'react';
import {LIBRS} from './LIBRS';
import {LIBRSFlatFile} from './LIBRSFlatFile';
import './css/App.css';
import DropFile from './DropFile'
//import Nav from './Nav'
import SubmissionHeader from './SubmissionHeader'
//import SegmentField from './SegmentField'
import ElementPosition from './ElementPosition'
import {fullSegmentName,genUniqueID} from './utils'

const idlength = 25;
const segementlength = 151;

/* function App2() {
  const [displaystate, setDisplay] = useState({ display: "none"});
  const [incidentstate, setIncident] = useState("");
  const [selectionstate,setSelection] = useState("sections");
  const librsdata = useRef(null);
  const librsfile = useRef();

  async function handleFileUpload(e){
        librsfile.current  = await e.target.files[0].text();
        const test = new LIBRSFlatFile(librsfile.current);
        console.log(test.SubmissionHeader00);
        librsdata.current = new LIBRS(librsfile.current);
        setIncident(librsdata.current.Incidents[0]);
        setDisplay({ display: "block"});
   }

function handleCaseClick(e){
  setIncident(e.target.textContent);
}

  return (
    <div className="App">
      <DropFile handleFileUpload={handleFileUpload}></DropFile>
      <hr></hr>
      <SubmissionHeader librsdata={librsdata.current}></SubmissionHeader>
      <Nav selectionstate={selectionstate} section={librsdata.current !== null && librsdata.current.Incidents} handleNavClick={handleCaseClick}></Nav>
      <div className="fieldsetdiv">
         {librsdata.current !== null && [...new Set(librsdata.current.Segments(incidentstate))].map(s=>
        <SegmentField  key={genUniqueID(idlength)} display={displaystate} segname={fullSegmentName(librsdata.current.SegmentName)[s]} segmentdata={librsdata.current !== null && librsdata.current[librsdata.current.SegmentName[s]].filter(i=>i.IncidentNumber.trim()==incidentstate)}></SegmentField>
                            )}
      </div>
      
    </div>
  );
} */

function App(){
  const librsdata = useRef(null);
  const [submissionheader, setSubmissionHeader] = useState(null);
  const [segments, setSegments] = useState(null);

  async function handleFileUpload(e){
    if(e.target.files.length > 0){
      librsdata.current  = new LIBRSFlatFile(await e.target.files[0].text());
      setSubmissionHeader(librsdata.current.SubmissionHeader00);
      console.log(librsdata.current.Segments);
      setSegments(librsdata.current.Segments);
      e.target.files.value = "";
    }

  }

  function handleSubmissionInputs(e){
      let buffer = submissionheader.segmentArray;
      buffer[e.target.dataset.idx] =e.target.value.toUpperCase();
      librsdata.current.SubmissionHeader00 =buffer;
      setSubmissionHeader(librsdata.current.SubmissionHeader00);
  }

  function handleSegmentInputs(e){

  }

  return (
    <div className="App">
       <DropFile handleFileUpload={handleFileUpload}></DropFile>
       <hr></hr>
       <SubmissionHeader submissionheader={submissionheader}></SubmissionHeader>
       <br></br>
       <table className="segments">
        <thead></thead>
        <tbody>
          <tr>
          {submissionheader !==null && submissionheader.segmentArray.map((i,idx)=><ElementPosition handleSegmentInputs={handleSubmissionInputs} key={genUniqueID(25)} idx={idx} el={i}></ElementPosition>)}
          </tr>   
        </tbody>
       </table>
       <hr></hr>
       <table className="segments">
        <thead></thead>
        <tbody>
          {segments !==null && segments.map((i)=><tr key={genUniqueID(25)}>{i.map((j,idx)=><ElementPosition handleSegmentInputs={handleSegmentInputs} key={genUniqueID(25)} idx={idx} el={j}></ElementPosition>)}</tr>)}   
        </tbody>
       </table>
    </div>
  )
}


export default App;
