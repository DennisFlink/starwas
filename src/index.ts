const url: string = 'http https://swapi.dev/api/'
const peopleUrl: string = 'people/'
let fetchedPerson: object = []
let homeWorldUrl: string = ''


async function fetchPeople() {
    try {
        const response = await fetch(`${url}${peopleUrl}`)
        if (response.status === 200) {
            const data: object = await response.json
            fetchedPerson = data
            console.log(data)
        }
        else {
            throw Error('Something went wrong try again soon')
        }
    }
    catch(error) {
        console.log(error)
    }
}

fetchPeople()