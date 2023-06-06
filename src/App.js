import {useState} from 'react';
import {LIBRS} from './LIBRS';
import './App.css';
import DropFile from './DropFile'
import Nav from './Nav'
import SubmissionHeader from './SubmissionHeader'

function App() {
  const [librsdata, setLibrs] = useState(0);

  async function handleFileUpload(e){
    if(e.target.files){
        const librs = await e.target.files[0].text()
        setLibrs(new LIBRS(librs));
    }
    else {return};
}

  return (
    <div className="App">
      <DropFile props={handleFileUpload}></DropFile>
      <hr></hr>
      <SubmissionHeader props={librsdata}></SubmissionHeader>
      <Nav props={librsdata}></Nav>
    </div>
  );
}

export default App;
