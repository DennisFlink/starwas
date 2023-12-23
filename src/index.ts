const url: string = 'https://swapi.dev/api/'
const peopleUrl: string = 'people/'
const planetUrl: string = 'planets/'
let fetchedPersons: CharacterInfo[] | null = []
let fetchedPlanets: PlanetInfo[] = []

interface CharacterInfo {
   name: string
   height: string
   mass: string
   hair_color: string
   skin_color: string
   eye_color: string
   birth_year: string
   gender: string
   homeworld: string
   films: string[]
   species: string[]
   vehicles: string[]
   starships: string[]
   created: string
   edited: string
   url: string
}

interface PlanetInfo {
   name: string
   rotation_speed: string
   diameter: string
   orbital_speed: string
   climate: string
   gravity: string
   terrain: string
}

/* LOADER */
const loader: HTMLElement | null = document.querySelector('.loading')

const displayLoader = () => {
   loader?.classList.add('display')
}
const hideLoader = () => {
   loader?.classList.remove('display')
}
const paginatedList = document.getElementById('characters-list') as HTMLElement

window.addEventListener('load', function () {
   displayLoader()
   fetchAllPepole()
   fetchAllPlanets()
})

const fetchData = async (sort: string, pageNumber: number) => {
   try {
      const response = await fetch(`${url}${sort}?1=&page=${pageNumber}`)
      if (response.status === 200) {
         const data = await response.json()
         return data.results
      } else {
         throw Error(String(response.status))
      }
   } catch (error) {
      return []
   }
}

async function fetchAllPepole(): Promise<void> {
   let pageNumber = 1
   let currentPagePersons: CharacterInfo[] = []

   do {
      currentPagePersons = await fetchData(peopleUrl, pageNumber)
      fetchedPersons = fetchedPersons!.concat(currentPagePersons)
      pageNumber++
   } while (pageNumber < 4)

   createListOfCharachter()

   CreatePage()
}

async function fetchAllPlanets(): Promise<void> {
   let pageNumber = 1
   let currentPagePlanets: PlanetInfo[] = []

   do {
      currentPagePlanets = await fetchData(planetUrl, pageNumber)
      fetchedPlanets = fetchedPlanets.concat(currentPagePlanets)
      pageNumber++
   } while (pageNumber < 7)
}

function CreatePage() {
   /* PAGE FUNCTION */
   const paginationNumbers = document.getElementById('pagination-numbers') as HTMLElement
   const listItems = paginatedList.querySelectorAll('li') as NodeListOf<HTMLLIElement>
   const nextButton = document.getElementById('next-button') as HTMLButtonElement
   const prevButton = document.getElementById('prev-button') as HTMLButtonElement

   const paginationLimit = 10
   const pageCount = Math.ceil(listItems.length / paginationLimit)
   let currentPage = 1

   const disableButton = (button: any) => {
      button.classList.add('disabled')
      button.setAttribute('disabled', true)
   }

   const enableButton = (button: any) => {
      button.classList.remove('disabled')
      button.removeAttribute('disabled')
   }

   const handlePageButtonsStatus = () => {
      if (currentPage === 1) {
         disableButton(prevButton)
      } else {
         enableButton(prevButton)
      }

      if (pageCount === currentPage) {
         disableButton(nextButton)
      } else {
         enableButton(nextButton)
      }
   }

   const handleActivePageNumber = () => {
      document.querySelectorAll('.pagination-number').forEach((button) => {
         button.classList.remove('active')
         const pageIndex = Number(button.getAttribute('page-index'))
         if (pageIndex == currentPage) {
            button.classList.add('active')
         }
      })
   }
   const appendPageNumber = (index: any) => {
      const pageNumber = document.createElement('button')
      pageNumber.className = 'pagination-number'
      pageNumber.innerHTML = index
      pageNumber.setAttribute('page-index', index)
      pageNumber.setAttribute('aria-label', 'Page ' + index)

      paginationNumbers.appendChild(pageNumber)
   }

   const getPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
         appendPageNumber(i)
      }
   }

   const setCurrentPage = (pageNum: any) => {
      currentPage = pageNum

      handleActivePageNumber()
      handlePageButtonsStatus()

      const prevRange = (pageNum - 1) * paginationLimit
      const currRange = pageNum * paginationLimit

      listItems.forEach((item, index) => {
         item.classList.add('hidden')
         if (index >= prevRange && index < currRange) {
            item.classList.remove('hidden')
         }
      })
   }

   function RunStuff() {
      getPaginationNumbers()
      setCurrentPage(1)

      prevButton.addEventListener('click', () => {
         setCurrentPage(currentPage - 1)
      })

      nextButton.addEventListener('click', () => {
         setCurrentPage(currentPage + 1)
      })

      document.querySelectorAll('.pagination-number').forEach((button) => {
         const pageIndex = Number(button.getAttribute('page-index'))

         if (pageIndex) {
            button.addEventListener('click', () => {
               setCurrentPage(pageIndex)
            })
         }
      })
   }

   RunStuff()
}

function createListOfCharachter() {
   fetchedPersons!.forEach((person) => {
      let liEl: HTMLElement = document.createElement('li')
      liEl.innerHTML = person.name
      liEl.addEventListener('click', () => {
         const personName = liEl.textContent?.toLocaleLowerCase()
         if (personName) {
            displayPersonInfo(personName)
         }
      })
      paginatedList?.appendChild(liEl)
   })
   hideLoader()
}

function displayPersonInfo(name: string) {
   const matchedPerson = fetchedPersons!.find(
      (person) => person.name.toLowerCase() === name,
   )
   const personInfoContainer: HTMLElement | null = document.querySelector('.person-info')
   if (matchedPerson && personInfoContainer != null) {
      personInfoContainer.innerHTML = `
      <h2> ${matchedPerson.name}</h2>
      <p>Height: ${matchedPerson.height}</p>
      <p>Mass: ${matchedPerson.mass}</p>
      <p>Hair Color: ${matchedPerson.hair_color}</p>
      <p>Skin Color: ${matchedPerson.skin_color}</p>
      <p>Eye Color: ${matchedPerson.eye_color} </p>
      <p>Birth year: ${matchedPerson.birth_year}  </p>
      <p>Gender ${matchedPerson.gender}</p>
    `
   }
   displayPlanetInfo(matchedPerson!.homeworld)
}

function displayPlanetInfo(homeWorldUrl: string) {
   const planetID = extractIDFromURL(homeWorldUrl)
   const planetInfo: HTMLElement | null = document.querySelector('.planet-info')
   const foundPlanet = findPlanetByIndex(fetchedPlanets, planetID - 1)
   if (foundPlanet != null && planetInfo != null) {
      planetInfo.innerHTML = `
      <h2>${foundPlanet.name}</h2>
      <p>Diameter: ${foundPlanet.diameter}</p>
      <p>Climate: ${foundPlanet.climate}</p>
      <p>Gravity: ${foundPlanet.gravity}</p>
      <p>Terrain: ${foundPlanet.terrain}</p>`
   }
}
function findPlanetByIndex(array: PlanetInfo[], index: number): PlanetInfo | null {
   let foundPlanet: PlanetInfo | null = null
   let count = 0

   array.forEach((planet, i) => {
      if (i === index) {
         foundPlanet = planet
         return
      }
      count++
   })

   return foundPlanet
}

function extractIDFromURL(url: string): number {
   const urlParts = url.split('/')
   return parseInt(urlParts[urlParts.length - 2])
}
