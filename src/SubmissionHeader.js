import {formatLibrsSubmissionDate} from './utils';

function SubmissionHeader(props){
    const librsdata = props.librsdata;

    return(
        <div>
           {librsdata !== null && <div>
             <span>{librsdata.SubmissionHeader.SegmentDescriptor}</span><span className="splitline">|&nbsp;</span> 
             <span>{librsdata.SubmissionHeader.SubmittingAgency}</span><span className="splitline">|&nbsp;</span> 
             <em>Reporting Period:&nbsp;</em><span>{formatLibrsSubmissionDate(librsdata.SubmissionHeader.ReportingPeriod)}</span></div>}
        </div>
    )
}

export default SubmissionHeader;