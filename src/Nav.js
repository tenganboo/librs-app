import './css/Nav.css';
import {genUniqueID} from './utils'

function Nav(props) {
   
     return(
         <nav>
           
            {/* Get unique values in array shortcut using Set() */}
           {props.section !== false && [...new Set(props.section)].map(i=><div onClick={props.handleNavClick} className="sections" key={genUniqueID(25)}>{i.trim()}</div>)}
      
         </nav>
     )
}

export default Nav;