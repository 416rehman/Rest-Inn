const prodAPI = 'https://rest-inn.herokuapp.com';
const devAPI = 'http://localhost:8080';
global.api = prodAPI;
global.apiURL = (path: string, query?:string) => `${global.api}${path||''}?${query||''}`

global.titleCase = (string) => {
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  })
}

export {};