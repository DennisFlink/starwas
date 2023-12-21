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
//Person element
const personName = document.getElementById("personName");
const personHeight = document.getElementById("personHeight");
const personMass = document.getElementById("personMass");
const personHairColor = document.getElementById("personHairColor");
const personSkinColor = document.getElementById("personSkinColor");
const personEyeColor = document.getElementById("personEyeColor");
const personBirthYear = document.getElementById("personBirthYear");
const personGender = document.getElementById("personGender");
// Planet element
const planetName = document.getElementById("planetName");
const planetRotation = document.getElementById("planetRotation");
const planetDiameter = document.getElementById("planetDiameter");
const planetClimate = document.getElementById("planetCLimate");
const planetGravity = document.getElementById("planetGravity");
const planetTerrain = document.getElementById("planetTerrain");
/* const charachterList: HTMLElement | null = document.getElementById("characters-list"); */
const paginatedList = document.getElementById("characters-list");
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
            return [];
        }
    });
}
function displayPersonInfo(personID) {
    personName.innerHTML = fetchedPersons[personID].name;
    personHeight.innerHTML = fetchedPersons[personID].height;
    personMass.innerHTML = fetchedPersons[personID].mass;
    personHairColor.innerHTML = fetchedPersons[personID].hair_color;
    personEyeColor.innerHTML = fetchedPersons[personID].eye_color;
    personBirthYear.innerHTML = fetchedPersons[personID].birth_year;
    personGender.innerHTML = fetchedPersons[personID].gender;
}
function displayPlanetInfo(homeworldID) {
    planetName.innerHTML = fetchedPlanets[homeworldID].name;
    planetRotation.innerHTML = fetchedPlanets[homeworldID].rotation_speed;
    planetDiameter.innerHTML = fetchedPlanets[homeworldID].diameter;
    planetClimate.innerHTML = fetchedPlanets[homeworldID].climate;
    planetGravity.innerHTML = fetchedPlanets[homeworldID].gravity;
    planetTerrain.innerHTML = fetchedPlanets[homeworldID].terrain;
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
        CreatePage();
    });
}
function populateInfo(clickedPerson) {
    let person;
    person = fetchedPersons === null || fetchedPersons === void 0 ? void 0 : fetchedPersons.filter((person) => person.name === clickedPerson);
    if (person && person.length > 0) {
        const personUrl = person[0].url;
        const homeWorldUrl = person[0].homeworld;
        const match = personUrl.match(/\/(\d+)\/$/);
        if (match) {
            const personIDstring = match[1];
            const personID = parseInt(personIDstring);
            displayPersonInfo(personID - 1);
        }
        else {
            console.log("No match");
        }
        const match2 = homeWorldUrl.match(/\/(\d+)\/$/);
        if (match2) {
            const homeWorldString = match2[1];
            const homeworldID = parseInt(homeWorldString);
            displayPlanetInfo(homeworldID - 1);
        }
        else {
            console.log("No match");
        }
    }
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
    });
}
<<<<<<< HEAD
function CreatePage() {
    console.log("creating pages");
    /* PAGE FUNCTION */
    const paginationNumbers = document.getElementById("pagination-numbers");
    const listItems = paginatedList.querySelectorAll("li");
    console.log(listItems);
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
            console.log("hiding elements");
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("hidden");
            }
        });
    };
    function RunStuff() {
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
    }
    RunStuff();
}
=======
>>>>>>> 1320b08484c3bd93c880f26b66204e8121858f46
function createListOfCharachter() {
    fetchedPersons.forEach((person) => {
        let liEl = document.createElement("li");
        liEl.innerHTML = person.name;
<<<<<<< HEAD
        //Gustavs functiuon i EventListner
        /*  liEl.addEventListener("click",  ); */
        paginatedList === null || paginatedList === void 0 ? void 0 : paginatedList.appendChild(liEl);
=======
        liEl.addEventListener("click", function () {
            populateInfo(person.name);
        });
        charachterList === null || charachterList === void 0 ? void 0 : charachterList.appendChild(liEl);
>>>>>>> 1320b08484c3bd93c880f26b66204e8121858f46
    });
}
