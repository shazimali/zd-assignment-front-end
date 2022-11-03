export const baseURL = "http://localhost:8080";
export let token = localStorage.getItem('token');
export let permissions = localStorage.getItem('permissions');

export function setCountries (arr) {
    let allTitles = [];
    arr.forEach(data => {
        
        let title = data.country_name+'-'+data.id ;
        allTitles.push(title);
    });

    return allTitles;

}

export function setUsers (arr) {
    let allTitles = [];
    arr.forEach(data => {
        
        let title = data.name+'.'+data.email+'-'+data.id ;
        allTitles.push(title);
    });

    return allTitles;

}