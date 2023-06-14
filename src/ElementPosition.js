
const styles = {
      width:"20px",
      fontSize:"15px"
}
function ElementPosition(props){
    return(
         <td ><input maxLength="1" 
                    onChange={props.handleSegmentInputs} 
                     style={styles} 
                     type="text" 
                     defaultValue={props.el==" "?"":props.el}
                     ></input></td>
    )
}

export default ElementPosition;