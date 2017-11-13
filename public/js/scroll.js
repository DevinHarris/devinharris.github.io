// mousewheel has been deprecated, but overflow-x: hidden seems to break the 'scroll' event

window.addEventListener('mousewheel', (e) => {
    console.log('Scroll event', e);
})