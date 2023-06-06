import './Nav.css';

function Nav(props) {
     const librsdata = props.librsdata;
     return(
         <nav>
           <ul>
           {librsdata !== null && librsdata[props.section].map(i=><li onClick={props.handleCaseClick} className="sections" key={`case${i}`}>{i.trim()}</li>)}
           </ul>
         </nav>
     )
}


export default Nav;