//LIBRS FlatFile Reader
//LIBRS SPECS https://docs.librs.org/librs-spec
//LIBRS Validator https://api.librs.org/
//API POST https://api.librs.org/api/validate/txt
//LIBRS UPLOAD https://ftp.lsa.org/webclient/Login.xhtml
//LIBRS CODES https://github.com/bttruman/winlibrs-docs/tree/master/_data


import {DispositionArresteeUnder18} from './nibrsAllowedEntries'
const librsvalidationtxt = "https://api.librs.org/api/validate/txt"

const SegmentName = {  
                 10:"Administrative",
                 20:"Offense",
                 30:"Property",
                 31:"PropertyDesc",
                 33:"PropertyOffense",
                 40:"Offender",
                 41:"OffenderMotive",
                 50:"Victim",
                 51:"VictimInjury",
                 52:"VictimOffender",
                 60:"Arrestee",
                 61:"ArresteeArmed",
                 62:"ArresteeStatute" 
}

const segments ={
       segsubheader:"(?<SegmentDescriptor>^00)",
       segadministrative:"(?<SegmentDescriptor>^10)",
       segoffense:"(?<SegmentDescriptor>^20)",
       segproperty:"(?<SegmentDescriptor>^30)",
       segpropertydesc:"(?<SegmentDescriptor>^31)",
       segpropertyoffense:"(?<SegmentDescriptor>^33)",
       segoffender:"(?<SegmentDescriptor>^40)",
       segoffendermotive:regExGroup("SegmentDescriptor","^41"),
       segvictim:regExGroup("SegmentDescriptor","^50"),
       segvictiminjury:regExGroup("SegmentDescriptor","^51"),
       segvictimoffender:regExGroup("SegmentDescriptor","^52"),
       segarrestee:regExGroup("SegmentDescriptor","^60"),
       segarresteearmed:regExGroup("SegmentDescriptor","^61"),
       segarresteestatute:regExGroup("SegmentDescriptor","^62"),
}

const ControlDataElements ={
    c1:"(?<SegmentDescriptor>^[0-8]{2})",
    c2:"(?<SubmittingAgency>.{20})",
    c3:"(?<SubmissionDate>\\d{8})",
    c4:"(?<ReportingPeriod>\\d{6})",
    c5:"(?<ActionType>[ID]{1})",
    c6:regExGroup("ClearanceIndicator","[YN\\s]{1}"),
    c8:regExGroup("EndofSegmentMarker","ZZ"),
    c9:"(?<Padding>\\s)",
    c10:"(?<SoftwareID>.{5})",
    c11:"(?<SoftwareVersion>.{10})",
    c12:"(?<LIBRSSpecIndicator>.{3})"
}

const MiscNumbers = {
    n1:"(?<ORINumber>.{9})",
    n2:"(?<IncidentNumber>.{12})",
    n3:"(?<LRSNumber>.{12})",
    n4:"(?<NIBRSCode>[\\w\\d\\s]{3})",
    n5:"(?<InchoateModifier>[-ACISH\\s]{2})"
}

const DataElements ={
    1:regExGroup("ORINumber",".{9}"),
    2:"(?<IncidentNumber>.{12})",
    6:"(?<LRSNumber>.{12})",
    7:  "(?<AttemptedCompleted>[AC]{1})",
    L6:"(?<OffenseSequence>\\d{3})",
    L6R:"(?<OffenseSequenceNumberReference>\\d{3})",
    N6:regExGroup("NIBRSCode","[\\w\\d\\s]{3}"),
    8:regExGroup("OffenderMotivation","[ACDGN\\s]{4}"),
    "8A":regExGroup("BiasMotivation","[\\d\\s]{2}"),
    9:"(?<LocationType>\\d{2})",
    10:"(?<NumberofPremisesEntered>[\\d\\s]{2})",
    11:"(?<MethodofEntry>[FN\\s]{1})",
    12:"(?<TypeofCriminalActivityGang>[BCDEIOPTUXAFIS\\s]{3})",
    13:"(?<TypeofWeaponForceInvolved>[0-9A\\s]{9})",
    14:"(?<TypeofPropertyLoss>[1-8\\s]{1})",
    15:"(?<PropertyDescriptionType>[0-9\\s]{2})",
    16:"(?<ValueofProperty>[\\s\\d]{9})",
    17:"(?<DateRecovered>[\\s\\d]{8})",
    20:"(?<SuspectedDrugType>[ABC1DEFGHIJKLMNOPU\\s]{2})",
    21:"(?<EstimatedDrugQuantity>[\\s\\d\\.]{13})",
    22:"(?<TypeDrugMeasurement>[GMKOZLBTFDUNPX\\s]{2})",
    23:regExGroup("VictimSequenceNumber","\\d{3}"),
    24:regExGroup("OffVictimSequence","\\d{3}"),
    25:regExGroup("VictimType","[IBFGLRSOU\\s]{1}"),
    "25A":regExGroup("TypeofOfficerActivityCircumstance","[1-11\\s]{2}"),
    "25B":regExGroup("OfficerAssignmentType","[FGHIJKL\\s]{1}"),
    "25C":regExGroup("OfficerORIOtherJurisdiction",".{9}"),
    26:regExGroup("Age","[\\d\\s]{3}"),
    L26:regExGroup("DateofBirth","[\\d\\s]{8}"),
    27:regExGroup("Sex","[FMU\\s]{1}"),
    28:regExGroup("Race","[WBIAU\\s]{1}"),
    29:regExGroup("Ethnicity","[HNU\\s]{1}"),
    30:regExGroup("ResidentStatus","[RNU\\s]{1}"),
    31:regExGroup("AggravatedAssault","[1-40\\s]{4}"),
    32:regExGroup("AdditionalJustifiableHomicideCircumstance","[ABCDEFG\\s]{4}"),
    33:regExGroup("InjuryType","[NBILMOTU\\s]{1}"),
    34:regExGroup("OffenderNumbertobeRelated","\\d{3}"),
    35:regExGroup("RelationshipofVictimtoOffender","[\\w\\s]{2}"),
    36:"(?<OffenderSequenceNumber>\\d{3})",
    37:"(?<AgeofOffender>[\\d\\s]{3})",
    L37:"(?<DateofBirthofOffender>[\\d\\s]{8})",
    38:regExGroup("SexofOffender","[FMU\\s]{1}"),
    39:regExGroup("RaceofOffender","[WBIAU\\s]{1}"),
    "39A":regExGroup("EthnicityofOffender","[HNU\\s]{1}"),
    40:regExGroup("ArrestSequenceNumber","\\d{3}"),
    L40:regExGroup("ArresteeName",".{20}"),
    41:regExGroup("ArrestNumberLocalBookingNumber",".{12}"),
    42:regExGroup("ArrestDate","[\\d\\s]{8}"),
    43:regExGroup("ArrestType","[OST\\s]{1}"),
    44:regExGroup("MultipleArresteeSegmentIndicator","[MCN\\s]{1}"),
    get 45(){return this[6]}, //Louisiana Revised Statute Number of Arrest
    L45:regExGroup("ArrestConnectiontoOffense",".{15}"),
    get N45(){return this["N6"]}, //Agency Supplied NIBRS Code
    46:regExGroup("ArresteeArmedWithatTimeofArrest","[0-7A\\s]{3}"),
    get 47(){return this[26]}, //Age (At Time of Arrest)
    get L47(){return this.L26}, //Date of Birth
    get 48() {return this[27]}, //Sex
    get 49() {return this[28]}, //Race,
    get 50(){return this[29]}, //Ethnicity
    get 51(){return this[30]}, //Resident Status
    52:regExGroup("DispositionofArresteeUnder18",`[${Object.keys(DispositionArresteeUnder18).join("")}\\s]{1}`),
    L55:regExGroup("ArrestTransactionNumber",".{15}"),
    70:regExGroup("InchoateModifier","[-ACISH\\s]{2}"),
    P1:"(?<PropertySequenceNumber>\\d{3})",
    P1R:"(?<PropertySequenceNumberReference>\\d{3})",
}



//Segment Submission Header
//https://docs.librs.org/librs-spec#submission-header-00
const SubmissionHeader = new RegExp(
    segments.segsubheader + 
    ControlDataElements.c2 +  
    ControlDataElements.c3  +
    ControlDataElements.c4  +
    ControlDataElements.c10  +
    ControlDataElements.c11+
    ControlDataElements.c12 +
    FutureExpansionBuffer(2)+
    ControlDataElements.c8
    ,"gm");

//Segment Administrative 10
//https://docs.librs.org/librs-spec#administrative-10
const Administrative = new RegExp(
    segments.segadministrative +
    ControlDataElements.c5 + 
    MiscNumbers.n1 +
    MiscNumbers.n2 +
    "(?<LocationofIncident>[\\s\\d]{12})"+
    "(?<StationDivisionPrecinctIdentifier>.{6})"+
    "(?<IncidentDateHour>[\\d\\s]{11})"+
    "(?<ClearedExceptionally>[ABCDEON]{1})"+
    "(?<ExceptionalClearanceDate>[\\s\\d]{8})"+
    FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm");

//Segment Offense (20)
//https://docs.librs.org/librs-spec#offense-20
const Offense = new RegExp(
        segments.segoffense+
        ControlDataElements.c5+
        [1,2,"L6",6,7,24,9,10,11,12,13,"N6",70].map(i=>DataElements[i]).join("")+
        FutureExpansionBuffer(15)+ //specs say length is 14, but only works with length 15
        ControlDataElements.c8
,"gm");

//Segment Property (30)
//https://docs.librs.org/librs-spec#property-30
const Property = new RegExp(
    segments.segproperty+
    ControlDataElements.c5+
    MiscNumbers.n1 +
    MiscNumbers.n2 +
    "(?<NumberofStolenMotorVehicles>[\\d\\s]{2})"+
    "(?<NumberofRecoveredMotorVehicles>[\\d\\s]{2})"+
    FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm");

//Segment Property Description (31)
//https://docs.librs.org/librs-spec#property-description-31
const PropertyDesc = new RegExp(
    segments.segpropertydesc+
    ControlDataElements.c5+
    [1,2,14,15,16,17,20,21,22,"P1"].map(i=>DataElements[i]).join("")+
    FutureExpansionBuffer(17)+
    ControlDataElements.c8
,"gm")


//Segment Property Modification (32)
//https://docs.librs.org/librs-spec#property-modification-32
//TODO


//Segment Property Offense (33)
//https://docs.librs.org/librs-spec#propertyoffense-33
const PropertyOffense = new RegExp(
      segments.segpropertyoffense+
      ControlDataElements.c5+
      [1,2,"P1R","L6R"].map(i=>DataElements[i]).join("")+
      FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm")


//Segment Offender (40)
//https://docs.librs.org/librs-spec#offender-40

const Offender =  new RegExp(
      segments.segoffender+
      ControlDataElements.c5+
      [1,2,36,37,"L37",38,39,"8A","39A"].map(i=>DataElements[i]).join("")+
      FutureExpansionBuffer(19)+ //specs say length is 20, but only works with length 19
      ControlDataElements.c8
,"gm")


//Segment Offender Using/Gaming Motivation (41)
//https://docs.librs.org/librs-spec#offender-usinggaming-motivation-41
const OffenderMotive = new RegExp(
      segments.segoffendermotive+
      ControlDataElements.c5+
      [1,2,36,8].map(i=>DataElements[i]).join("")+
      FutureExpansionBuffer(17)+ //specs say length is 20, but only works with length 17
      ControlDataElements.c8
,"gm")


//Segment Victim (50)
//https://docs.librs.org/librs-spec#victim-50
const Victim = new RegExp(
    segments.segvictim+
    ControlDataElements.c5+
    [1,2,23,25,26,"L26",27,28,29,30].map(i=>DataElements[i]).join("")+
    regExGroup("DeprecatedDataElement","\\s{2}")+
    [32,"25A","25B","25C"].map(i=>DataElements[i]).join("")+
    FutureExpansionBuffer(7)+ //specs say length is 6, but only works with length 7
    ControlDataElements.c8
,"gm")


//Segment Victim Injury (51)
//https://docs.librs.org/librs-spec#victim-injury-51
const VictimInjury = new RegExp(
    segments.segvictiminjury+
    ControlDataElements.c5+
    [1,2,23,33].map(i=>DataElements[i]).join("")+
    FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm")


//Victim/Offender Relation (52)
//https://docs.librs.org/librs-spec#victimoffender-relation-52
const VictimOffender = new RegExp(
    segments.segvictimoffender+
    ControlDataElements.c5+
    [1,2,23,34,35].map(i=>DataElements[i]).join("")+
    FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm")

//Arrestee (60)
//https://docs.librs.org/librs-spec#arrestee-60
const Arrestee = new RegExp(
    segments.segarrestee+
    ControlDataElements.c5+
    [1,2,40,41,"L55","L40",42,43,44,47,"L47",48,49,50,51,52].map(i=>DataElements[i]).join("")+
    ControlDataElements.c6+
    FutureExpansionBuffer(17)+
    ControlDataElements.c8
,"gm")

//Arrestee Armed (61)
//https://docs.librs.org/librs-spec#arrestee-armed-61
const ArresteeArmed = new RegExp(
    segments.segarresteearmed+
    ControlDataElements.c5+
    [1,2,40,46].map(i=>DataElements[i]).join("")+
    FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm")

//Arrestee Statute (62)
//https://docs.librs.org/librs-spec#arrestee-statute-62
const ArresteeStatute = new RegExp(
    segments.segarresteestatute+
    ControlDataElements.c5+
    [1,2,40,45,"L45","N45",70].map(i=>DataElements[i]).join("")+
    FutureExpansionBuffer(15)+
    ControlDataElements.c8
,"gm")

function FutureExpansionBuffer(buffersize){
   return `(?<FutureExpansionBuffer>\\s{${buffersize}})`;
}

function regExGroup(label,pattern){
    return `(?<${label}>${pattern})`;
}

export {
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
}
