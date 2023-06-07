import './Nav.css';

function Nav(props) {
   
     return(
         <nav>
           <ul>
           {props.section !== false && props.section.map(i=><li onClick={props.handleNavClick} className="sections" key={`case${i}`}>{i.trim()}</li>)}
           </ul>
         </nav>
     )
}

export default Nav;