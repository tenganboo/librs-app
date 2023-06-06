import './Nav.css';

function Nav(props) {
     const librsdata = props.props;
     console.log(librsdata);
     return(
         <nav>
           <ul>
           {librsdata==0?"":librsdata.Incidents.map(i=><li className="incidentno" key={`case${i}`}>{i.trim()}</li>)}
           </ul>
         </nav>
     )
}


export default Nav;