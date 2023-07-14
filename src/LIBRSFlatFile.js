//LIBRS FlatFile Reader
//LIBRS SPECS https://docs.librs.org/librs-spec
//LIBRS Validator https://api.librs.org/
//API POST https://api.librs.org/api/validate/txt
//LIBRS UPLOAD https://ftp.lsa.org/webclient/Login.xhtml
//LIBRS CODES https://github.com/bttruman/winlibrs-docs/tree/master/_data

import {fullSegmentName,
        genUniqueID,
        formatLibrsSubmissionDate,
        formatLibrsReportingDate
    } from './utils'

const SEGMENT00 = 0;
const ENDOFSEGMENT = "ZZ";
const ENDOFLINE = "\r\n";

const DataElements = {
      SegmentDescriptor:{start:1,end:2},
      IncidentsNo:{start:13,end:24}
}

const SubmissionHeader ={
      SegmentDescriptor:{start:1,end:2},
      ActionType:{start:3,end:3},
      IncidentsNo:{start:13,end:24}
}

class LIBRSFlatFile {
    #sub00;
    #segs;

    constructor(librfile,filename){
        this.librfile = librfile;
        this.librsarray = this.librfile.split(ENDOFLINE).map(i=>Array.from(i));
        this.librsfilename = filename;
    }

    SegmentsByIncidentNo(incidentno){
        const incident = DataElements.IncidentsNo;
        return this.Segments.filter(i=>this.#getSegmentData(i,incident.start,incident.end).trim()===incidentno);
    }

    get filename() {
        return this.librsfilename;
    }

    get flatfile() {
        return this.librfile;
    }

    get flatfilearray() {
        return this.librsarray;
    }

    get flatfilearraylength() {
        return this.librsarray.length;
    }

    get segmentWrongLengths(){
        return this.librsarray.map((i,idx)=>{return {idx:idx,len:i.length}}).filter(i=>i.len < 150);
    }

    #getSegmentData(segment,start,end) {
        const paddindex = 1;
        return segment.slice(start-paddindex,end).join("");
    }

    set SubmissionHeader00(buffer){
        this.#sub00 = buffer;
    }

    get SubmissionHeader00() {
       const segment = this.#sub00 || this.flatfilearray[SEGMENT00];
       return {
        SegmentDescriptor:this.#getSegmentData(segment,1,2),
        SubmittingAgency:this.#getSegmentData(segment,3,22).trim(),
        SubmissionDate:formatLibrsSubmissionDate(this.#getSegmentData(segment,23,30)),
        ReportingPeriod:formatLibrsReportingDate(this.#getSegmentData(segment,31,36)),
        SoftwareID:this.#getSegmentData(segment,37,41).trim(),
        SoftwareVersion:this.#getSegmentData(segment,42,51).trim(),
        segmentArray:segment,
        rawsegment:segment.join("")
       };
    }

    get Administrative10ALL(){
        const adminEx = /^10/gm;
        const admin10 = this.Segments.filter(i=>adminEx.test(i.join("")));
        return admin10;
    }

    get Segments(){
        const segments = this.#segs || this.flatfilearray.slice(1,this.librsarray.length-1);
        return segments
    }

    set Segments(buffer){
        this.#segs = buffer;
    }

    //Submission Trailer (99)
    get SubmissionTrailer99() {
        return this.flatfilearray[this.librsarray.length -1];
    }

    get IncidentsNo(){
        const incident = DataElements.IncidentsNo;
        return this.Administrative10ALL.map(i=>this.#getSegmentData(i,incident.start,incident.end).trim()).sort();
    }

    get updatedFlatFile(){
        return this.SubmissionHeader00.rawsegment + "\r\n"+this.Segments.map(i=>i.join("")).join("\r\n") + this.SubmissionTrailer99.join("")
    }

    get updatedFlatFile64(){
        return btoa(unescape(encodeURIComponent(this.updatedFlatFile)));
    }

}


export {LIBRSFlatFile};