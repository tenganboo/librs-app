const styles = {
      color:"blue",
      cursor:"pointer",
      textDecoration: "underline"
}

function LinkButton(props) {

    return (
      <a style={styles} onClick={props.handleEditLink}>{props.linkname}</a>
    )
}

export default LinkButton