const hostName1 = 'https://trackapi.nutritionix.com/v2/search/instant?query=';
const hostName2 ='&self=true&branded=true&common=true&common_general=true&common_grocery=true&common_restaurant=true&detailed=true&claims=false';

function formRequestOptions(method = 'GET', body) {
    const requestOptions = {
        method: method,
        headers: {
            "x-app-id":"884ee63d",
            "x-app-key":"cd9684728f41d116f76860d5e6c9b9c0",
            'Content-Type': 'application/json'
        },
    };

    if(body) {
        requestOptions.body = JSON.stringify(body);
    }
    return requestOptions;
}

export const searchRequest = (value) => {
    return fetch(hostName1+value+hostName2, formRequestOptions()).then(response => response.json());
}

export const nutrientsRequest = () => {
    return fetch('https://trackapi.nutritionix.com/v2/utils/nutrients', formRequestOptions()).then(response => response.json());
}



// fetch("https://trackapi.nutritionix.com/v2/search/instant?query=apple&self=true&branded=true&common=true&common_general=true&common_grocery=true&common_restaurant=true&detailed=false&claims=false", {
//     "credentials": "include",
//     "headers": {
//         "x-app-id":"884ee63d",
//         "x-app-key":"cd9684728f41d116f76860d5e6c9b9c0",
//         'Content-Type': 'application/json'
//     },
//     "method":"GET",
//     "mode":"cors"
// });