import './css/Nav.css';
import {genUniqueID} from './utils'


//Where using class LIBRS
function Nav(props) {
   
     return(
         <nav>
           
            {/* Get unique values in array shortcut using Set() */}
           {props.section !== false && [...new Set(props.section)].map(i=><div onClick={props.handleNavClick} className="sections" key={genUniqueID(25)}>{i.trim()}</div>)}
      
         </nav>
     )
}

//Where using class LIBRSFlatfile
function NavL(props) {
   
  return(
      <nav>
        
        {props.section !== false && props.section.map(i=><div onClick={props.handleNavClick} className="sections" key={genUniqueID(25)}>{i.trim()}</div>)}
   
      </nav>
  )
}

export {Nav, NavL};