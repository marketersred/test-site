window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
 
  const defaultUtmP1 = 'smartbitapp';
  const defaultUtmP2 = 'smartbitapp2';
  const defaultAdclid = 'smartbitapp3';
  const defaultWidgetid = 'aitest4';

 
  const utm_p1 = params.get('utm_p1') || defaultUtmP1;
  const utm_p2 = params.get('utm_p2') || defaultUtmP2;
  const adclid = params.get('adclid') || defaultAdclid;
  const widget_id = params.get('widget_id') || defaultWidgetid;
 
  // Store 
  localStorage.setItem('utm_p1', utm_p1);
  localStorage.setItem('utm_p2', utm_p2);
  localStorage.setItem('adclid', adclid);
  localStorage.setItem('widget_id', widget_id);

  if (!params.has('utm_p1') || !params.has('utm_p2')) {
    const url = new URL(window.location);
    if (!params.has('utm_p1')) url.searchParams.set('utm_p1', utm_p1);
    if (!params.has('utm_p2')) url.searchParams.set('utm_p2', utm_p2);
    if (!params.has('adclid')) url.searchParams.set('adclid', adclid);
    if (!params.has('widget_id')) url.searchParams.set('widget_id', widget_id);
    window.history.replaceState({}, '', url); //  
  }

  console.log('Stored Parameters:', {
    utm_p1,
    utm_p2,
    adclid,
    widget_id,
  });

});
function isParamValueExist (param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(param)
}

function addParamToUrl(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

