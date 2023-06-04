
//Segment Descriptor
//https://docs.librs.org/librs-spec#submission-header-00
const subheaderEx =/^(00)(.{20})(\d{8})(\d{6})(.{5})(.{10})(.{3})(\s{2})(ZZ)/g;

function getSubmissionHeader(flatfile){
     const r = flatfile.split(subheaderEx)
     
    return {
        //BPadding:r[0], 
        SegmentDescriptor:r[1],
        SubmittingAgency:r[2].trim(),
        SubmissionDate:r[3],
        ReportingPeriod:r[4],
        SoftwareID:r[5].trim(),
        SoftwareVersion:r[6].trim(),
        LIBRSSpecIndicator:r[7],
        //FutureExpansionBuffer:r[8],
        EndofSegmentMarker:r[9],
        //Padding:r[10]
    }
}

//Segment Administrative 10
//https://docs.librs.org/librs-spec#administrative-10
const administrative10 = /^(10)([I|D]{1})(.{9})(.{12})(.{12})(.{6})([\d|\s]{11})(.{1})([\d|\s]{8})(\s{20})(ZZ)/gm

function getAdministrative(flatfile){
    const r = flatfile.match(administrative10).map(i=>i.split(administrative10));
    let cache = [];
    r.forEach(i=>{
       const admin = {
        SegmentDescriptor:i[1],
        ActionType:i[2],
        ORINumber:i[3],
        IncidentNumber:i[4].trim(),
        LocationofIncident:i[5],
        StationDivisionPrecinct:i[6],
        IncidentDateHour:i[7],
        ClearedExceptionally:i[8],
        ExceptionalClearanceDate:i[9].trim(),
        //FutureExpansionBuffer:r[10],
        EndofSegmentMarker:i[11],
        //Padding:r[12]
       }
       cache.push(admin);
    });
    return cache;
}

//Segment Offense (20)
//https://docs.librs.org/librs-spec#offense-20
const offense10 = /^(20)([I|D]{1})(.{9})(.{12})(\d{3})(.{12})([A|C]{1})(\d{3})(\d{2})([\d|\s]{2})([F|N|\s]{1})(.{3})(.{9})(.{3})(.{2})(\s{15})(ZZ)/gm

function getOffense(flatfile){
    const r = flatfile.match(offense10).map(i=>i.split(offense10));
    let cache = [];
    r.forEach(i=>{
        const admin = {
            SegmentDescriptor:i[1],
            ActionType:i[2],
            ORINumber:i[3],
            IncidentNumber:i[4].trim(),
            OffenseSequenceNumber:i[5],
            LouisianaRevisedStatuteNumber:i[6].trim(),
            OffenseAttemptedCompleted:i[7],
            OffenseConnectedtoVictimSequenceNumber:i[8],
            LocationType:i[9],
            NumberofPremisesEntered:i[10].trim(),
            MethodofEntry:i[11].trim(),
            TypeofCriminalActivityGang:i[12].trim(),
            TypeofWeaponForceInvolved:i[13].trim(),
            AgencySuppliedNIBRSCode:i[14],
            InchoateModifier:i[15].trim(),
            //FutureExpansionBuffer:r[16],
            EndofSegmentMarker:i[17],
            //Padding:r[18]
        }
        cache.push(admin);
    });
    return cache;
}

export {
    getSubmissionHeader,
    getAdministrative,
    getOffense
}