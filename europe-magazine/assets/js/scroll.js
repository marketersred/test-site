function redirectToPage (event) {
  if (!event) event = window.event;
  event.preventDefault();
  window.dataLayer = window.dataLayer || [];

  let target = event.target || event.srcElement;
  if (!target) return;

  let elementId = target.id || "no-id";
  let elementClass = target.className || "no-class";
  let elementText = target.innerText || "No Text";
  let elementTitle = target.title || "No Title";

  let celebrityName = "CELERITY"
  let platform = "ImmApex"

  let clickTarget = `https://studyproinceleme.com/register.html?utm_p1=${platform}&utm_p2=${celebrityName}`;

  window.dataLayer.push({
    event: "js_button_click_detailed",
    elementId: elementId,
    element_id: elementId,
    elementClass : elementClass,
    element_class : elementClass,
    elementText : elementText,
    element_text : elementText,
    elementTitle : elementTitle,
    element_title : elementTitle,
    click_target: clickTarget
  });

  setTimeout(function () {
    window.location.href = 'https://studyproinceleme.com/register.html?utm_p1=ImmApex&utm_p2=ezgimola';
  }, 600);
}
