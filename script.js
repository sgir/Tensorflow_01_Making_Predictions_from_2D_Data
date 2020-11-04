/**
 * Load, format and vizualize car dataset 
 */


/**
 * 1. Load Data and display the chart
 */

document.addEventListener('DOMContentLoaded', fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json')
    .then(response => {
        if (response.status !== 200) {
            console.log(' Problem fetching the JSON Dataset. Status Code: ' + response.status);
            return;
        }
        response.json().then(data => {
            // the car dataset is a JSON array
            console.log('Here is your dataset data', data)
            const filteredDataset = data.filter(car => 
                (car.Horsepower != null && car.Miles_per_Gallon != null)
            );

            const cleanedDataset = filteredDataset.map( filteredcar => ({
                // retain only HP and MPG values in the processed data
                    mpg : filteredcar.Miles_per_Gallon,
                    hp : filteredcar.Horsepower
            }));
            console.log('Here is your cleaned dataset ', cleanedDataset)
            
            // Load and plot the original input data that we are going to train on
            const values = cleanedDataset.map(d => ({
            x: d.horsepower,
            y: d.mpg,
            }));
        
            tfvis.render.scatterplot(
            {name: 'Horsepower v MPG'},
            {values}, 
            {
                xLabel: 'Horsepower',
                yLabel: 'MPG',
                height: 300
            }
            );

        })
    })
);

  
  