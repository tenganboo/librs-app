
const styles = {
      width:"20px",
      fontSize:"20px",
      textAlign:"center",
      textTransform: "capitalize"
}

const stylesblank = {
    width:"20px",
    backgroundColor:"black"
}

const segindx ={
      fontSize:"15px",
}


function ElementPosition(props){

    function handleOnFocus(e){
          e.target.setSelectionRange(0, 1);
    }

    return(
         <td>
            <label style={segindx}>{props.idx +1}</label>
            <input maxLength="1" 
                    onFocus={handleOnFocus}
                    onChange={props.handleSegmentInputs} 
                     style={props.el===" "?stylesblank:styles} 
                     type="text" 
                     defaultValue={props.el===" "?"":props.el}
                     data-idx={props.idx}
                     ></input></td>
    )
}

export default ElementPosition;