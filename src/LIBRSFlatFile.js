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

class LIBRSFlatFile {
    #sub00
    constructor(librfile){
        this.librfile = librfile;
        this.librsarray = this.librfile.split("\n").map(i=>Array.from(i));
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

    get Segments(){
        return this.flatfilearray.slice(1,this.librsarray.length-1);
    }

    //Submission Trailer (99)
    get SubmissionTrailer99() {
        return this.flatfilearray[this.librsarray.length -1];
    }

}






export {LIBRSFlatFile};