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
    Arrestee

} from './librsRegExModal';


class LIBRS {

    #arrestee60 = /^(60)([ID]{1})(.{9})(.{12})(\d{3})(.{12})(.{15})(.{20})([\s\d]{8})([OST\s]{1})([MCN\s]{1})([\d\s]{3})([\d\s]{8})([MF\s]{1})([WBIAU\s]{1})([HNU\s]{1})([RNU\s]{1})([DJWPA\s]{1})([YN\s]{1})(\s{17})(ZZ)/gm;
    #arresteearmed61 = /^(61)([ID]{1})(.{9})(.{12})(\d{3})([\d\sA]{3})(\s{20})(ZZ)/gm;
    #arresteestatute62 = /^(62)([ID]{1})(.{9})(.{12})(\d{3})(.{12})([\d\w\s]{15})([\d\w]{3})([-ACISH\s]{2})(\s{15})(ZZ)/gm;
    

    constructor(librfile){
        this.librfile = librfile;
    
    }



//Arrestee (60)
//https://docs.librs.org/librs-spec#arrestee-60
#getArrestee(){
    let r = this.librfile.match(this.#arrestee60).map(i=>i.split(this.#arrestee60));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1],
        ActionType:i[2],
        ORINumber:i[3],
        IncidentNumber:i[4].trim(),
        ArrestSequenceNumber:i[5],
        ArrestNumberLocalBookingNumber:i[6].trim(),
        ArrestTransactionNumber:i[7].trim(),
        ArresteeName:i[8].trim(),
        ArrestDate:i[9].trim(),
        ArrestType:i[10].trim(),
        MultipleArresteeSegmentIndicator:i[11].trim(),
        Age:i[12].trim(),
        DateofBirth:i[13].trim(),
        Sex:i[14].trim(),
        Race:i[15].trim(),
        Ethnicity:i[16].trim(),
        ResidentStatus:i[17].trim(),
        DispositionofArresteeUnder18:i[18].trim(),
        ClearanceIndicator:i[19].trim(),
        //FutureExpansionBuffer:r[20],
        EndofSegmentMarker:i[21],
        //Padding:r[22]
       }
       cache.push(seg);
    });
    return cache;
}


//Arrestee Armed (61)
//https://docs.librs.org/librs-spec#arrestee-armed-61
#getArresteeArmed(){
    let r = this.librfile.match(this.#arresteearmed61).map(i=>i.split(this.#arresteearmed61));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1].trim(),
        ActionType:i[2].trim(),
        ORINumber:i[3].trim(),
        IncidentNumber:i[4].trim(),
        ArresteeSequenceNumber:i[5].trim(),
        ArresteeArmedWithatTimeofArrest:i[6].trim(),
        //FutureExpansionBuffer:r[7],
        EndofSegmentMarker:i[8].trim(),
        //Padding:r[9]
       }
       cache.push(seg);
    });
    return cache;
}

//Arrestee Statute (62)
//https://docs.librs.org/librs-spec#arrestee-statute-62
#getArresteeStatute(){
    let r = this.librfile.match(this.#arresteestatute62).map(i=>i.split(this.#arresteestatute62));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1].trim(),
        ActionType:i[2].trim(),
        ORINumber:i[3].trim(),
        IncidentNumber:i[4].trim(),
        ArresteeSequenceNumber:i[5].trim(),
        LouisianaRevisedStatuteNumberofArrest:i[6].trim(),
        ArrestConnectiontoOffense:i[7].trim(),
        AgencySuppliedNIBRSCode:i[8].trim(),
        InchoatesModifier:i[9].trim(),
        //FutureExpansionBuffer:r[10],
        EndofSegmentMarker:i[11].trim(),
        //Padding:r[12]
       }
       cache.push(seg);
    });
    return cache;
}

get SubmissionHeader() {
    const seg = [...this.librfile.matchAll(SubmissionHeader)];
    return seg.map(i=>i.groups);
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
    return this.arresteearmed;
}

get ArresteeStatute(){
    return this.arresteestatute;
}


get Incidents() {
    return this.Administrative.map(i=>i.IncidentNumber.trim()).sort((a,b)=>a-b);
}

}

export { LIBRS };
