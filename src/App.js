import {useState} from 'react';
import {LIBRS} from './LIBRS';
import './App.css';
import DropFile from './DropFile'
import Nav from './Nav'
import SubmissionHeader from './SubmissionHeader'
import SegmentField from './SegmentField'

const defaultSegment = "10 Administrative";

function App() {
  const [librsdata, setLibrs] = useState(null);
  const [segment, setSegment] = useState(defaultSegment);
  const [displaystate, setDisplay] = useState({ display: "none"});
  const [incidentstate, setIncident] = useState("");

  async function handleFileUpload(e){
    if(e.target.files){
        const librs = await e.target.files[0].text();
        setLibrs(new LIBRS(librs));
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
  const segnametemp = segment.split(" ");
  console.log(segnametemp[1]);
  const fielddata = librsdata[segnametemp[1]].filter(i=>i.IncidentNumber.trim()==incidentstate)
  console.log(fielddata);
}

  return (
    <div className="App">
      <DropFile handleFileUpload={handleFileUpload}></DropFile>
      <hr></hr>
      <SubmissionHeader librsdata={librsdata}></SubmissionHeader>
      <Nav section="Incidents" handleNavClick={handleCaseClick} librsdata={librsdata}></Nav>
      <Nav section="SegmentNames" handleNavClick={handleSegmentClick} librsdata={librsdata}></Nav>
      <SegmentField display={displaystate} segname={segment}></SegmentField>
    </div>
  );
}

export default App;
