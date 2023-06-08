const styles = {
    width:"100%"
}

function DropFile(props) {
    const handleFileUpload = props.handleFileUpload;

    return (
        <input style={styles} onChange={handleFileUpload} type="file">
        
        </input>
        )
}


export default DropFile;