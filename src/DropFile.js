

function DropFile(props) {
    const handleFileUpload = props.handleFileUpload;

    return (
        <input onChange={handleFileUpload} type="file">
        
        </input>
        )
}


export default DropFile;