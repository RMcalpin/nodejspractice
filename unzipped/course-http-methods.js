async function getData() {
    var courseget = document.querySelector("#course").value;
    const url = "http://localhost:3000/courses/";
    var urlandcourse = url + courseget;
    
    try {
        const response = await fetch(urlandcourse, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        console.log(json);
        var query = document.querySelector("#results1");
        if (query) {
            query.textContent = JSON.stringify(json, null, 2);
        } else {
            console.error("Element not found");
        }
    } catch (error) {
        if (error.message.includes('Network response was not ok')) {
        
        switch (error.message.split(': ')[1]) {
            case '0':
                console.error('Request failed. Possible network issue.');
                break;
            case '404':
                console.error('Resource not found.');
                break;
        }
        } else {
            console.error('Error:', error);
        }
    }
}

async function getDataAll() {
    var courseget = document.querySelector("#courseAll").value;
    const url = "http://localhost:3000/courses/All/";
    var urlandcourse = url + courseget;
    
    try {
        const response = await fetch(urlandcourse, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        console.log(json);
        var query = document.querySelector("#results2");
        if (query) {
            query.textContent = JSON.stringify(json, null, 2);
        } else {
            console.error("Element not found");
        }
    } catch (error) {
        if (error.message.includes('Network response was not ok')) {
        
        switch (error.message.split(': ')[1]) {
            case '0':
                console.error('Request failed. Possible network issue.');
                break;
            case '404':
                console.error('Resource not found.');
                break;
        }
        } else {
            console.error('Error:', error);
        }
    }
}

async function getDataCourseSection() {
    var courseget = document.querySelector("#courseSec").value;
    const url = "http://localhost:3000/courses/course_section/";
    var urlandcourse = url + courseget;
    
    try {
        const response = await fetch(urlandcourse, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        console.log(json);
        var query = document.querySelector("#results3");
        if (query) {
            query.textContent = JSON.stringify(json, null, 2);
        } else {
            console.error("Element not found");
        }
    } catch (error) {
        if (error.message.includes('Network response was not ok')) {
        
        switch (error.message.split(': ')[1]) {
            case '0':
                console.error('Request failed. Possible network issue.');
                break;
            case '404':
                console.error('Resource not found.');
                break;
        }
        } else {
            console.error('Error:', error);
        }
    }
}

async function insertData() {
    var ccode = document.querySelector("#cCodeInsert").value;
    var ccredits = document.querySelector("#cCreditsInsert").value;
    var cname = document.querySelector("#cNameInsert").value;
    var clevel = document.querySelector("#cLevelInsert").value;
    var cdesc = document.querySelector("#cDescInsert").value;
    var cofferedby = document.querySelector("#cOfferedByInsert").value;
    
    const url = "http://localhost:3000/courses/insert/";
    var urlanddept = url + ccode;

    try {
        const response = await fetch(urlanddept, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "CCode":ccode,
                "Credits":ccredits,
                "CName":cname,
                "CLevel":clevel,
                "CDesc":cdesc,
                "course_offeredby":cofferedby
            })
        });
  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        var query = document.querySelector("#results4");
        if (query) {
            query.textContent = "Insert successful";
        } else {
            console.error("Element not found");
        }        
    } catch (error) {
        if (error.message.includes('Network response was not ok')) {
        
        switch (error.message.split(': ')[1]) {
            case '0':
                console.error('Request failed. Possible network issue.');
                break;
            case '404':
                console.error('Resource not found.');
                break;
        }
        } else {
            console.error('Error:', error);
        }
    }
}

window.getData = getData;
window.getDataAll = getDataAll;
window.getDataCourseSection = getDataCourseSection;
window.insertData = insertData;
