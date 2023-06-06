

function SubmissionHeader(props){
    const librsdata = props.props;
    const subh = librsdata!==0?librsdata.submissionHeader:[];

    return(
        <div>
           <h3>{subh.length!==0?subh[0].SegmentDescriptor:""} </h3>
        </div>
    )
}


export default SubmissionHeader;