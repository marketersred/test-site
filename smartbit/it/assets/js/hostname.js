const domain = window.location.hostname;  

const hostnameElements = document.querySelectorAll('.hostname');  

hostnameElements.forEach(element => {  
    element.textContent = domain;  
});