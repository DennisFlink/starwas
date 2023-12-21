const url: string = "https://swapi.dev/api/";
const peopleUrl: string = "people/";
const planetUrl: string = "planets/";
let fetchedPersons: CharacterInfo[] | null = [];
let fetchedPlanets: PlanetInfo[] = [];

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

interface PlanetInfo {
  name: string;
  rotation_speed: string;
  diameter: string;
  orbital_speed: string;
  climate: string;
  gravity: string;
  terrain: string;
}

//Person element
const personName: HTMLElement | null = document.getElementById("personName");
const personHeight: HTMLElement | null =
  document.getElementById("personHeight");
const personMass: HTMLElement | null = document.getElementById("personMass");
const personHairColor: HTMLElement | null =
  document.getElementById("personHairColor");
const personSkinColor: HTMLElement | null =
  document.getElementById("personSkinColor");
const personEyeColor: HTMLElement | null =
  document.getElementById("personEyeColor");
const personBirthYear: HTMLElement | null =
  document.getElementById("personBirthYear");
const personGender: HTMLElement | null =
  document.getElementById("personGender");

// Planet element
const planetName: HTMLElement | null = document.getElementById("planetName");
const planetRotation: HTMLElement | null =
  document.getElementById("planetRotation");
const planetDiameter: HTMLElement | null =
  document.getElementById("planetDiameter");
const planetClimate: HTMLElement | null =
  document.getElementById("planetCLimate");
const planetGravity: HTMLElement | null =
  document.getElementById("planetGravity");
const planetTerrain: HTMLElement | null =
  document.getElementById("planetTerrain");

const charachterList: HTMLElement | null =
  document.getElementById("characters-list");

window.addEventListener("load", function () {
  fetchAllPepole();
  fetchAllPlanets();
});

async function fetchPeople(pageNumber: number): Promise<CharacterInfo[]> {
  try {
    const response = await fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`);

    if (response.status === 200) {
      const data = await response.json();
      console.log("hej");
      return data.results;
    } else {
      throw Error(String(response.status));
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchPlanets(pageNumber: number): Promise<PlanetInfo[]> {
  try {
    const response = await fetch(`${url}${planetUrl}?1=&page=${pageNumber}`);
    if (response.status === 200) {
      const data = await response.json();
      return data.results;
    } else {
      throw Error(String(response.status));
    }
  } catch (error) {
    console.log();
    return [];
  }
}

function displayPersonInfo(personID: number) {
    personName!.innerHTML = fetchedPersons![personID].name;
    personHeight!.innerHTML = fetchedPersons![personID].height;
    personMass!.innerHTML = fetchedPersons![personID].mass;
    personHairColor!.innerHTML = fetchedPersons![personID].hair_color;
    personEyeColor!.innerHTML = fetchedPersons![personID].eye_color;
    personBirthYear!.innerHTML = fetchedPersons![personID].birth_year;
    personGender!.innerHTML = fetchedPersons![personID].gender;
}

function displayPlanetInfo(homeworldID: number) {
    planetName!.innerHTML = fetchedPlanets[homeworldID].name;
    planetRotation!.innerHTML = fetchedPlanets[homeworldID].rotation_speed;
    planetDiameter!.innerHTML = fetchedPlanets[homeworldID].diameter;
    planetClimate!.innerHTML = fetchedPlanets[homeworldID].climate;
    planetGravity!.innerHTML = fetchedPlanets[homeworldID].gravity;
    planetTerrain!.innerHTML = fetchedPlanets[homeworldID].terrain;
}

async function fetchAllPepole(): Promise<void> {
  let pageNumber = 1;
  let currentPagePersons: CharacterInfo[] = [];
  console.log("fetch pepole");
  do {
    currentPagePersons = await fetchPeople(pageNumber);
    fetchedPersons = fetchedPersons!.concat(currentPagePersons);
    pageNumber++;
  } while (pageNumber < 10);
  createListOfCharachter();
}

function populateInfo(clickedPerson: string): void {
  let person: CharacterInfo[] | undefined;
  person = fetchedPersons?.filter((person) => person.name === clickedPerson);

  if (person && person.length > 0) {
    const personUrl: string = person[0].url;
    const homeWorldUrl: string = person[0].homeworld;

    const match = personUrl.match(/\/(\d+)\/$/);

    if (match) {
      const personIDstring = match[1];
      const personID = parseInt(personIDstring);
      displayPersonInfo(personID-1);
    } else {
      console.log("No match");
    }

    const match2 = homeWorldUrl.match(/\/(\d+)\/$/);

    if (match2) {
      const homeWorldString = match2[1];
      const homeworldID = parseInt(homeWorldString);
      displayPlanetInfo(homeworldID-1);
    } else {
      console.log("No match");
    }
  }
}

async function fetchAllPlanets(): Promise<void> {
  let pageNumber = 1;
  let currentPagePlanets: PlanetInfo[] = [];

  do {
    currentPagePlanets = await fetchPlanets(pageNumber);
    fetchedPlanets = fetchedPlanets.concat(currentPagePlanets);
    pageNumber++;
  } while (pageNumber < 7);

  /* PAGE FUNCTION */
  const paginationNumbers = document.getElementById(
    "pagination-numbers"
  ) as HTMLElement;
  const paginatedList = document.getElementById(
    "characters-list"
  ) as HTMLElement;
  const listItems = paginatedList.querySelectorAll(
    "li"
  ) as NodeListOf<HTMLLIElement>;
  const nextButton = document.getElementById(
    "next-button"
  ) as HTMLButtonElement;
  const prevButton = document.getElementById(
    "prev-button"
  ) as HTMLButtonElement;

  const paginationLimit = 10;
  const pageCount = Math.ceil(listItems.length / paginationLimit);
  let currentPage = 1;

  const disableButton = (button: any) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };

  const enableButton = (button: any) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };

  const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }

    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };

  const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };

  const appendPageNumber = (index: any) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
  };

  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  const setCurrentPage = (pageNum: any) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
  };

  window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
      setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
      setCurrentPage(currentPage + 1);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));

      if (pageIndex) {
        button.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  });
}

function createListOfCharachter() {
  fetchedPersons!.forEach((person) => {
    let liEl: HTMLElement = document.createElement("li");
    liEl.innerHTML = person.name;
    
    liEl.addEventListener("click", function() {
        populateInfo(person.name)
    });
    charachterList?.appendChild(liEl);
  });
}
