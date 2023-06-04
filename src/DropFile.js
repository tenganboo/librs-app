import {useState} from 'react';
import {LIBRS} from './LIBRS';

function DropFile(props) {
    
    async function handleFileUpload(e){
         const librs = await e.target.files[0].text()
         const clibrs = new LIBRS(librs);
         console.log(clibrs.Incidents);
         console.log(clibrs.Offense);
       
    }

    return (
        <input onChange={handleFileUpload} type="file">
        
        </input>
        )
}


export default DropFile;