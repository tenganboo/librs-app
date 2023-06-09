import {
    segments,
    ControlDataElements,
    DataElements,
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
    ArresteeStatute,
    SegmentName 

} from './librsRegExModal';


class LIBRS {

    constructor(librfile){
        this.librfile = librfile;
    }
 

Segments(incidentno){
    let cache = [];
    Object.keys(segments).forEach(s=>{
          const segex = new RegExp(
            segments[s]+
            ControlDataElements.c5+
            DataElements[1]+
            incidentno + "\\s"
            ,"gm")

           const mex = this.librfile.match(segex);
           if(mex !==null){
            cache.push(...mex.map(i=>i.match(/^\d{2}/)[0]))
           }
           else{
            return;
           }
    })
    return cache;
}

get SegmentName() {
    return SegmentName;
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
