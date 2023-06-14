function SubmissionHeader(props){
    const submissionheader = props.submissionheader;
  if(submissionheader !== null){
    return(
        <div>
             <span>{submissionheader.SegmentDescriptor}</span><span className="splitline">|&nbsp;</span> 
             <span>{submissionheader.SubmittingAgency}</span><span className="splitline">|&nbsp;</span> 
             <em>Reporting Period:&nbsp;</em><span>{submissionheader.ReportingPeriod}</span>
        </div>
    )
  }
    
}

export default SubmissionHeader;