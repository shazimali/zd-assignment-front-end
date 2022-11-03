export function getArrayTitles (arr) {
    let allTtiles = [];
    arr.forEach(data => {
        allTtiles.push(data.name);
    });

    return allTtiles;

}

export function getRolesName (roles) {
    let allNames = [];
    roles.forEach(role => {
        allNames.push(role.id+'-'+role.name);
    });

    return allNames;

}

export function getRoleIDs (roles) {
    let IDs = [];
    if(roles.length > 0){
        roles.forEach(role => {
            let id = role.split('-');
            IDs.push(id[0]);
        });
    }
    return IDs;

}

export function getEditRolesName (roles) {
    let allTitles = [];
    if(roles.length > 0){
        roles.forEach(role => {
            allTitles.push(role.id+"-"+role.title);
        });
    }
    return allTitles;

}
