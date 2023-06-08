import {useState,useRef} from 'react';
import {LIBRS} from './LIBRS';
import './App.css';
import DropFile from './DropFile'
import Nav from './Nav'
import SubmissionHeader from './SubmissionHeader'
import SegmentField from './SegmentField'

const defaultSegment = "10 Administrative";

function App() {
  const [segment, setSegment] = useState(defaultSegment);
  const [displaystate, setDisplay] = useState({ display: "none"});
  const [incidentstate, setIncident] = useState("");
  const librsdata = useRef(null);

  async function handleFileUpload(e){
    if(e.target.files){
        const librs = await e.target.files[0].text();
        librsdata.current = new LIBRS(librs);
        setIncident(librsdata.current.Incidents[0]);
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
      <SubmissionHeader librsdata={librsdata.current}></SubmissionHeader>
      <Nav section={librsdata.current !== null && librsdata.current.Incidents} handleNavClick={handleCaseClick}></Nav>
      <Nav section={librsdata.current !== null && incidentstate!== null && librsdata.current.Segments(incidentstate).map(s=>s + " " +librsdata.current.SegmentName[s]) } handleNavClick={handleSegmentClick}></Nav>
      <SegmentField  display={displaystate} incidentno={incidentstate} segname={segment} segmentdata={librsdata.current !== null && librsdata.current[segment.split(" ")[1]].filter(i=>i.IncidentNumber.trim()==incidentstate)}></SegmentField>
    </div>
  );
}

export default App;
