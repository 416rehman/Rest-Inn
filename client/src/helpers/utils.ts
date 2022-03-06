enum API_GATEWAY {
  PROD = `https://rest-inn.herokuapp.com`,
  DEV = `http://localhost:8080`
}

global.apiURL = (path: string, query?:string) => `${API_GATEWAY.DEV}${path||''}${query ? '?' + query : ''}`

global.titleCase = (string) => {
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  })
}

global.randomHexColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export {};