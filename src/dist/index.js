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
const url = "https://swapi.dev/api/";
const peopleUrl = "people/";
const planetUrl = "planets/";
let fetchedPersons = [];
let fetchedPlanets = [];
let homeWorldUrl = "";
//Person element
const personName = document.getElementById("personName");
const personHeight = document.getElementById("personHeight");
const personMass = document.getElementById("personMass");
const personHairColor = document.getElementById("personHairColor");
const personSkinColor = document.getElementById("personSkinColor");
const personEyeColor = document.getElementById("personEyeColor");
const personBirthYear = document.getElementById("personBirthYear");
const personGender = document.getElementById("personGender");
let curentPerson = 0;
// Planet element
const planetName = document.getElementById("planetName");
const planetRotation = document.getElementById("planetRotation");
const planetDiameter = document.getElementById("planetDiameter");
const planetClimate = document.getElementById("planetCLimate");
const planetGravity = document.getElementById("planetGravity");
const planetTerrain = document.getElementById("planetTerrain");
const charachterList = document.getElementById("characters-list");
window.addEventListener("load", function () {
    fetchAllPepole();
    fetchAllPlanets();
});
function fetchPeople(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`);
            if (response.status === 200) {
                const data = yield response.json();
                console.log("hej");
                return data.results;
            }
            else {
                throw Error(String(response.status));
            }
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
            return [];
        }
    });
}
function fetchPlanets(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${url}${planetUrl}?1=&page=${pageNumber}`);
            if (response.status === 200) {
                const data = yield response.json();
                return data.results;
            }
            else {
                throw Error(String(response.status));
            }
        }
        catch (error) {
            console.log();
        }
        return [];
    });
}
function displayPersonInfo() {
    if (fetchedPersons && fetchedPersons.length > 0) {
        personName.innerHTML = fetchedPersons[curentPerson].name;
        personHeight.innerHTML = fetchedPersons[curentPerson].height;
        personMass.innerHTML = fetchedPersons[curentPerson].mass;
        personHairColor.innerHTML = fetchedPersons[curentPerson].hair_color;
        personEyeColor.innerHTML = fetchedPersons[curentPerson].eye_color;
        personBirthYear.innerHTML = fetchedPersons[curentPerson].birth_year;
        personGender.innerHTML = fetchedPersons[curentPerson].gender;
    }
    else {
        console.error("fel att lägga till personer");
    }
}
function displayPlanetInfo() {
    if (fetchPlanets && fetchPlanets.length > 0) {
        planetName.innerHTML = fetchedPlanets[1].name;
        planetRotation.innerHTML = fetchedPlanets[1].rotation_speed;
        planetDiameter.innerHTML = fetchedPlanets[1].diameter;
        planetClimate.innerHTML = fetchedPlanets[1].climate;
        planetGravity.innerHTML = fetchedPlanets[1].gravity;
        planetTerrain.innerHTML = fetchedPlanets[1].terrain;
    }
    else {
        console.error("fel att lägga till planeter");
    }
}
function fetchAllPepole() {
    return __awaiter(this, void 0, void 0, function* () {
        let pageNumber = 1;
        let currentPagePersons = [];
        console.log("fetch pepole");
        do {
            currentPagePersons = yield fetchPeople(pageNumber);
            fetchedPersons = fetchedPersons.concat(currentPagePersons);
            pageNumber++;
        } while (pageNumber < 10);
        createListOfCharachter();
    });
}
function fetchAllPlanets() {
    return __awaiter(this, void 0, void 0, function* () {
        let pageNumber = 1;
        let currentPagePlanets = [];
        do {
            currentPagePlanets = yield fetchPlanets(pageNumber);
            fetchedPlanets = fetchedPlanets.concat(currentPagePlanets);
            pageNumber++;
        } while (pageNumber < 7);
    });
}
/* PAGE FUNCTION */
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("characters-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};
const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
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
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};
function createListOfCharachter() {
    fetchedPersons.forEach(person => {
        let liEl = document.createElement("li");
        liEl.innerHTML = person.name;
        console.log(liEl);
        //Gustavs functiuon i EventListner
        /*  liEl.addEventListener("click", ); */
        charachterList === null || charachterList === void 0 ? void 0 : charachterList.appendChild(liEl);
    });
}
const appendPageNumber = (index) => {
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
const setCurrentPage = (pageNum) => {
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
