import {useState} from 'react';
import {LIBRS} from './LIBRS';
import './App.css';
import DropFile from './DropFile'
import Nav from './Nav'
import SubmissionHeader from './SubmissionHeader'
import SegmentField from './SegmentField'

const defaultSegment = "10 Administrative";
let librsdata = null;

function App() {
  const [segment, setSegment] = useState(defaultSegment);
  const [displaystate, setDisplay] = useState({ display: "none"});
  const [incidentstate, setIncident] = useState("");

  async function handleFileUpload(e){
    if(e.target.files){
        const librs = await e.target.files[0].text();
        librsdata = new LIBRS(librs);
        setIncident(librsdata.Incidents[0]);
        setDisplay({ display: "block"});
    }
    else {return};
 }

function handleCaseClick(e){
  setIncident(e.target.textContent);
  setSegment(defaultSegment);
}

function handleSegmentClick(e){
  setSegment(e.target.textContent);
}

  return (
    <div className="App">
      <DropFile handleFileUpload={handleFileUpload}></DropFile>
      <hr></hr>
      <SubmissionHeader librsdata={librsdata}></SubmissionHeader>
      <Nav section={librsdata !== null && librsdata.Incidents} handleNavClick={handleCaseClick}></Nav>
      <Nav section={librsdata !== null && incidentstate!== null && librsdata.Segments(incidentstate).map(s=>s + " " +librsdata.SegmentName[s]) } handleNavClick={handleSegmentClick} librsdata={librsdata}></Nav>
      <SegmentField  display={displaystate} incidentno={incidentstate} segname={segment} segmentdata={librsdata !== null && librsdata[segment.split(" ")[1]].filter(i=>i.IncidentNumber.trim()==incidentstate)}></SegmentField>
    </div>
  );
}

export default App;
