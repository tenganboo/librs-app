import {useState,useRef} from 'react';
import {LIBRSFlatFile} from './LIBRSFlatFile';
import './css/App.css';
import DropFile from './DropFile'
import Nav  from './Nav'
import Segments from './Segments'
import SubmissionHeader from './SubmissionHeader'
import LinkButton from './LinkButton'
import Editor from './Editor'

const defaultincident = 0;
const displaynone = "none";
const displayblock = "block";

function App(){
  const librsdata = useRef(null);
  const [submissionheader, setSubmissionHeader] = useState(null);
  const [segments, setSegments] = useState(null);
  const [segmentsbyincidentno, setSegmentsByIncidentNo] = useState(null);
  const [remembernavclick,setRemembernavclick] = useState("");
  const [editdisplay,setEditDisplay] = useState(displaynone)

  async function handleFileUpload(e){
    if(e.target.files.length > 0){
      librsdata.current  = new LIBRSFlatFile(await e.target.files[0].text());
      const defaultI = librsdata.current.IncidentsNo[defaultincident];
      setRemembernavclick(defaultI);
      setSubmissionHeader(librsdata.current.SubmissionHeader00);
      setSegments(librsdata.current.Segments);
      setSegmentsByIncidentNo(librsdata.current.SegmentsByIncidentNo(defaultI));
      e.target.files.value = "";
    }

  }

  function handleSubmissionInputs(e){
      let buffer = submissionheader.segmentArray;
      buffer[e.target.dataset.idx] =e.target.value.toUpperCase();
      librsdata.current.SubmissionHeader00 =buffer;
      setSubmissionHeader(librsdata.current.SubmissionHeader00);
  }

  function handleTextEdit(e){
     const librsarray = e.target.value.split("\n").map(i=>Array.from(i));
     librsdata.current.Segments = librsarray;
     setSegments(librsdata.current.Segments)
     setSegmentsByIncidentNo(librsdata.current.SegmentsByIncidentNo(remembernavclick));
  }

  function handleSegmentInputs(e){

  }

  function handleEditLink(e){
    e.preventDefault();
    if(editdisplay === displaynone){
      setEditDisplay(displayblock);
    }
    else {
      setEditDisplay(displaynone);
    }
  }

  function handleCaseClick(e){
    setSegmentsByIncidentNo(librsdata.current.SegmentsByIncidentNo(e.target.textContent));
    setRemembernavclick(e.target.textContent);
  }

if(segments && segmentsbyincidentno && librsdata.current && submissionheader){
  return (
    <div className="App">
       <DropFile handleFileUpload={handleFileUpload}></DropFile>
       <hr/>
       <SubmissionHeader submissionheader={submissionheader}></SubmissionHeader>
       <Segments segments={submissionheader.segmentArray} handleSegmentInputs={handleSubmissionInputs}></Segments>
    
       <p><LinkButton handleEditLink={handleEditLink} linkname={editdisplay === displayblock?"Click To Close LIBR Edit":"Click To Open LIBR Edit"}></LinkButton></p>
       <Editor handleTextEdit={handleTextEdit} display={editdisplay} srows={segments.length} segments={editdisplay==displaynone?"":segments.map(i=>i.join("")).join("\r\n")}></Editor>
       <hr/>
     <div className="container">
     <div className="incidentcol">
      <fieldset>
           <legend>Incident Number</legend>
         <Nav remembernavclick={remembernavclick} section={librsdata.current.IncidentsNo} handleNavClick={handleCaseClick}></Nav>
      </fieldset>
     </div>
      <div className="fieldsetdiv">
      <fieldset>
           <legend>Segments for Incident {remembernavclick}</legend>
        <Segments segments={segmentsbyincidentno} handleSegmentInputs={handleSegmentInputs}></Segments>
      </fieldset>  
     </div>
     </div>
    </div>
  )
}
else {
  return (
  <div className="App">
    <DropFile handleFileUpload={handleFileUpload}></DropFile>
  </div>
  )
}

}


export default App;
