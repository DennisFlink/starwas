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
let homeWorldUrl = '';
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
window.addEventListener('load', function () {
    fetchAllPepole();
    fetchAllPlanets();
});
function fetchPeople(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        function fetchInfo() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(`${url}${peopleUrl}`);
                    const response = yield fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`);
                    if (response.status === 200) {
                        const data = yield response.json();
                        console.log(data.results);
                        /* fetchedPersons?.push(data.results); */
                        fetchedPersons = data.results;
                        console.log(fetchedPersons);
                        return fetchedPersons;
                        const data = yield response.json();
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
    });
}
fetchInfo();
displayPersonInfo();
displayPlanetInfo();
function displayPersonInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        let person = yield fetchInfo();
        if (person && person.length > 0) {
            personName.innerHTML = person[curentPerson].name;
            personHeight.innerHTML = person[curentPerson].height;
            personMass.innerHTML = person[curentPerson].mass;
            personHairColor.innerHTML = person[curentPerson].hair_color;
            personEyeColor.innerHTML = person[curentPerson].eye_color;
            personBirthYear.innerHTML = person[curentPerson].birth_year;
            personGender.innerHTML = person[curentPerson].gender;
        }
        else {
            console.error("fel att lägga till personer");
        }
    });
}
function displayPlanetInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        let planet = yield fetchInfo();
        if (planet && planet.length > 0) {
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
    });
}
function fetchAllPepole() {
    return __awaiter(this, void 0, void 0, function* () {
        let pageNumber = 1;
        let currentPagePersons = [];
        do {
            currentPagePersons = yield fetchPeople(pageNumber);
            fetchedPersons = fetchedPersons.concat(currentPagePersons);
            pageNumber++;
        } while (pageNumber < 10);
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
