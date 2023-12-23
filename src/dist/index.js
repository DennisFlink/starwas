"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = 'https://swapi.dev/api/';
const peopleUrl = 'people/';
const planetUrl = 'planets/';
let fetchedPersons = [];
let fetchedPlanets = [];
/* LOADER */
const loader = document.querySelector('.loading');
const displayLoader = () => {
    loader === null || loader === void 0 ? void 0 : loader.classList.add('display');
};
const hideLoader = () => {
    loader === null || loader === void 0 ? void 0 : loader.classList.remove('display');
};
const paginatedList = document.getElementById('characters-list');
window.addEventListener('load', function () {
    displayLoader();
    fetchAllPepole();
    fetchAllPlanets();
});
const fetchData = (sort, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${url}${sort}?1=&page=${pageNumber}`);
        if (response.status === 200) {
            const data = yield response.json();
            return data.results;
        }
        else {
            throw Error(String(response.status));
        }
    }
    catch (error) {
        return [];
    }
});
function fetchAllPepole() {
    return __awaiter(this, void 0, void 0, function* () {
        let pageNumber = 1;
        let currentPagePersons = [];
        do {
            currentPagePersons = yield fetchData(peopleUrl, pageNumber);
            fetchedPersons = fetchedPersons.concat(currentPagePersons);
            pageNumber++;
        } while (pageNumber < 4);
        createListOfCharachter();
        CreatePage();
    });
}
function fetchAllPlanets() {
    return __awaiter(this, void 0, void 0, function* () {
        let pageNumber = 1;
        let currentPagePlanets = [];
        do {
            currentPagePlanets = yield fetchData(planetUrl, pageNumber);
            fetchedPlanets = fetchedPlanets.concat(currentPagePlanets);
            pageNumber++;
        } while (pageNumber < 7);
    });
}
function CreatePage() {
    /* PAGE FUNCTION */
    const paginationNumbers = document.getElementById('pagination-numbers');
    const listItems = paginatedList.querySelectorAll('li');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const paginationLimit = 10;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;
    const disableButton = (button) => {
        button.classList.add('disabled');
        button.setAttribute('disabled', true);
    };
    const enableButton = (button) => {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    };
    const handlePageButtonsStatus = () => {
        if (currentPage === 1) {
            disableButton(prevButton);
        }
        else {
            enableButton(prevButton);
        }
        if (pageCount === currentPage) {
            disableButton(nextButton);
        }
        else {
            enableButton(nextButton);
        }
    };
    const handleActivePageNumber = () => {
        document.querySelectorAll('.pagination-number').forEach((button) => {
            button.classList.remove('active');
            const pageIndex = Number(button.getAttribute('page-index'));
            if (pageIndex == currentPage) {
                button.classList.add('active');
            }
        });
    };
    const appendPageNumber = (index) => {
        const pageNumber = document.createElement('button');
        pageNumber.className = 'pagination-number';
        pageNumber.innerHTML = index;
        pageNumber.setAttribute('page-index', index);
        pageNumber.setAttribute('aria-label', 'Page ' + index);
        paginationNumbers.appendChild(pageNumber);
    };
    const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    };
    const setCurrentPage = (pageNum) => {
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;
        listItems.forEach((item, index) => {
            item.classList.add('hidden');
            if (index >= prevRange && index < currRange) {
                item.classList.remove('hidden');
            }
        });
    };
    function RunStuff() {
        getPaginationNumbers();
        setCurrentPage(1);
        prevButton.addEventListener('click', () => {
            setCurrentPage(currentPage - 1);
        });
        nextButton.addEventListener('click', () => {
            setCurrentPage(currentPage + 1);
        });
        document.querySelectorAll('.pagination-number').forEach((button) => {
            const pageIndex = Number(button.getAttribute('page-index'));
            if (pageIndex) {
                button.addEventListener('click', () => {
                    setCurrentPage(pageIndex);
                });
            }
        });
    }
    RunStuff();
}
function createListOfCharachter() {
    fetchedPersons.forEach((person) => {
        let liEl = document.createElement('li');
        liEl.innerHTML = person.name;
        liEl.addEventListener('click', () => {
            var _a;
            const personName = (_a = liEl.textContent) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
            if (personName) {
                displayPersonInfo(personName);
            }
        });
        paginatedList === null || paginatedList === void 0 ? void 0 : paginatedList.appendChild(liEl);
    });
    hideLoader();
}
function displayPersonInfo(name) {
    const matchedPerson = fetchedPersons.find((person) => person.name.toLowerCase() === name);
    const personInfoContainer = document.querySelector('.person-info');
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
    `;
    }
    displayPlanetInfo(matchedPerson.homeworld);
}
function displayPlanetInfo(homeWorldUrl) {
    const planetID = extractIDFromURL(homeWorldUrl);
    const planetInfo = document.querySelector('.planet-info');
    const foundPlanet = findPlanetByIndex(fetchedPlanets, planetID - 1);
    if (foundPlanet != null && planetInfo != null) {
        planetInfo.innerHTML = `
      <h2>${foundPlanet.name}</h2>
      <p>Diameter: ${foundPlanet.diameter}</p>
      <p>Climate: ${foundPlanet.climate}</p>
      <p>Gravity: ${foundPlanet.gravity}</p>
      <p>Terrain: ${foundPlanet.terrain}</p>`;
    }
}
function findPlanetByIndex(array, index) {
    let foundPlanet = null;
    let count = 0;
    array.forEach((planet, i) => {
        if (i === index) {
            foundPlanet = planet;
            return;
        }
        count++;
    });
    return foundPlanet;
}
function extractIDFromURL(url) {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2]);
}
