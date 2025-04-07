if (document.readyState === "loading") {
    // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", populateTableRows);
    } else {
        // DOMContentLoaded has already fired
        populateTableRows();
    }
        async function populateTableRows() { 
            await fetch('https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0')
        
              .then(response => {
                if (response.status !== 200) {
                  console.log('Error Status Code: ' + response.status);
                  return;
              }
              response.json().then((data) => {	
                // Test if data is being received
                console.log(data);
                let strTableRows = `<tr>
                    <td><span>Summary</span></td>
                    <td>Row 1, Cell 2</td>
                </tr>
                <tr>
                    <td><span>Temperature</span></td>
                    <td>Row 2, Cell 2</td>
                </tr>
                <tr>
                    <td><span>Humidity</span></td>
                     <td>Row 3, Cell 2</td>
                </tr>
                <tr>
                    <td><span>Pressure</span></td>
                    <td>Row 4, Cell 2</td>
                </tr>`;
                document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;
              });
                   
            })
            .catch(error => {
                // handle any error
            });
        };
        

