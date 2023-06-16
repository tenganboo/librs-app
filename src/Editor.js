

function Editor(props){
    return (
        <fieldset style={{display:props.display}}>
            <legend>Editor</legend>
            <textarea 
            value={props.segments} 
            rows={25}
            cols={150}
            onChange={props.handleTextEdit}
            >
            </textarea>
        </fieldset>

    )
}

export default Editor;