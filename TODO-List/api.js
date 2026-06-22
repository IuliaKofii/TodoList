export function load () {

    const properties = localStorage.getItem('Tasks');

    if (properties) {

        return JSON.parse(properties);

    }

    return [];
}

export function save (tasks) {

 
    
    const properties = JSON.stringify(tasks);

    console.log(tasks);
    



    localStorage.setItem('Tasks', properties);

}