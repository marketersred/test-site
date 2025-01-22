const validNames = {
    ImmApex: "Immediate Apex",
    AIChainTrd: "AI Chain Trade",
    EclipseErn: "Eclipse Earn",
    ImmX: "ImmediateX"
};

const defaultName = "ImmApex";
const defaultText = validNames[defaultName];

const params = new URLSearchParams(window.location.search);
const name = params.get('name');

const textToUse = validNames[name] || defaultText;

const elements = document.querySelectorAll('.changing-name');
elements.forEach(element => {
    element.textContent = textToUse;
});
