// Fetch the JSON data and console log it
// // variables for each thing needed

// /**
//  * @param {array} rows
//  * @param {integer} index
//  */

var url = `samples.json`;


var dropDown = d3.select("#selDataset");
var jsonData;

d3.json(url).then(function(data) {
  jsonData = data;
  var names = jsonData.names;
  
  names.map(d => {
    dropDown.append("option")
    .property('value', d)
    .text(d)
  });
  optionChanged(names[0]);
}); 
function optionChanged(newName) {
  // console.log(newName);
  metaData(newName)
  buildChart(newName)
}

function metaData(idNumber) {
  console.log(`metadata selection: ${idNumber}`)
  var bellyButtonData = jsonData.metadata.filter(item => item.id == idNumber)[0];
  var sampleMetadata = d3.select("#sample-metadata");
  // reset the html
  sampleMetadata.html("");
  for (const [key, value] of Object.entries(bellyButtonData)) {
    console.log(`${key}: ${value}`);
    sampleMetadata.append('p')
    .text(`${key}: ${value}`)
    
  }
  // console.log(bellyButtonData);
}

function buildChart(idNumber) {
  console.log(`chart selection: ${idNumber}`)
  var samples = jsonData.samples.filter(item => item.id == idNumber)[0];
  // console.log(samples);

  // sample values will be the values for the bar chart
  var samplesValues10 = samples.sample_values.slice(0, 10).reverse();
  console.log(samplesValues10);

  // otu_ids will be the labels
  var samplesOtuIds = samples.otu_ids.slice(0, 10).reverse();
  console.log(samplesOtuIds);

  // format the labels
  var formatOTU = samplesOtuIds.map(d => "OTU " + d)

  // otu_labels will be the hovertext
  var samplesOtuLabels = samples.otu_labels.slice(0, 10)
  
  var traceBar = {
    x: samplesValues10,
    y: formatOTU,
    text: samplesOtuLabels,
    type: "bar",
    orientation: "h"

  };

  var barData = [traceBar];

  var barLayout = {
    title: "Top 10 OTU"
  };

  Plotly.newPlot("bar", barData, barLayout);

  
}



