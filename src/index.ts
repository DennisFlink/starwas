const url: string = 'https://swapi.dev/api/'
const peopleUrl: string = 'people/'
let fetchedPerson: object = []
let homeWorldUrl: string = ''


async function fetchPeople() {
    try {
        const response: Response = await fetch(`${url}${peopleUrl}`)
        if (response.status === 200) {
            const data = await response.json
            fetchedPerson = data
            console.log(data)
        }
        else {
            throw Error(String(response.status))
        }
    }
    catch(error) {
        console.log(error)
    }
}

fetchPeople()

interface CharachterInfo{
    name:string,
    height:string,
    mass:string,
    hair_color:string,
    skin_color:string,
    eye_color:string,
    birth_year:string,
    gender:string,
    homeworld:string,

}

interface PlanetInfo{
        name:string,
        rotation_speed:string,
        orbital_speed:string,
        climate:string;
        gravity:string,
        terrain:string,
}

