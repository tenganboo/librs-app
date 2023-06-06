function formatLibrsSubmissionDate(sdate){
    const [librssubdate] = [...sdate.matchAll(/(?<month>[0-9]{2})(?<year>[0-9]{4})/gm)];
    return librssubdate.groups.month + "-" + librssubdate.groups.year;
}
    

export {
    formatLibrsSubmissionDate
}