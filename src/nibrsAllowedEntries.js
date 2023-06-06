const ClearedExceptionally = {
    A:"Death of Offender",
    B:"Prosecution Declined",
    C:"Extradition Denied",
    D:"Victim Refused to Cooperate",
    E:"Juvenile / No Custody",
    O:"Other (Administrative Closing)",
    N:"Not Applicable",
}

const OffenseAttemptedCompleted ={
    A:"Attempted",
    C:"Completed"
}


const LocationType = {
    1:"Air, Bus, Train or Terminal",
    2:"Bank, Savings and Loan (incl. other Financial Institutions)",
    3:"Bar or Night Club",
    4:"Church, Synagogue or Temple (includes other Religious Buildings..)",
    5:"Commercial or Office Building",
    6:"Construction Site",
    7:"Convenience Store",
    8:"Department or Discount Store",
    9:"Drug Store, Doctor's Office or Hospital (includes Medical Supply Building)",
    10:"Field or Woods",
    11:"Government or Public Building",
    12:"Grocery or Supermarket",
    13:"Highway, Road or Alley (includes Street)",
    14:"Hotel, Motel, Etc. (includes Temporary Lodgings)",
    15:"Jail or Prison",
    16:"Lake or Waterway",
    17:"Liquor Store",
    18:"Parking lot/Garage",
    19:"Rental storage Facility",
    20:"Residence/Home",
    21:"Restaurant",
    22:"School",
    23:"Service or Gas Station",
    24:"Specialty Store (incl. Fur Store, Jewelry Store, TV Store, Dress Shop, etc.)",
    25:"Other or Unknown (use only if no other code applies)",
    37:"Abandoned or Condemned Structure",
    38:"Amusement Park",
    39:"Arena, Stadium, Fairgrounds or Coliseum",
    40:"ATM Separate from Bank",
    41:"Auto Dealership (New or Used)",
    42:"Camp or Campground",
    44:"Daycare Facility",
    45:"Dock, Wharf, Freight or Modal Terminal",
    46:"Farm Facility",
    47:"Gambling Facility, Casino or Race Track",
    48:"Industrial Site",
    49:"Military Installation",
    50:"Park or Playground",
    51:"Rest Area",
    52:"School: College or University",
    53:"School: Elementary or Secondary",
    54:"Shelter: Mission or Homeless",
    55:"Shopping Mall",
    56:"Tribal Lands",
    57:"Community Center",
    58:"Cyberspace"
}


const MethodofEntry ={
    F:"Force",
    N:"No Force"
}

const TypeCriminalActivityCodes = {
    B:"Buying / Receiving",
    C:"Cultivation / Manufacturing / Publishing",
    D:"Distribution / Selling",
    E:"Exploiting Children",
    I:"Possession with Intent to Sell. Sent to NIBRS as code 'P'",
    O:"Operating/Promotion/Assisting",
    P:"Possessing/Concealing",
    T:"Transporting/Transmitting/Importing",
    U:"Using/Consuming",
    X:"Other. Sent to NIBRS as code 'P'",
    A:"Simple/Gross Neglect",
    F:"Organised Abuse",
    I:"Intentional Abuse and Torture",
    S:"Animal Sexual Abuse"}


const WeaponType ={
        11:"Firearm (type not stated)",
        12:"Handgun",
        13:"Rifle",
        14:"Shotgun",
        15:"Other Firearm",
        20:"Knife or Cutting Instrument",
        30:"Blunt Object",
        35:"Motor Vehicle / Vessel (When used as a weapon)",
        40:"Personal Weapons",
        50:"Poison",
        60:"Explosives",
        65:"Fire or Incendiary Device",
        70:"Drugs, Narcotics or Sleeping Pills",
        85:"Asphyxiation",
        90:"Other",
        95:"Unknown",
        99:"None (Mutually Exclusive to any other value)",
    }


const PropertyLossType = {
    1:"None",
    2:"Burned",
    3:"Counterfeited or Forged",
    4:"Destroyed, Damaged or Vandalized",
    5:"Recovered",
    6:"Seized",
    7:"Stolen, Etc.",
    8:"Unknown"
}

const PropertyDescription ={
    1:"Aircraft",
    2:"Alcohol",
    3:"Automobiles",
    4:"Bicycles",
    5:"Buses",
    6:"Clothes or Furs",
    7:"Computer Hardware or Software",
    8:"Consumable Goods",
    9:"Credit or Debit Cards",
    10:"Drugs or Narcotics",
    11:"Drug Narcotic Equipment",
    12:"Farm Equipment",
    13:"Firearms",
    14:"Gambling Equipment",
    15:"Heavy Construction or Industrial Equipment",
    16:"Household Goods",
    17:"Jewelry, Precious Metals",
    18:"Livestock",
    19:"Merchandise",
    20:"Money",
    21:"Negotiable Instruments",
    22:"Non-negotiable Instruments",
    23:"Office-type Equipment",
    24:"Other Motor Vehicles",
    25:"Purses, Handbags or Wallets",
    26:"Radios, TVs, VCRs or Cameras",
    27:"Recordings: Audio or Visual",
    28:"Recreational Vehicles",
    29:"Structures: Single Occupancy Dwellings",
    30:"Structures: Other Dwellings",
    31:"Structures: Other Commercial/Business",
    32:"Structures :Industrial/Manufacturing",
    33:"Structures: Public/Community",
    34:"Structures: Storage",
    35:"Structures: Other",
    36:"Tools",
    37:"Trucks",
    38:"Vehicle Parts or Accessories",
    39:"Watercraft",
    41:"Aircraft Parts/Accessories",
    42:"Artistic Supplies/Accessories",
    43:"Building Materials",
    44:"Camping/Hunting/Fishing Equipment/Supplies",
    45:"Chemicals",
    46:"Collections/Collectibles",
    47:"Crops",
    48:"Documents/Personal or Business",
    49:"Explosives",
    59:"Firearm Accessories",
    64:"Fuel",
    65:"Identity Documents",
    66:"Identity–Intangible",
    67:"Law Enforcement Equipment",
    68:"Lawn/Yard/Garden Equipment",
    69:"Logging Equipment",
    70:"Medical/Medical Lab Equipment",
    71:"Metals, Non-Precious",
    72:"Musical Instruments",
    73:"Pets",
    74:"Photographic/Optical Equipment",
    75:"Portable Electronic Communications",
    76:"Recreational/Sports Equipment",
    77:"Other",
    78:"Trailers",
    79:"Watercraft Equipment/Parts/Accessories",
    80:"Weapons–Other",
    88:"Pending Inventory",
    99:"Special category used by the National UCR program to compile statistics."
}

const SuspectedDrugType = {
    A:"'Crack' Cocaine",
    B:"Cocaine",
    C:"Hashish",
    1:"Hash Oil (LIBRS Only). Sent to NIBRS as 'C'",
    D:"Heroin",
    E:"Marijuana",
    F:"Morphine",
    G:"Opium",
    H:"Other Narcotics",
    I:"LSD",
    J:"PCP",
    K:"Other Hallucinogens",
    L:"Amphetamines / Methamphetamines",
    M:"Other Stimulants",
    N:"Barbiturates",
    O:"Other Depressants",
    P:"Other Drugs",
    U:"Unknown Type Drug",
}

const TypeDrugMeasurement = {
    GM:"Gram",
    KG:"Kilogram",
    OZ:"Ounce",
    LB:"Pound",
    ML:"Milliliter",
    LT:"Liter",
    FO:"Fluid Ounce",
    GL:"Gallon",
    DU:"Dosage Units, Items (Number of Capsules, Pills, Tablets, Etc.)",
    NP:"Number of Plants (e.g., Marijuana Plants (Bushes), Etc.)",
    XX:"Not Reported or Unknown",
}

const Sex = {
     M:"Male",
     F:"Female",
     U:"Unkown"
}

const Race = {
    W:"White",
    B:"Black",
    I:"American Indian / Alaskan Native",
    A:"Asian/Pacific Islander",
    U:"Unknown"
}

const Bias ={
    11:"Anti-White",
    12:"Anti-Black or African American",
    13:"Anti-American Indian / Alaskan Native",
    14:"Anti-Asian",
    15:"Anti-Multiple Races, Group",
    16:"Anti-Native Hawaiian or Other Pacific Islander",
    31:"Anti-Arab",
    32:"Anti-Hispanic or Latino",
    33:"Anti-Other Race/Ethnicity/Ancestry",
    21:"Anti-Jewish",
    22:"Anti-Catholic",
    23:"Anti-Protestant",
    24:"Anti-Islamic (Muslim)",
    25:"Anti-Other Religion",
    26:"Anti-Multiple Religions, Group",
    27:"Anti-Atheism/Agnosticism",
    28:"Anti-Mormon",
    29:"Anti-Jehovah’s Witness",
    81:"Anti-Eastern Orthodox (Russian, Greek, Other)",
    82:"Anti-Other Christian",
    83:"Anti-Buddhist",
    84:"Anti-Hindu",
    85:"Anti-Sikh",
    41:"Anti-Gay (Male)",
    42:"Anti-Lesbian (Female)",
    43:"Anti-Lesbian, Gay, Bisexual or Transgender (Mixed Group)",
    44:"Anti-Heterosexual",
    45:"Anti-Bisexual",
    51:"Anti-Physical Disability",
    52:"Anti-Mental Disability",
    61:"Anti-Male",
    62:"Anti-Female",
    71:"Anti-Transgender",
    72:"Anti-Gender Non-Conforming",
    88:"None (No Bias)",
    99:"Unknown (Offender’s Motivation Not Known)",
}

const Ethnicity = {
    H:"Hispanic Origin",
    N:"Not of Hispanic Origin",
    U:"Unknown",
}

const OffenderMotivation = {
    A:"Alcohol",
    C:"Computer Equipment",
    D:"Drugs/Narcotics",
    G:"Gaming Activity Motive for Crime",
    N:"Not Applicable (LIBRS Only)",
}

const VictimType = {
    I:"Individual",
    B:"Business",
    F:"Financial Institution",
    G:"Government",
    L:"Law Enforcement Officer (LIBRS Only)",
    R:"Religious Organization",
    S:"Society/Public",
    O:"Other",
    U:"Unknown",
}

const ResidenceStatus = {
    R:"Resident",
    N:"Nonresident",
    U:"Unknown",
}

const JustifiableHomicideCircumstance ={
    A:"Criminal Attacked Police Officer and That Officer Killed Criminal",
    B:"Criminal Attacked Police Officer and Criminal Killed by Another Police Officer",
    C:"Criminal Attacked by Civilian",
    D:"Criminal Attempted Flight from a Crime",
    E:"Criminal Killed in the Commission of a Crime",
    F:"Criminal Resisted Arrest",
    G:"Unable to Determine / Not Enough Information",
}

const AggravatedAssaultHomicideCircumstance={
    1:"Argument",
    2:"Assault on Law enforcement Officer(s)",
    3:"Drug Dealing",
    4:"Gangland",
    5:"Juvenile Gang",
    6:"Domestic Violence",
    7:"Mercy Killing (Not applicable to aggravated assault)",
    8:"Other Felony Involved",
    9:"Other Circumstances",
    10:"Unknown Circumstances",
    20:"Criminal Killed by Private Citizen",
    21:"Criminal Killed by Police Office",
    30:"Child Playing with Weapon",
    31:"Gun-Cleaning Accident",
    32:"Hunting Accident",
    33:"Other Negligent Weapon Handling",
    34:"Other Negligent Killing",
    40:"Child Abuse (LIBRS Only)",

}

const OfficerAssignmentTypes ={
    F:"Two-Officer Vehicle",
    G:"One-Officer Vehicle (Alone)",
    H:"One-Officer Vehicle (Assisted)",
    I:"Detective or Special Assignment (Alone)",
    J:"Detective or Special Assignment (Assisted)",
    K:"Other (Alone)",
    L:"Other (Assisted)",
}

const InjuryType = {
    N:"None",
    B:"Apparent Broken Bones",
    I:"Possible Internal Injury",
    L:"Severe Laceration",
    M:"Apparent Minor Injury",
    O:"Other Major Injury",
    T:"Loss of Teeth",
    U:"Unconsciousness",
}

const RelationshipsVictimsOffenders = {

    SE:"Victim Was Spouse",
    CS:"Victim Was Common-Law Spouse",
    PA:"Victim Was Parent",
    SB:"Victim Was Sibling",
    CH:"Victim Was Child",
    GP:"Victim Was Grandparent",
    GC:"Victim Was Grandchild",
    IL:"Victim Was In-Law",
    SP:"Victim Was Stepparent",
    SC:"Victim Was Stepchild",
    SS:"Victim Was Step-Sibling (stepbrother or stepsister)",
    OF:"Victim Was Other Family Member",
    NM:"Non-Married Live-in (LIBRS Only) Sent to NIBRS as 'CS'",
    VO:"Victim Was Offender",
    AQ:"Victim Was Acquaintance",
    FR:"Victim Was Friend",
    NE:"Victim Was Neighbor",
    BE:"Victim Was Babysittee (the baby)",
    BG:"Victim Was Boyfriend/Girlfriend",
    XB:"Victim Was Ex-Boyfriend/Girlfriend (LIBRS Only). Now Maps to 'XR'; Sent to NIBRS as 'BG'",
    CF:"Victim Was Child of Boyfriend or Girlfriend",
    HR:"Homosexual Relationship *no longer used*",
    XS:"Victim Was Ex-Spouse",
    EE:"Victim Was Employee",
    ER:"Victim Was Employer",
    OK:"Victim Was Otherwise Known",
    ES:"Victim Was Estranged Spouse (LIBRS Only) Sent to NIBRS as 'SE'",
    XR:"Victim was from an Ex Relationship",
    RU:"Relationship Unknown",
    ST:"Victim Was Stranger",
    VO:"Victim Was Offender",
}

const ArrestType = {
    O:"On-View Arrest",
    S:"Summoned / Cited",
    T:"Taken Into Custody",
}

const MultipleArresteeSegmentIndicator={
    M:"Multiple",
    C:"Count Arrestee",
    N:"Not Applicable",
}

const ResidentStatus={
    R:"Resident",
    N:"Nonresident",
    U:"Unknown",
}

const DispositionArresteeUnder18 ={
    D:"Handled Within Department and Released",
    J:"Referred to Juvenile Court or Probation Department",
    W:"Referred to Welfare Agency",
    P:"Referred to Other Police Agency",
    A:"Referred to Criminal or Adult Court",
}

const ArresteeArmedWith ={
    1:"Unarmed",
    11:"Firearm (Type Not Stated)",
    12:"Handgun",
    13:"Rifle",
    14:"Shotgun",
    15:"Other Firearm",
    16:"Lethal Cutting Instrument (switchblade knife, martial arts 'stars', Etc.)",
    17:"Club, Blackjack or Brass Knuckles",
}

export {
    DispositionArresteeUnder18
}