import {useState} from 'react';
import {LIBRS} from './LIBRS';
import './App.css';
import DropFile from './DropFile'
import Nav from './Nav'
import SubmissionHeader from './SubmissionHeader'

function App() {
  const [librsdata, setLibrs] = useState(null);

  async function handleFileUpload(e){
    if(e.target.files){
        const librs = await e.target.files[0].text()
        setLibrs(new LIBRS(librs));
    }
    else {return};
}

function handleCaseClick(e){
  const incidentnumber = e.target.textContent;
  const admin = librsdata.Administrative.filter(i=>i.IncidentNumber.trim()==incidentnumber)
  console.log(admin);
}

  return (
    <div className="App">
      <DropFile handleFileUpload={handleFileUpload}></DropFile>
      <hr></hr>
      <SubmissionHeader librsdata={librsdata}></SubmissionHeader>
      <Nav section="Incidents" handleCaseClick={handleCaseClick} librsdata={librsdata}></Nav>
    </div>
  );
}

export default App;
