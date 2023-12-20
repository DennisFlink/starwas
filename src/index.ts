const url: string = 'https://swapi.dev/api/'
const peopleUrl: string = 'people/'
const planetUrl: string = 'planets/'
let fetchedPersons: CharacterInfo[] | null = []
let fetchedPlanets: PlanetInfo[] = []
let homeWorldUrl: string = ''

interface CharacterInfo{
   
        name:string,
        height:string,
        mass:string,
        hair_color:string,
        skin_color:string,
        eye_color:string,
        birth_year:string,
        gender:string,
        homeworld:string,
   

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
let curentPerson = 0;


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

async function fetchInfo(): Promise<CharacterInfo[]> {
    try {
        const response = await fetch(`${url}${peopleUrl}`);
        const response = await fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`)

        if (response.status === 200) {
            const data  = await response.json()
           console.log(data.results);
           /* fetchedPersons?.push(data.results); */
           fetchedPersons = data.results;
           console.log(fetchedPersons);
            return fetchedPersons!;
            
            const data = await response.json()
            return data.results
        }
        else {
            throw Error(String(response.status))
            
        }
    }
    catch(error) {
        console.log(error)
        return Promise.reject(error);
        
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
}

fetchInfo();
displayPersonInfo();
displayPlanetInfo();

async function displayPersonInfo(){

   let person = await fetchInfo()
   if(person && person.length > 0)  {
    personName!.innerHTML = person![curentPerson].name;
    personHeight!.innerHTML = person![curentPerson].height;
    personMass!.innerHTML = person![curentPerson].mass;
    personHairColor!.innerHTML = person![curentPerson].hair_color;
    personEyeColor!.innerHTML = person![curentPerson].eye_color;
    personBirthYear!.innerHTML = person![curentPerson].birth_year;
    personGender!.innerHTML = person![curentPerson].gender;
   }
      
    else{
        console.error("fel att lägga till personer");
    }

} 

async function displayPlanetInfo(){

let planet = await fetchInfo()

if(planet && planet.length > 0){
    planetName!.innerHTML = fetchedPlanets[1].name;
    planetRotation!.innerHTML = fetchedPlanets[1].rotation_speed;
    planetDiameter!.innerHTML = fetchedPlanets[1].diameter;
    planetClimate!.innerHTML = fetchedPlanets[1].climate;
    planetGravity!.innerHTML = fetchedPlanets[1].gravity;
    planetTerrain!.innerHTML = fetchedPlanets[1].terrain;
}

else{
    console.error("fel att lägga till planeter");
}


}

async function fetchAllPepole(): Promise<void> {
    let pageNumber = 1;
    let currentPagePersons: CharacterInfo[] = []
    
    do {
        currentPagePersons = await fetchPeople(pageNumber)
        fetchedPersons = fetchedPersons.concat(currentPagePersons)
        pageNumber++
    }
    while (pageNumber < 10)
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


