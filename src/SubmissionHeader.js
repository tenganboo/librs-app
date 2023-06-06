

function SubmissionHeader(props){
    const librsdata = props.props;
    const sheaders = getHeaders(librsdata);

    return(
        <div>
           <h3>{sheaders.SegmentDescriptor} | {sheaders.SubmittingAgency.trim()} | {sheaders.ReportingPeriod
}</h3>
        </div>
    )
}

function getHeaders(librsdata){
    const subh = librsdata!==0?librsdata.SubmissionHeader:[0];

    return subh[0];
}


export default SubmissionHeader;