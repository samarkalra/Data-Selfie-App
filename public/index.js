function setup() {
    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        video.loadPixels(); //take video element and load the pixels on the canvas
        const image64 = video.canvas.toDataURL(); //converting image pixels data to base64 encoding
        data.image64 = image64;
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    })
    let data = {};
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            data.lat = position.coords.latitude;
            data.lng = position.coords.longitude;
            document.getElementById('latitude').textContent = data.lat;
            document.getElementById('longitude').textContent = data.lng;
        });
    } else {
        console.log('geolocation is not available');
    }

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);

    const inputField = document.getElementById('name-field');
    inputField.addEventListener('input', (event) => {
        data.name = event.target.value;
    });
}