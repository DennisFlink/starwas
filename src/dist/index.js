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
const planetName = document.querySelector('.planet-name');
const rotation = document.querySelector('.rotation');
const diameter = document.querySelector('.diameter');
const climate = document.querySelector('.climate');
const gravity = document.querySelector('.gravity');
const terrain = document.querySelector('.terrain');
window.addEventListener('load', function () {
    fetchAllPepole();
    fetchAllPlanets();
});
function fetchPeople(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${url}${peopleUrl}?1=&page=${pageNumber}`);
            if (response.status === 200) {
                const data = yield response.json();
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
