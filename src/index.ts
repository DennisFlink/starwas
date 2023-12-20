const url: string = 'https://swapi.dev/api/'
const peopleUrl: string = 'people/'
const planetUrl: string = 'planets/'
let fetchedPersons: CharachterInfo[] = []
let fetchedPlanets: PlanetInfo[] = []
let homeWorldUrl: string = ''

interface CharachterInfo{
    name:string,
    height:string,
    mass:string,
    hair_color:string,
    skin_color:string,
    eye_color:string,
    birth_year:string,
    gender:string,
    homeworld:{
        name:string,
        rotation_speed:string,
        orbital_speed:string,
        climate:string;
        gravity:string,
        terrain:string
    },
    films:string[],
    species:string[],
    vehicles:string[],
    starships:string[],

}


async function fetchInfo() {
    try {
        const response = await fetch(`${url}${peopleUrl}`)
        if (response.status === 200) {
            const data: CharachterInfo[] = await response.json()
            fetchedPersons = data
            
        }
        else {
            throw Error(String(response.status))
        }
    }
    catch(error) {
        console.log(error)
    }

    try {
        const response = await fetch(`${url}${planetUrl}`)
        if (response.status === 200) {
            const data: PlanetInfo[] = await response.json()
            fetchedPlanets = data
        }
        else {
            throw Error(String(response.status))
        }
    }
    catch(error) {
        console.log()
    }
}

fetchInfo()
