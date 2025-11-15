if (document.getElementById('image-selector-panel')) {
	let dStatus = document.getElementById('image-selector-panel').style.display;
	if (dStatus == 'none') {
		document.getElementById('image-selector-panel').style.display = 'block';
	} else {
		document.getElementById('image-selector-panel').style.display = 'none';
	}
}