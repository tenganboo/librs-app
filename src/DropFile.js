

function DropFile(props) {
    const handleFileUpload = props.props;

    return (
        <input onChange={handleFileUpload} type="file">
        
        </input>
        )
}


export default DropFile;