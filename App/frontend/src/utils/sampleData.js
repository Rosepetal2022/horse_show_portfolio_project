const horse_data = [
    {name: "Delegate", breed: "Westphalian", age: 10, discipline: "Jumper", prizeMoney: "$2,500", RfirstName: "Myra", RlastName: "Munns", OfirstName: "Josephine", OlastName: "Darakjy"},
    {name: "Romina", breed: "Hanovarian", age: 8, discipline: "Hunter", prizeMoney: "$3,000", RfirstName: "Cory", RlastName: "Gibes",},
    {name: "Anastasia", breed: "Selle Francais", age: 15, discipline: "Equitation", prizeMoney: "$0", RfirstName: "Myra", RlastName: "Munns", OfirstName: "Art", OlastName: "Venere"},
    {name: "Per Se", breed: "Dutch Warmblood", age: 22, discipline: "Hunter", prizeMoney: "$0", RfirstName: "Lai", RlastName: "Gato", OfirstName: "Lenna", OlastName: "Paprocki"},
    {name: "Bohemio Z", breed: "Zangersheide", age: 6, discipline: "Jumper", prizeMoney: "$8,000", RfirstName: "Tyra", RlastName: "Shields", OfirstName: "Lenna", OlastName: "Paprocki"},
    {name: "Paradigm", breed: "American Warmblood", age: 12, discipline: "Hunter", prizeMoney: "$5,000", RfirstName: "Tyra", RlastName: "Shields", OfirstName: "Simona",  OlastName: "Morasca"}
];


const owner_data = [
    {firstName: "Josephine", lastName: "Darakjy", email: "josephine_darakjy@darakjy.org", address: "B Blue Ridge B Brighton Livingston MI"},
    {firstName: "Art", lastName: "Venere", email: "art@venere.org", address: "W Cerritos Ave Bridgeport Gloucester NJ"},
    {firstName: "Lenna", lastName: "Paprocki", email: "lpaprocki@hotmail.com", address: "639 Main St Anchorage Anchorage AK"},
    {firstName: "Donette", lastName: "Foller", email: "donette.foller@cox.net", address: "34 Center St Hamilton Butler OH"},
    {firstName: "Simona",  lastName: "Morasca", email: "simona@morasca.com", address: "3 Mcauley Dr Ashland Ashland OH"}
];

const betters_data = [
    {amount: "$100", firstName: "Natalie", lastName: "Fern"},
    {amount: "$500", firstName: "Lisha", lastName: "Centini"},
    {amount: "$25", firstName: "Arlene", lastName: "Klusman"},
    {amount: "$300", firstName: "Alease", lastName: "Buemi"},
];

const horseShows_data = [
    {name: "Early Summer Classic", date: "6/15/2024", location: "Portland, OR", moneyOffered: "$20,000", horsesEntered: 200},
    {name: "Oregon Trail", date: "6/22/2024", location: "Bellevue, WA", moneyOffered: "$20,000", horsesEntered: 250},
    {name: "Willamette Classic", date: "7/6/2024", location: "Del Mar, CA", moneyOffered: "$20,000", horsesEntered: 400},
    {name: "Country Classic", date: "7/13/2024", location: "Sonoma, CA", moneyOffered: "$20,000", horsesEntered: 300},
    {name: "Oregon Summer Classic", date: "8/17/2024", location: "Bend, OR", moneyOffered: "$20,000", horsesEntered: 250},
    {name: "Northwest Spectacular", date: "8/24/2024", location: "Monroe, WA", moneyOffered: "$20,000", horsesEntered: 100}
]; 

const rider_data = [
    {firstName: "Myra", lastName: "Munns", email: "munns@cox.net", address: "Prospect Pl # Euless Tarrant TX"},
    {firstName: "Stephaine", lastName: "Barfield", email: "stephaine@barfield.com", address: "4 Whipple Av Gardena Los Angeles CA"},
    {firstName: "Lai", lastName: "Gato", email: "lai.gato@gato.org", address: "7 Alabama Av Evanston Cook IL"},
    {firstName: "Stephen", lastName: "Emigh", email: "stephen_emigh@hotmail.com", address: "E Richmond S Akros Summit OH"},
    {firstName: "Tyra", lastName: "Shields", email: "tshields@gmail.com", address: "Fort Worth A Philadelphia Philadelphia PA"},
    {firstName: "Cory", lastName: "Gibes", email: "cory.gibes@gmail.com", address: "49 W Belmon San Gabriel Los Angeles CA"}

];

const horseAndRider_data = [
    {horse: "Bohemio Z", RfirstName: "Lai", RlastName: "Gato",},
    {horse: "Romina", RfirstName: "Cory", RlastName: "Gibes",},
    {horse: "Per Se", RfirstName: "Lai", RlastName: "Gato",}
]

const bets_data = [
    {firstName: "Natalie", lastName: "Fern", horseShow: "Willamette Classic", horse: "Paradigm"},
    {firstName: "Lisha", lastName: "Centini", horseShow: "Early Summer Classic", horse: "Delegate"},
    {firstName: "Arlene", lastName: "Klusman", horseShow: "Country Classic", horse: "Per Se"}
]

export { horse_data, owner_data, betters_data, horseShows_data, rider_data, horseAndRider_data, bets_data };