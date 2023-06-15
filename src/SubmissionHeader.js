function SubmissionHeader(props){
    const submissionheader = props.submissionheader;
  if(submissionheader !== null){
    return(
        <div>
             <span>{submissionheader.SegmentDescriptor}</span><span className="splitline">&nbsp;|&nbsp;</span> 
             <span>{submissionheader.SubmittingAgency}</span><span className="splitline">&nbsp;|&nbsp;</span> 
             <em>Reporting Period:&nbsp;</em><span>{submissionheader.ReportingPeriod}&nbsp;|&nbsp;</span>
        </div>
    )
  }
    
}

export default SubmissionHeader;