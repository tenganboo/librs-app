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
    Property
} from './librsRegExModal';


class LIBRS {

    #propertyDesc31 =/(31)([ID]{1})(.{9})(.{12})([1-8|\s]{1})([\d|\s]{2})([\s|\d]{9})([\s|\d]{8})(.{2})(.{13})(.{2})(\d{3})(\s{17})(ZZ)/gm;
    #propertyOff33 =/^(33)([ID]{1})(.{9})(.{12})(\d{3})(\d{3})(.{20})(ZZ)/gm;
    #offender40 =/^(40)([ID]{1})(.{9})(.{12})(\d{3})([\s|\d]{3})([\d|\s]{8})([\s|\w]{1})([\s|\w]{1})(\d{2})([\s|\w]{1})(\s{19})(ZZ)/gm;
    #offenderMotiv41 = /^(41)([ID]{1})(.{9})(.{12})(\d{3})([ACDGN|\s]{4})(\s{17})(ZZ)/gm;
    #victim50 = /^(50)([ID]{1})(.{9})(.{12})(\d{3})(\w{1})([\d|\s]{3})([\s|\d]{8})([MFU\s]{1})([WBIAPU\s]{1})([HNU\s]{1})([RNU\s]{1})([\s\d]{4})(\s{2})(.{1})([\s|\d]{2})([\s|\s]{1})(.{9})(\s{6})(ZZ)/gm;
    #vicitiminjury51 = /^(51)([ID]{1})(.{9})(.{12})(\d{3})([NBILMOTU\s]{1})(\s{20})(ZZ)/gm;
    #victimoffender52 = /^(52)([ID]{1})(.{9})(.{12})(\d{3})(\d{3})(\w{2})(\s{20})(ZZ)/gm;
    #arrestee60 = /^(60)([ID]{1})(.{9})(.{12})(\d{3})(.{12})(.{15})(.{20})([\s\d]{8})([OST\s]{1})([MCN\s]{1})([\d\s]{3})([\d\s]{8})([MF\s]{1})([WBIAU\s]{1})([HNU\s]{1})([RNU\s]{1})([DJWPA\s]{1})([YN\s]{1})(\s{17})(ZZ)/gm;
    #arresteearmed61 = /^(61)([ID]{1})(.{9})(.{12})(\d{3})([\d\sA]{3})(\s{20})(ZZ)/gm;
    #arresteestatute62 = /^(62)([ID]{1})(.{9})(.{12})(\d{3})(.{12})([\d\w\s]{15})([\d\w]{3})([-ACISH\s]{2})(\s{15})(ZZ)/gm;
    

    constructor(librfile){
        this.librfile = librfile;
    
    }



//Segment Property Description (31)
//https://docs.librs.org/librs-spec#property-description-31
#getpropertyDesc(){
    const r = this.librfile.match(this.#propertyDesc31).map(i=>i.split(this.#propertyDesc31));
    let cache = [];
    r.forEach(i=>{
        const seg = {
            SegmentDescriptor:i[1],
            ActionType:i[2],
            ORINumber:i[3],
            IncidentNumber:i[4].trim(),
            TypeofPropertyLoss:i[5],
            PropertyDescriptionType:i[6].trim(),
            ValueofProperty:i[7].trim(),
            DateRecovered:i[8].trim(),
            SuspectedDrugType:i[9].trim(),
            EstimatedDrugQuantity:i[10].trim(),
            TypeDrugMeasurement:i[11].trim(),
            PropertySequenceNumber:i[12],
            //FutureExpansionBuffer:r[13],
            EndofSegmentMarker:i[14],
            //Padding:r[15]
        }
        cache.push(seg);
    });
    return cache;
}

//Segment Property Modification (32)
//https://docs.librs.org/librs-spec#property-modification-32

//Segment Property Offense (33)
//https://docs.librs.org/librs-spec#propertyoffense-33
#getpropertyOff(){
    const r = this.librfile.match(this.#propertyOff33).map(i=>i.split(this.#propertyOff33));
    let cache = [];
    r.forEach(i=>{
        const seg = {
            SegmentDescriptor:i[1],
            ActionType:i[2],
            ORINumber:i[3],
            IncidentNumber:i[4].trim(),
            PropertySequenceNumberReference:i[5],
            OffenseSequenceNumberReference:i[6],
            //FutureExpansionBuffer:r[7],
            EndofSegmentMarker:i[8],
            //Padding:r[9]
        }
        cache.push(seg);
    });
    return cache;
}


//Segment Offender (40)
//https://docs.librs.org/librs-spec#age-of-offender-37
#getOffender(){
    const r = this.librfile.match(this.#offender40).map(i=>i.split(this.#offender40));
    let cache = [];
    r.forEach(i=>{
        const seg = {
            SegmentDescriptor:i[1],
            ActionType:i[2],
            ORINumber:i[3],
            IncidentNumber:i[4].trim(),
            OffenderSequenceNumber:i[5],
            AgeofOffender:i[6].trim(),
            DateofBirthofOffender:i[7].trim(),
            SexofOffender:i[8].trim(),
            RaceofOffender:i[9].trim(),
            BiasMotivation:i[10],
            EthnicityofOffender:i[11].trim(),
            //FutureExpansionBuffer:r[12],
            EndofSegmentMarker:i[13],
            //Padding:r[14]
        }
        cache.push(seg);
    });
    return cache;
}

//Segment Offender Using/Gaming Motivation (41)
//https://docs.librs.org/librs-spec#offender-usinggaming-motivation-41
#getOffenderMotiv(){
    const r = this.librfile.match(this.#offenderMotiv41).map(i=>i.split(this.#offenderMotiv41));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1],
        ActionType:i[2],
        ORINumber:i[3],
        IncidentNumber:i[4].trim(),
        OffenderSequenceNumber:i[5],
        OffenderSuspectedofUsingGamingMotivation:i[6].trim(),
        //FutureExpansionBuffer:r[7],
        EndofSegmentMarker:i[8],
        //Padding:r[9]
       }
       cache.push(seg);
    });
    return cache;
}

//Segment Victim (50)
//https://docs.librs.org/librs-spec#victim-50
#getVictim(){
    const r = this.librfile.match(this.#victim50).map(i=>i.split(this.#victim50));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1].trim(),
        ActionType:i[2].trim(),
        ORINumber:i[3].trim(),
        IncidentNumber:i[4].trim(),
        VictimSequenceNumber:i[5].trim(),
        VictimType:i[6].trim(),
        Age:i[7].trim(),
        DateofBirth:i[8].trim(),
        Sex:i[9].trim(),
        Race:i[10].trim(),
        Ethnicity:i[11].trim(),
        ResidentStatus:i[12].trim(),
        AggravatedAssault:i[13].trim(),
        DeprecatedDataElement:i[14].trim(),
        AdditionalJustifiableHomicideCircumstance:i[15].trim(),
        TypeofOfficerActivityCircumstance:i[16].trim(),
        OfficerAssignmentType:i[17].trim(),
        OfficerORIOtherJurisdiction:i[18].trim(),
        //FutureExpansionBuffer:r[19],
        EndofSegmentMarker:i[20].trim(),
        //Padding:r[21]
       }
       cache.push(seg);
    });
    return cache;
}

//Segment Victim Injury (51)
//https://docs.librs.org/librs-spec#victim-injury-51
#getVictimInjury(){
    let r = this.librfile.match(this.#vicitiminjury51).map(i=>i.split(this.#vicitiminjury51));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1],
        ActionType:i[2],
        ORINumber:i[3],
        IncidentNumber:i[4].trim(),
        VictimSequenceNumber:i[5],
        InjuryType:i[6],
        //FutureExpansionBuffer:r[7],
        EndofSegmentMarker:i[8],
        //Padding:r[9]
       }
       cache.push(seg);
    });
    return cache;
}

//Victim/Offender Relation (52)
//https://docs.librs.org/librs-spec#victimoffender-relation-52
#getVictimOffender(){
    let r = this.librfile.match(this.#victimoffender52).map(i=>i.split(this.#victimoffender52));
    let cache = [];
    r.forEach(i=>{
       const seg = {
        SegmentDescriptor:i[1],
        ActionType:i[2],
        ORINumber:i[3],
        IncidentNumber:i[4].trim(),
        VictimSequenceNumber:i[5],
        OffenderNumbertobeRelated:i[6],
        RelationshipofVictimtoOffender:i[7],
        //FutureExpansionBuffer:r[8],
        EndofSegmentMarker:i[9],
        //Padding:r[10]
       }
       cache.push(seg);
    });
    return cache;
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
    return this.propertydesc;
}

get PropertyOff(){
    return this.propertyoff;
}

get Offender(){
    return this.offender;
}

get OffenderMotiv(){
    return this.offendermotiv ;
}

get Victim(){
    return this.victim;
}

get VictimInjury(){
    return this.victiminjury;
}

get VictimOffender(){
    return this.victimoffender;
}

get Arrestee(){
    return this.arrestee;
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
