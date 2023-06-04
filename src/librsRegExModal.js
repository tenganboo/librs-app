
const segments ={
       segsubheader:"(?<SegmentDescriptor>^00)",
       segadministrative:"(?<SegmentDescriptor>^10)",
       segoffense:"(?<SegmentDescriptor>^20)",
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

function FutureExpansionBuffer(buffersize){
   return `(?<FutureExpansionBuffer>\\s{${buffersize}})`;
}

export {
    segments,
    ControlDataElements,
    SubmissionHeader,
    Administrative,
    Offense
}
