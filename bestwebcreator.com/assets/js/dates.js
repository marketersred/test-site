
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

document.querySelectorAll('.currentYear').forEach(element => {
    element.textContent = currentYear;
});

document.querySelectorAll('.previousYear').forEach(element => {
    element.textContent = previousYear;
});