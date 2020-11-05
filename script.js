/**
 * Load, format and vizualize car dataset 
 */


/**
 * 1. Load Data, Prepare Feature Set and Visualize 
 */

document.addEventListener('DOMContentLoaded', fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json')
    .then(response => {
        if (response.status !== 200) {
            console.log(' Problem fetching the JSON Dataset. Status Code: ' + response.status);
            return;
        }
        return response.json().then(data => {
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
            // cleanedDataset is an Array of objects: eg. [{mpg: 18, hp: 130},..]
            const values = cleanedDataset.map(d => ({
            x: d.hp,
            y: d.mpg,
            }));
         
            console.log(values)
            tfvis.render.scatterplot(
            {name: 'Horsepower v MPG'},
            {values}, 
            {
                xLabel: 'Horsepower',
                yLabel: 'MPG',
                height: 300
            });

            // A Model is a collection of layers, loss fn, optimziers - A Neural Network, really.
            const model = createModel()
            tfvis.show.modelSummary({name: 'Model Summary'}, model);
        })
    })
);

  
  /**
 * 2. Create a Model / Neural Network
 * 
 */
  

 function createModel(){
    // these layered representations(which are intiated with random weights) are learned over serveral loops via models called neural networks that eventually gives us the target representation.

    //instantiate a sequential model
    const model = tf.sequential();

    // A dense layer is a type of layer that multiplies its inputs by a matrix (called weights) and then adds a number (called the bias) to the result. 
    // The inputShape is [1] because we have 1 number as our input (the horsepower of a given car).
    // units sets the weight of the input features (representative input)
    // Features - https://stackoverflow.com/questions/30669854/what-is-the-definition-of-feature-in-neural-network#:~:text=Features%20in%20a%20neural%20network,not%20the%20hidden%20layer%20nodes. 
    model.add(tf.layers.dense(
        {inputShape: [1], units:1, useBias:true}));

    // Add an output layer
    model.add(tf.layers.dense({units: 1, useBias: true}));

    return model;

 }
