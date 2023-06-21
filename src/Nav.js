import './css/Nav.css';
import {genUniqueID} from './utils'


function Nav(props) {
  const remembernavclick = props.remembernavclick;
  
  return(
      <nav>
        
        {props.section !== false && props.section.map(i=><div style={{textDecoration:remembernavclick==i.trim()?"underline":""}} onClick={props.handleNavClick} className="sections" key={genUniqueID(25)}>{i.trim()}</div>)}
   
      </nav>
  )
}

export default Nav