const url: string = 'https://swapi.dev/api/'
const peopleUrl: string = 'people/'
const planetUrl: string = 'planets/'
let fetchedPersons: CharacterInfo[] | null = []
let fetchedPlanets: PlanetInfo[] = []




interface CharacterInfo {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

interface PlanetInfo{
        name:string,
        rotation_speed:string,
        diameter:string,
        orbital_speed:string,
        climate:string;
        gravity:string,
        terrain:string,
}

//Person element
const personName:HTMLElement | null = document.getElementById("personName");
const personHeight:HTMLElement | null = document.getElementById("personHeight");
const personMass:HTMLElement | null = document.getElementById("personMass");
const personHairColor:HTMLElement | null = document.getElementById("personHairColor");
const personSkinColor:HTMLElement | null = document.getElementById("personSkinColor");
const personEyeColor:HTMLElement | null = document.getElementById("personEyeColor");
const personBirthYear:HTMLElement | null = document.getElementById("personBirthYear");
const personGender:HTMLElement | null = document.getElementById("personGender");



// Planet element
const planetName:HTMLElement | null = document.getElementById("planetName");
const planetRotation:HTMLElement | null = document.getElementById("planetRotation");
const planetDiameter:HTMLElement | null = document.getElementById("planetDiameter");
const planetClimate:HTMLElement | null = document.getElementById("planetCLimate");
const planetGravity:HTMLElement | null = document.getElementById("planetGravity");
const planetTerrain:HTMLElement | null = document.getElementById("planetTerrain");


window.addEventListener('load', function() {
    fetchAllPepole()
    fetchAllPlanets()
    
})

async function fetchPeople(pageNumber: number): Promise<CharacterInfo[]> {

    try {
        
        const response = await fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`)

        if (response.status === 200) {
            const data  = await response.json()
            console.log("hej");
            return data.results
        }
        else {
            throw Error(String(response.status))
            
        }
    }
    catch(error) {
        console.log(error)
        return[]
    }

}

async function fetchPlanets(pageNumber: number): Promise<PlanetInfo[]> {
    
    try {
        const response = await fetch(`${url}${planetUrl}?1=&page=${pageNumber}`)
        if (response.status === 200) {
            const data = await response.json()
            return data.results
        }
        else {
            throw Error(String(response.status))
        }
    }
    catch(error) {
        console.log()
    }  
        return[]
    }

function displayPersonInfo(personID: number){

    
   if(fetchedPersons && fetchedPersons.length > 0)  {
    personName!.innerHTML = fetchedPersons![personID].name;
    personHeight!.innerHTML = fetchedPersons![personID].height;
    personMass!.innerHTML = fetchedPersons![personID].mass;
    personHairColor!.innerHTML = fetchedPersons![personID].hair_color;
    personEyeColor!.innerHTML = fetchedPersons![personID].eye_color;
    personBirthYear!.innerHTML = fetchedPersons![personID].birth_year;
    personGender!.innerHTML = fetchedPersons![personID].gender;
   }
      
    else{
        console.error("fel att lägga till personer");
    }

} 

function displayPlanetInfo(){

    if(fetchPlanets && fetchPlanets.length > 0){
        planetName!.innerHTML = fetchedPlanets[clickedPlanet].name;
        planetRotation!.innerHTML = fetchedPlanets[clickedPlanet].rotation_speed;
        planetDiameter!.innerHTML = fetchedPlanets[clickedPlanet].diameter;
        planetClimate!.innerHTML = fetchedPlanets[clickedPlanet].climate;
        planetGravity!.innerHTML = fetchedPlanets[clickedPlanet].gravity;
        planetTerrain!.innerHTML = fetchedPlanets[clickedPlanet].terrain;
    }

    else {
        console.error("fel att lägga till planeter");
    }
}

async function fetchAllPepole(): Promise<void> {
    let pageNumber = 1;
    let currentPagePersons: CharacterInfo[] = []
    console.log("fetch pepole");
    do {
        currentPagePersons = await fetchPeople(pageNumber)
        fetchedPersons = fetchedPersons!.concat(currentPagePersons)
        pageNumber++
    }
    while (pageNumber < 10)
    displayPersonInfo();
}

async function fetchAllPlanets(): Promise<void> {
    let pageNumber = 1;
    let currentPagePlanets: PlanetInfo[] = []

    do {
        currentPagePlanets = await fetchPlanets(pageNumber)
        fetchedPlanets = fetchedPlanets.concat(currentPagePlanets)
        pageNumber++
    }
    while (pageNumber < 7)
    
}

function populateInfo(clickedPerson: string): void {
    let person: CharacterInfo[] | undefined;
    person = fetchedPersons?.filter(person => person.name.toLowerCase().includes(clickedPerson))
    
    if (person && person.length > 0) {
        const personUrl: string = person[0].url
        const homeWorldUrl: string = person[0].homeworld

        const match = personUrl.match(/\/(\d+)\/$/);

        if (match) {
            const personIDstring = match[1];
            const personID = parseInt(personIDstring)
            displayPersonInfo(personID)
          } else {
            console.log("No match");
          }

        const match2 = homeWorldUrl.match(/\/(\d+)\/$/);

        if (match2) {
            const homeWorldString = match2[1];
            const homeworldID = parseInt(homeWorldString)
            displayPersonInfo(homeworldID)
          } else {
            console.log("No match");
          }
    }
}
