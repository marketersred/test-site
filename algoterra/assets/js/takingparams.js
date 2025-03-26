window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
 
  const defaultUtmP1 = 'algoterra';
  const defaultUtmP2 = 'algoterra1';
  // const defaultAdclid = 'aitest3';
  // const defaultWidgetid = 'aitest4';

  // Get parameters from the URL or use defaults if they are missing or invalid
  const utm_p1 = params.get('utm_p1') && params.get('utm_p1') !== 'null' && params.get('utm_p1').trim() !== '' 
                 ? params.get('utm_p1') 
                 : defaultUtmP1;
  const utm_p2 = params.get('utm_p2') && params.get('utm_p2') !== 'null' && params.get('utm_p2').trim() !== '' 
                 ? params.get('utm_p2') 
                 : defaultUtmP2;
  // const adclid = params.get('adclid') && params.get('adclid') !== 'null' && params.get('adclid').trim() !== '' 
  //                ? params.get('adclid') 
  //                : defaultAdclid;
  // const widget_id = params.get('widget_id') && params.get('widget_id') !== 'null' && params.get('widget_id').trim() !== '' 
  //                ? params.get('widget_id') 
  //                : defaultWidgetid;

  // Store 
  localStorage.setItem('utm_p1', utm_p1);
  localStorage.setItem('utm_p2', utm_p2);
  // localStorage.setItem('adclid', adclid);
  // localStorage.setItem('widget_id', widget_id);

  // Optionally, update the URL with the parameters if they were defaulted
  if (!params.has('utm_p1') || params.get('utm_p1') === 'null' || params.get('utm_p1').trim() === '') {
    addParamToUrl('utm_p1', utm_p1);
  }
  if (!params.has('utm_p2') || params.get('utm_p2') === 'null' || params.get('utm_p2').trim() === '') {
    addParamToUrl('utm_p2', utm_p2);
  }
  // if (!params.has('adclid') || params.get('adclid') === 'null' || params.get('adclid').trim() === '') {
  //   addParamToUrl('adclid', adclid);
  // }
  // if (!params.has('widget_id') || params.get('widget_id') === 'null' || params.get('widget_id').trim() === '') {
  //   addParamToUrl('widget_id', widget_id);
  // }
});

function addParamToUrl(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

