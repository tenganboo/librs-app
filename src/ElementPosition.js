
const segindx ={
      fontSize:"15px",
}

const styles = {
      width:"20px",
      fontSize:"20px",
      textAlign:"center",
      textTransform: "capitalize",
      backgroundColor:""
      }

const bstyles = {
            width:"20px",
            fontSize:"20px",
            textAlign:"center",
            textTransform: "capitalize",
            backgroundColor:"black"
            }      

function ElementPosition(props){

    function handleOnFocus(e){
          e.target.setSelectionRange(0, 1);
          if(e.target.style.backgroundColor === "black")e.target.style.backgroundColor="";
    }

    function handleOnBlur(e){
       if(e.target.value === " " || e.target.value === "")e.target.style.backgroundColor="Black";
    }

    return(
         <td>
            <label style={segindx}>{props.idx +1}</label>
            <input maxLength="1" 
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={props.handleSegmentInputs} 
                     style={props.el===" "?bstyles:styles} 
                     type="text" 
                     defaultValue={props.el===" "?"":props.el}
                     data-idx={props.idx}
                     data-row={props.row}
                     ></input></td>
    )
}

export default ElementPosition;