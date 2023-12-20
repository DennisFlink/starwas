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
function fetchInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${url}${peopleUrl}`);
            if (response.status === 200) {
                const data = yield response.json();
                fetchedPersons = data;
            }
            else {
                throw Error(String(response.status));
            }
        }
        catch (error) {
            console.log(error);
        }
        try {
            const response = yield fetch(`${url}${planetUrl}`);
            if (response.status === 200) {
                const data = yield response.json();
                fetchedPlanets = data;
            }
            else {
                throw Error(String(response.status));
            }
        }
        catch (error) {
            console.log();
        }
    });
}
fetchInfo();
