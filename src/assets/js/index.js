async function fetchApi(){

    const apiUrlText = document.getElementById("api-url");
    const apiUrl = apiUrlText.value;
    return await fetch(apiUrl, {
        mode: "cors"
    }).then(response => {
        if (!response.ok){
            return false;
        }
        return response.json();
    }).then(data =>{
        console.log(data);
        handleData(data);
    }).catch(error =>{
        handleError(error);
        return false
    });
}

function handleError(error){
    const rawResponse = document.getElementById("response-content");
    rawResponse.replaceChildren([]);
    createElement(rawResponse, "h2", "Oops! something whent wrong");
    createElement(rawResponse, "p", error);
    createElement(rawResponse, "h3", "Review the browser console for more info")
}

function handleData(data){
    const rawResponse = document.getElementById("response-content");
    rawResponse.replaceChildren([]);
    if (Array.isArray(data)){
        handleArray(rawResponse, data);
        return;
    }
    if ((typeof value) == "string"){
        handleTextAttribute(rawResponse, "", data);
        return;
    }
    handleElement(rawResponse, data);
}

function handleArray(contentDiv, data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        handleElement(contentDiv, element);
    }
}

function handleElement(contentDiv, data){
    if ((typeof data) == "string"){
        handleTextAttribute(contentDiv, "", data);
        return;
    }
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = data[key];
        if ((typeof value) == "string" || (typeof value) == "number"){
            handleTextAttribute(contentDiv, key, value);
            continue;
        }
    }
}

function handleTextAttribute(parent, key, value){
    if (_isURL(value)){
        handleUrl(parent, key, value);
        return;
    }
    const outerDiv = createElement(parent, "div", "", "grow p-4 flex");
    createElement(outerDiv, "span", key, "w-1/3");
    createElement(outerDiv, "span", value, "w-2/3 break-words");
}

function handleUrl(parent, key, value){
    const outerDiv = createElement(parent, "div", "", "grow p-4 flex");
    createElement(outerDiv, "span", key, "w-1/3");
    console.log(value);
    console.log(imageExtensions.find((e) => value.endsWith(e)));
    if (imageExtensions.find((e) => value.endsWith(e))){
        handleImage(outerDiv, value);
        return;
    }
    const link = createElement(outerDiv, "a", "", "w-2/3");
    hrefAttr = document.createAttribute("href");
    hrefAttr.value = value;
    link.setAttributeNode(hrefAttr);
    createElement(link, "span", value, "w-full break-words");
}

function handleImage(parent, value){
    const img = createElement(parent, "img", "", "w-2/3 p-2");
    src = document.createAttribute("src");
    src.value = value;
    img.setAttributeNode(src);
    return img;
}

function createElement(parent, tag, value, classes=""){
    let element = document.createElement(tag);
    element.innerText = value;
    elementClass = document.createAttribute("class");
    elementClass.value = classes;
    element.setAttributeNode(elementClass);
    parent.appendChild(element);
    return element;
}

const urlExpression = /(https?|ftp):\/\/(.\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?/isg;
const imageExtensions = [".jpg", ".jpeg"];
//(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$@iS
const urlRegex = new RegExp(urlExpression);

function _isURL(value){
    console.log(value);
    console.log(urlExpression);
    if ((typeof value) == "number") return false;
    return value.match(urlRegex);
}