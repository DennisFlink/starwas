const url: string = 'https://swapi.dev/api/'
const peopleUrl: string = 'people/'
const planetUrl: string = 'planets/'
let fetchedPersons: CharacterInfo[] = []
let fetchedPlanets: PlanetInfo[] = []
let homeWorldUrl: string = ''


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
    results:{
        name:string,
        rotation_speed:string,
        orbital_speed:string,
        climate:string;
        gravity:string,
        terrain:string,
        url:string
    }
}

const planetName = document.querySelector('.planet-name')
const rotation = document.querySelector('.rotation')
const diameter = document.querySelector('.diameter')
const climate = document.querySelector('.climate')
const gravity = document.querySelector('.gravity')
const terrain = document.querySelector('.terrain')

window.addEventListener('load', function() {
    fetchAllPepole()
    fetchAllPlanets()
})

async function fetchPeople(pageNumber: number): Promise<CharacterInfo[]> {
    try {
        const response = await fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`)

        if (response.status === 200) {
            const data = await response.json()
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
        return[]
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


