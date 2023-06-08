import './Nav.css';
import {genUniqueID} from './utils'

function Nav(props) {
   
     return(
         <nav>
           <ul>
            {/* Get unique values in array shortcut using Set() */}
           {props.section !== false && [...new Set(props.section)].map(i=><li onClick={props.handleNavClick} className="sections" key={genUniqueID(25)}>{i.trim()}</li>)}
           </ul>
         </nav>
     )
}

export default Nav;