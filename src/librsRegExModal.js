const librsvalidationtxt = "https://api.librs.org/api/validate/txt"

const segments ={
       segsubheader:"(?<SegmentDescriptor>^00)",
       segadministrative:"(?<SegmentDescriptor>^10)",
       segoffense:"(?<SegmentDescriptor>^20)",
       segproperty:"(?<SegmentDescriptor>^30)",
       segpropertydesc:"(?<SegmentDescriptor>^31)",
       segpropertyoffense:"(?<SegmentDescriptor>^33)",
       segoffender:"(?<SegmentDescriptor>^40)",
}


const ControlDataElements ={
    c1:"(?<SegmentDescriptor>^[0-8]{2})",
    c2:"(?<SubmittingAgency>.{20})",
    c3:"(?<SubmissionDate>\\d{8})",
    c4:"(?<ReportingPeriod>\\d{6})",
    c5:"(?<ActionType>[ID]{1})",
    c8:"(?<EndofSegmentMarker>ZZ)",
    c9:"(?<Padding>\\s)",
    c10:"(?<SoftwareID>.{5})",
    c11:"(?<SoftwareVersion>.{10})",
    c12:"(?<LIBRSSpecIndicator>.{3})"
}

const MiscNumbers = {
    n1:"(?<ORINumber>.{9})",
    n2:"(?<IncidentNumber>.{12})",
    n3:"(?<LouisianaRevisedStatuteNumber>.{12})",
    n4:"(?<AgencySuppliedNIBRSCode>[\\w\\d\\s]{3})",
    n5:"(?<InchoateModifier>[-ACISH\\s]{2})"
}

const DataElements ={
    1:regExGroup("ORINumber",".{9}"),
    2:"(?<IncidentNumber>.{12})",
    6:"(?<LouisianaRevisedStatuteNumber>.{12})",
    "8A":regExGroup("BiasMotivation","[\\d\\s]{2}"),
    14:"(?<TypeofPropertyLoss>[1-8\\s]{1})",
    15:"(?<PropertyDescriptionType>[0-9\\s]{2})",
    16:"(?<ValueofProperty>[\\s\\d]{9})",
    17:"(?<DateRecovered>[\\s\\d]{8})",
    20:"(?<SuspectedDrugType>[ABC1DEFGHIJKLMNOPU\\s]{2})",
    21:"(?<EstimatedDrugQuantity>[\\s\\d\\s]{13})",
    22:"(?<TypeDrugMeasurement>[GMKOZLBTFDUNPX\\s]{2})",
    P1:"(?<PropertySequenceNumber>\\d{3})",
    P1R:"(?<PropertySequenceNumberReference>\\d{3})",
    L6R:"(?<OffenseSequenceNumberReference>\\d{3})",
    36:"(?<OffenderSequenceNumber>\\d{3})",
    37:"(?<AgeofOffender>[\\d\\s]{3})",
    L37:"(?<DateofBirthofOffender>[\\d\\s]{8})",
    38:regExGroup("SexofOffender","[FMU\\s]{1}"),
    39:regExGroup("RaceofOffender","[WBIAU\\s]{1}"),
    "39A":regExGroup("EthnicityofOffender","[HNU\\s]{1}"),
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
        MiscNumbers.n1 +
        MiscNumbers.n2 +
        "(?<OffenseSequenceNumber>\\d{3})"+
        MiscNumbers.n3+
        "(?<OffenseAttemptedCompleted>[AC]{1})"+
        "(?<OffenseConnectedtoVictimSequenceNumber>\\d{3})"+
        "(?<LocationType>\\d{2})"+
        "(?<NumberofPremisesEntered>[\\d\\s]{2})"+
        "(?<MethodofEntry>[FN\\s]{1})"+
        "(?<TypeofCriminalActivityGang>[BCDEIOPTUXAFIS\\s]{3})"+
        "(?<TypeofWeaponForceInvolved>[0-9A\\s]{9})"+
        MiscNumbers.n4 +
        MiscNumbers.n5+
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
    DataElements[1]+
    DataElements[2]+
    DataElements[14]+
    DataElements[15]+
    DataElements[16]+
    DataElements[17]+
    DataElements[20]+
    DataElements[21]+
    DataElements[22]+
    DataElements.P1+
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
      DataElements[1]+
      DataElements[2]+
      DataElements.P1R+
      DataElements.L6R+
      FutureExpansionBuffer(20)+
    ControlDataElements.c8
,"gm")


//Segment Offender (40)
//https://docs.librs.org/librs-spec#offender-40

const Offender =  new RegExp(
      segments.segoffender+
      ControlDataElements.c5+
      DataElements[1]+
      DataElements[2]+
      DataElements[36]+
      DataElements[37]+
      DataElements.L37+
      DataElements[38]+
      DataElements[39]+
      DataElements["8A"]+
      DataElements["39A"]+
      FutureExpansionBuffer(19)+ //specs say length is 20, but only works with length 19
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
    SubmissionHeader,
    Administrative,
    Offense,
    Property,
    PropertyDesc,
    PropertyOffense,
    Offender
}
