//LIBRS FlatFile Reader
//LIBRS SPECS https://docs.librs.org/librs-spec
//LIBRS Validator https://api.librs.org/
//API POST https://api.librs.org/api/validate/txt
//LIBRS UPLOAD https://ftp.lsa.org/webclient/Login.xhtml
//LIBRS CODES https://github.com/bttruman/winlibrs-docs/tree/master/_data

import {
    SubmissionHeader,
    Administrative,
    Offense,
    Property,
    PropertyDesc,
    PropertyOffense,
    Offender,
    OffenderMotive,
    Victim,
    VictimInjury,
    VictimOffender,
    Arrestee,
    ArresteeArmed,
    ArresteeStatute 

} from './librsRegExModal';


class LIBRS {

    constructor(librfile){
        this.librfile = librfile;
    
    }

get SegmentNames() {
    return [   
                "10 Administrative",
                "20 Offense",
                "30 Property",
                "31 PropertyDesc",
                "33 PropertyOffense",
                "40 Offender",
                "41 OffenderMotive",
                "50 Victim",
                "51 VictimInjury",
                "52 VictimOffender",
                "60 Arrestee",
                "61 ArresteeArmed",
                "62 ArresteeStatute" ]
}
get SubmissionHeader() {
    const seg = [...this.librfile.matchAll(SubmissionHeader)];
    const [results] = seg.map(i=>i.groups);
    return results;
}


get Administrative() {
    const seg = [...this.librfile.matchAll(Administrative)];
    return seg.map(i=>i.groups);
}

get Offense() {
    const seg = [...this.librfile.matchAll(Offense)];
    return seg.map(i=>i.groups);
}

get Property() {
    const seg = [...this.librfile.matchAll(Property)];
    return seg.map(i=>i.groups);
}

get PropertyDesc() {
    const seg = [...this.librfile.matchAll(PropertyDesc)];
    return seg.map(i=>i.groups)
}

get PropertyOffense(){
    const seg = [...this.librfile.matchAll(PropertyOffense)];
    return seg.map(i=>i.groups)
}

get Offender(){
    const seg = [...this.librfile.matchAll(Offender)];
    return seg.map(i=>i.groups)
}

get OffenderMotive(){
    const seg = [...this.librfile.matchAll(OffenderMotive)];
    return seg.map(i=>i.groups)
}

get Victim(){
    const seg = [...this.librfile.matchAll(Victim)];
    return seg.map(i=>i.groups)
}

get VictimInjury(){
    const seg = [...this.librfile.matchAll(VictimInjury)];
    return seg.map(i=>i.groups)
}

get VictimOffender(){
    const seg = [...this.librfile.matchAll(VictimOffender)];
    return seg.map(i=>i.groups)
}

get Arrestee(){
    const seg = [...this.librfile.matchAll(Arrestee)];
    return seg.map(i=>i.groups)
}

get ArresteeArmed(){
    const seg = [...this.librfile.matchAll(ArresteeArmed)];
    return seg.map(i=>i.groups)
}

get ArresteeStatute(){
    const seg = [...this.librfile.matchAll(ArresteeStatute)];
    return seg.map(i=>i.groups)
}


get Incidents() {
    return this.Administrative.map(i=>i.IncidentNumber.trim()).sort((a,b)=>a-b);
}

}

export { LIBRS };
