let countries = document.getElementById('countries');
let earthquakes = document.getElementById('earthquakes');
let end = document.getElementById('end');
let start = document.getElementById('start');
let minMagnitude = document.getElementById('minMagnitude');
let maxMagnitude = document.getElementById('maxMagnitude');
let show = document.getElementById('show');
let country = document.getElementById('country');
let container = document.getElementById('container');
let tableBody = document.getElementById('tableBody');
let footer = document.getElementById('footer');

let magnitude;
let earthquakeLocation;

let earthquakeTable = document.getElementById('earthquakeTable');

// console.log(earthquakeTable.rows.length);
let row;
let cell1;
let cell2;
let cell3;
let cell4;

let options;

let url = "./json/countries.json";

fetch(url).then(response =>{
    response.json().then(data=>{

        data.forEach(element =>{
            options = document.createElement('option');

            options.value = element.name;
            options.innerText = element.name;
            countries.appendChild(options);
        })
})
})

show.onclick = ()=>{

    // container.innerText = '';

    // if (earthquakeTable.rows.length >1){
    //     for(let i = 1; i < earthquakeTable.rows.length; i++){
    //         // earthquakeTable.deleteRow(i);
    //         console.log(i);
    //     }   
    // }

    tableBody.innerHTML = '';

    country.innerText = countries.value;

    let counter = 0;
    
    let apiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start.value}&endtime=${end.value}&minmagnitude=${minMagnitude.value}&maxmagnitude=${maxMagnitude.value}`;

    fetch(apiUrl).then(response =>{
        response.json().then(data=>{       

            data.features.forEach(item =>{
                if(item.properties.place.includes(`${countries.value}`)){
                    counter++;

                    // earthquakeLocation = document.createElement('p');
                    // earthquakeLocation.innerHTML = `<b>Location: </b> ${item.properties.place}`;
                    // magnitude = document.createElement('p');
                    // magnitude.innerHTML = `<b>Magnitude: </b> ${item.properties.mag.toFixed(2)}`;
                    // container.appendChild(earthquakeLocation);
                    // container.appendChild(magnitude);

                    row = document.createElement('tr');
                    cell1 = document.createElement('td');
                    cell2 = document.createElement('td');
                    cell3 = document.createElement('td');
                    cell4 = document.createElement('td');

                    cell1.innerText = counter;
                    cell2.innerText = item.properties.place;
                    cell3.innerText = item.properties.mag.toFixed(2);
                    cell4.innerText = new Date(item.properties.time).toLocaleString();

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    row.appendChild(cell3);
                    row.appendChild(cell4);

                    tableBody.appendChild(row);

                    earthquakes.innerText = counter;
                    footer.style.position = 'relative';
                } else if(countries.value == 'Worldwide'){

                    counter++;

                    row = document.createElement('tr');
                    cell1 = document.createElement('td');
                    cell2 = document.createElement('td');
                    cell3 = document.createElement('td');
                    cell4 = document.createElement('td');

                    cell1.innerText = counter;
                    cell2.innerText = item.properties.place;
                    cell3.innerText = item.properties.mag.toFixed(2);
                    cell4.innerText = new Date(item.properties.time).toLocaleString();

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    row.appendChild(cell3);
                    row.appendChild(cell4);

                    tableBody.appendChild(row);

                    // earthquakeLocation = document.createElement('p');
                    // earthquakeLocation.innerHTML = `<b>Location: </b> ${item.properties.place}`;
                    // magnitude = document.createElement('p');
                    // magnitude.innerHTML = `<b>Magnitude: </b> ${item.properties.mag.toFixed(2)}`;
                    // container.appendChild(earthquakeLocation);
                    // container.appendChild(magnitude);

                    earthquakes.innerText = data.metadata.count; 
                    footer.style.position = 'relative';          
                }
            })

            if(counter === 0 || data.metadata.count === 0){
                row = document.createElement('tr');
                cell1 = document.createElement('td');
                cell1.setAttribute("colspan", "4")
                cell1.innerHTML = "&#10060; No earthquake has been registered";
                row.appendChild(cell1);
                tableBody.appendChild(row);
                earthquakes.innerText = counter; 
                footer.style.position = 'fixed';     
            }

            counter = 0;
    })
    }).catch(error=>{
        console.log(error);
    })
}