async function fetchApi(){

    const apiUrlText = document.getElementById("api-url");
    const apiUrl = apiUrlText.value;
    return await fetch(apiUrl).then(response => {
        if (!response.ok){
            return false;
        }
        return response.json();
    }).then(data =>{
        console.log(data);
        handleData(data);
    }).catch(error =>{
        console.log(error);
        return false
    });
}

function handleData(data){
    if (Array.isArray(data)){
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            handleData(element);
        }
        return;
    }
    let keys = Object.keys(data);
    const rawResponse = document.getElementById("response-content");
    rawResponse.replaceChildren([]);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = data[key];
        if ((typeof value) == "string" || (typeof value) == "number"){
            createElement(rawResponse, key, value);
            continue;
        }
    }
}

function createElement(parent, key, value){
    let element = document.createElement("p");
    element.innerText = `${key}: ${value}`;
    parent.appendChild(element);
}