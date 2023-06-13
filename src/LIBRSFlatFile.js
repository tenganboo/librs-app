//LIBRS FlatFile Reader
//LIBRS SPECS https://docs.librs.org/librs-spec
//LIBRS Validator https://api.librs.org/
//API POST https://api.librs.org/api/validate/txt
//LIBRS UPLOAD https://ftp.lsa.org/webclient/Login.xhtml
//LIBRS CODES https://github.com/bttruman/winlibrs-docs/tree/master/_data





class LIBRSFlatFile {

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

    get SubmissionHeader00() {
       const segment = this.flatfilearray[0];
       return {
        SegmentDescriptor:this.#getSegmentData(segment,1,2),
        SubmittingAgency:this.#getSegmentData(segment,3,22),
        SubmissionDate:this.#getSegmentData(segment,23,30),
        ReportingPeriod:this.#getSegmentData(segment,31,36),
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