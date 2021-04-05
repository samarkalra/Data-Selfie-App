async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);
    for (item of data) {
        const root = document.createElement('p');
        root.className = "image-data"
        const name = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        name.textContent = ` name: ${item.name}`;
        geo.textContent = `geo: ${item.lat}°, ${item.lng}°`;
        const dateString = new Date(item.timestamp).toLocaleDateString();
        date.textContent = dateString;
        image.src = item.image64;

        root.append(name, geo, date, image);
        document.body.append(root);
    }
}
getData();