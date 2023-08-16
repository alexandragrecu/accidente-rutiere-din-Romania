// graph 7
////////////
// Define the translation mapping for the causes

const buttonsGraph7 = document.querySelectorAll(".buttons.graph7 button");
buttonsGraph7[0].classList.add("clicked");
buttonsGraph7.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph7.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

const translations = {
  "viteza neadaptata la conditiile de drum": "viteza neregulamentară",
};

// set the dimensions and margins of the graph
let marginGraph7, widthGraph7, heightGraph7;

// Check if the screen width is less than or equal to 600px (phone screen)
if (window.matchMedia("(max-width: 600px)").matches) {
  marginGraph7 = { top: 20, right: 0, bottom: 150, left: 60 };
  widthGraph7 = 360 - marginGraph7.left - marginGraph7.right;
  heightGraph7 = 320 - marginGraph7.top - marginGraph7.bottom;
} else {
  marginGraph7 = { top: 10, right: 0, bottom: 150, left: 60 };
  (widthGraph7 = 460 - marginGraph7.left - marginGraph7.right),
    (heightGraph7 = 450 - marginGraph7.top - marginGraph7.bottom);
}

// Create the SVG container for the graph
var svgGraph7 = d3
  .select("#my_dataviz7")
  .append("svg")
  .attr("width", widthGraph7 + marginGraph7.left + marginGraph7.right)
  .attr("height", heightGraph7 + marginGraph7.top + marginGraph7.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginGraph7.left + "," + marginGraph7.top + ")"
  );

// Define the x scale and x-axis
var xGraph7 = d3.scaleBand().range([0, widthGraph7]).padding(0.2);
var xAxisGraph7 = svgGraph7
  .append("g")
  .attr("transform", "translate(0," + heightGraph7 + ")")
  .attr("class", "x-axis-graph7");

// Define the y scale and y-axis
var yGraph7 = d3.scaleLinear().range([heightGraph7, 0]);
var yAxisGraph7 = svgGraph7.append("g").attr("class", "myYaxis");

function updateGraph7(selectedYear) {
  d3.csv("./datasets/accidente_majore.csv").then(function (data) {
    // Filter the data for high fatal accidents and the selected year
    const filteredData = data.filter(
      (d) => new Date(d.data_accident).getFullYear() === selectedYear
    );

    // Group the data by cause
    const groupedData = d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d.cauza_principala
    );

    // Convert the grouped data to an array and sort it by count
    const sortedCounts = Array.from(groupedData, ([cause, count]) => ({
      cause,
      count,
    })).sort((a, b) => b.count - a.count);

    // Take the first 8 most frequent causes
    const top8Counts = sortedCounts.slice(0, 8);

    // Translate the causes using the translation mapping
    top8Counts.forEach((d) => {
      d.cause = translations[d.cause] || d.cause;
    });

    // Update the x domain with the translated causes
    xGraph7.domain(
      top8Counts.map(function (d) {
        return d.cause;
      })
    );

    // Rotate the x-axis labels and update the x-axis
    xAxisGraph7
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xGraph7))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", -9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Update the y domain with the maximum count value
    yGraph7.domain([
      0,
      d3.max(top8Counts, function (d) {
        return +d.count;
      }),
    ]);

    // Update the y-axis
    yAxisGraph7.transition().duration(1000).call(d3.axisLeft(yGraph7));

    // Create or update the bars
    var u = svgGraph7.selectAll("rect").data(top8Counts);

    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        return xGraph7(d.cause);
      })
      .attr("y", function (d) {
        return yGraph7(d.count);
      })
      .attr("width", xGraph7.bandwidth())
      .attr("height", function (d) {
        return heightGraph7 - yGraph7(d.count);
      })
      .attr("fill", "#0145ac");
  });
}

// Initialize the graph with data for 2021
updateGraph7(2021);

///////////////////////////////////
/// my datviz 11

const buttonsGraph11 = document.querySelectorAll(".buttons.graph11 button");
buttonsGraph11[0].classList.add("clicked");
buttonsGraph11.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph11.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

// set the dimensions and margins of the graph
let marginGraph11, widthGraph11, heightGraph11;

if (window.matchMedia("(max-width: 600px)").matches) {
  marginGraph11 = { top: 20, right: 0, bottom: 150, left: 60 };
  widthGraph11 = 360 - marginGraph11.left - marginGraph11.right;
  heightGraph11 = 320 - marginGraph11.top - marginGraph11.bottom;
} else {
  (marginGraph11 = { top: 10, right: 30, bottom: 150, left: 40 }),
    (widthGraph11 = 460 - marginGraph11.left - marginGraph11.right + 40),
    (heightGraph11 = 400 - marginGraph11.top - marginGraph11.bottom + 20);
}
// Append the svg object to the body of the page
const svgGraph11 = d3
  .select("#my_dataviz11")
  .append("svg")
  .attr("width", widthGraph11 + marginGraph11.left + marginGraph11.right)
  .attr("height", heightGraph11 + marginGraph11.top + marginGraph11.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginGraph11.left + "," + marginGraph11.top + ")"
  );

// X axis scale
const xGraph11 = d3.scaleBand().range([0, widthGraph11]).padding(0.2);
const xAxisGraph11 = svgGraph11
  .append("g")
  .attr("transform", "translate(0," + heightGraph11 + ")")
  .attr("class", "x-axis-graph11");

// Y axis scale
const yGraph11 = d3.scaleLinear().range([heightGraph11, 0]);
const yAxisGraph11 = svgGraph11.append("g").attr("class", "myYaxis");

function updateGraph11(selectedYear) {
  d3.csv("./datasets/accidente2.csv").then(function (data) {
    // remove existing bars and labels
    svgGraph11.selectAll("circle").remove();
    svgGraph11.selectAll(".myLine").remove();

    const filteredData = data.filter((d) => {
      const date = new Date(d["data_accident"]);
      return date.getFullYear() === parseInt(selectedYear);
    });
    const accidentsByCounty = d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d.mod_producere
    );

    const formattedData = Array.from(
      accidentsByCounty,
      ([mod_producere, Value]) => ({
        mod_producere,
        Value,
      })
    );

    // formattedData.forEach((d) => {
    //   d.mod_producere = [d.mod_producere || d.cause;
    // });
    // sort the data in ascending order
    formattedData.sort((a, b) => b.Value - a.Value);

    // Take the first 10 elements
    const top10Data = formattedData.slice(0, 10);

    // console.log(formattedData);

    // X axis
    xGraph11.domain(
      top10Data.map(function (d) {
        return d.mod_producere;
      })
    );
    xAxisGraph11
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xGraph11))
      .selectAll("text") // Select all text labels
      .attr("y", 0) // Position the labels relative to the tick
      .attr("x", -9) // Position the labels to the left of the tick
      .attr("dy", ".35em") // Adjust the vertical alignment
      .attr("transform", "rotate(-45)") // Rotate the labels by -45 degrees
      .style("text-anchor", "end"); // Anchor the text at the end

    // Add Y axis
    yGraph11.domain([
      0,
      d3.max(formattedData, function (d) {
        return +d.Value;
      }),
    ]);
    yAxisGraph11.transition().duration(1000).call(d3.axisLeft(yGraph11));

    // variable u: map formattedData to existing circle
    var j = svgGraph11.selectAll(".myLine").data(top10Data);
    // update lines
    j.enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
      .attr("x1", function (d) {
        return xGraph11(d.mod_producere);
      })
      .attr("x2", function (d) {
        return xGraph11(d.mod_producere);
      })
      .attr("y1", yGraph11(0))
      .attr("y2", function (d) {
        return yGraph11(d.Value);
      })
      .attr("stroke", "grey");

    // variable u: map formattedData to existing circle
    var u = svgGraph11.selectAll("circle").data(top10Data);
    // update bars
    u.enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("cx", function (d) {
        return xGraph11(d.mod_producere);
      })
      .attr("cy", function (d) {
        return yGraph11(d.Value);
      })
      .attr("r", 8)
      .attr("fill", "#0145ac");
  });
}

updateGraph11("2021");

/////////////////////////////
// tabele

const data2021Graph9 = [
  {
    "Cauză principală": "Număr accidente",
    "Viteză neadaptată la condițiile de drum": 764,
    "Traversare neregulamentară pietoni": 645,
    "Abateri bicicliști": 469,
    "Neacordare prioritate pietoni": 436,
    "Pietoni pe partea carosabilă": 407,
    "Alte preocupări de distragere a atenției": 247,
    "Depășire neregulamentară": 234,
    "Nerespectare distanță între vehicule": 203,
  },

  {
    "Cauză principală": "Procent",
    "Viteză neadaptată la condițiile de drum": "15.57%",
    "Traversare neregulamentară pietoni": "13.15%",
    "Abateri bicicliști": "8.89%",
    "Neacordare prioritate pietoni": "9.56%",
    "Pietoni pe partea carosabilă": "5.03%",
    "Alte preocupări de distragere a atenției": "4.77%",
    "Depășire neregulamentară": "4.14%",
    "Nerespectare distanță între vehicule": "4.14%",
  },
];

const data2022Graph9 = [
  {
    "Cauză principală": "Număr accidente",
    "Viteză neadaptată la condițiile de drum": 757,
    "Traversare neregulamentară pietoni": 590,
    "Abateri bicicliști": 511,
    "Neacordare prioritate pietoni": 449,
    "Neacordare prioritate vehicule": 377,
    "Pietoni pe partea carosabilă": 268,
    "Alte preocupări de distragere a atenției": 217,
    "Depășire neregulamentară": 184,
    "Nerespectare distanță între vehicule": 172,
  },
  {
    "Cauză principală": "Procent",
    "Viteză neadaptată la condițiile de drum": "16.09%",
    "Traversare neregulamentară pietoni": "12.54%",
    "Abateri bicicliști": "10.89%",
    "Neacordare prioritate pietoni": "9.55%",
    "Neacordare prioritate vehicule": "8.01%",
    "Pietoni pe partea carosabilă": "5.70%",
    "Alte preocupări de distragere a atenției": "4.61%",
    "Depășire neregulamentară": "3.91%",
    "Nerespectare distanță între vehicule": "3.66%",
  },
];

// Create table 1

const tableContainer2 = d3.select("#my_dataviz9");

const table2 = tableContainer2.append("table");
const thead2 = table2.append("thead");
const tbody2 = table2.append("tbody");

// Add header
thead2
  .append("tr")
  .selectAll("th")
  .data(Object.keys(data2021Graph9[0]))
  .enter()
  .append("th")
  .text((d) => d);

// Add rows
const rows2 = tbody2.selectAll("tr").data(data2021Graph9).enter().append("tr");

// Add cells
rows2
  .selectAll("td")
  .data((d) => Object.values(d))
  .enter()
  .append("td")
  .text((d) => d);

// Create table 2

const tableContainer3 = d3.select("#my_dataviz10");

const table3 = tableContainer3.append("table");
const thead3 = table3.append("thead");
const tbody3 = table3.append("tbody");

// Add header
thead3
  .append("tr")
  .selectAll("th")
  .data(Object.keys(data2022Graph9[0]))
  .enter()
  .append("th")
  .text((d) => d);

// Add rows
const rows3 = tbody3.selectAll("tr").data(data2022Graph9).enter().append("tr");

// Add cells
rows3
  .selectAll("td")
  .data((d) => Object.values(d))
  .enter()
  .append("td")
  .text((d) => d);
/////
/// tabele -: mod producere
const data2021Graph13 = [
  {
    "Mod producere": "Număr accidente",
    "Lovire pieton": 1590,
    "Coliziune laterală": 653,
    "Coliziune față-spate": 603,
    "Cădere din vehicul": 327,
    "Lovire obstacol în afara carosabilului": 483,
    "Coliziune frontală": 204,
    Acroșare: 282,
    Răsturnare: 305,
    Altele: 89,
    "Coliziune în lanț": 65,
  },

  {
    "Mod producere": "Procent",
    "Lovire pieton": "32.41%",
    "Coliziune laterală": "13.31%",
    "Coliziune față-spate": "12.29%",
    "Cădere din vehicul": "6.67%",
    "Lovire obstacol în afara carosabilului": "9.85%",
    "Coliziune frontală": "4.16%",
    Acroșare: "5.75%",
    Răsturnare: "6.22%",
    Altele: "1.81%",
    "Coliziune în lanț": "1.77%",
  },
];

const data2022Graph14 = [
  {
    "Mod producere": "Număr accidente",
    "Lovire pieton": 1511,
    "Coliziune laterală": 639,
    "Coliziune față-spate": 502,
    "Cădere din vehicul": 373,
    "Lovire obstacol în afara carosabilului": 458,
    "Coliziune frontală": 209,
    Acroșare: 261,
    Răsturnare: 322,
    Altele: 113,
    "Coliziune în lanț": 39,
  },

  {
    "Mod producere": "Procent",
    "Lovire pieton": "32.12%",
    "Coliziune laterală": "13.58%",
    "Coliziune față-spate": "10.67%",
    "Cădere din vehicul": "7.93%",
    "Lovire obstacol în afara carosabilului": "9.74%",
    "Coliziune frontală": "4.44%",
    Acroșare: "5.55%",
    Răsturnare: "6.85%",
    Altele: "2.40%",
    "Coliziune în lanț": "1.57%",
  },
];

// Create table 1

const tableContainer13 = d3.select("#my_dataviz13");

const table13 = tableContainer13.append("table");
const thead13 = table13.append("thead");
const tbody13 = table13.append("tbody");

// Add header
thead13
  .append("tr")
  .selectAll("th")
  .data(Object.keys(data2021Graph13[0]))
  .enter()
  .append("th")
  .text((d) => d);

// Add rows
const rows13 = tbody13
  .selectAll("tr")
  .data(data2021Graph13)
  .enter()
  .append("tr");

// Add cells
rows13
  .selectAll("td")
  .data((d) => Object.values(d))
  .enter()
  .append("td")
  .text((d) => d);

// Create table 2

const tableContainer14 = d3.select("#my_dataviz14");

const table14 = tableContainer14.append("table");
const thead14 = table14.append("thead");
const tbody14 = table14.append("tbody");

// Add header
thead14
  .append("tr")
  .selectAll("th")
  .data(Object.keys(data2022Graph14[0]))
  .enter()
  .append("th")
  .text((d) => d);

// Add rows
const rows14 = tbody14
  .selectAll("tr")
  .data(data2022Graph14)
  .enter()
  .append("tr");

// Add cells
rows14
  .selectAll("td")
  .data((d) => Object.values(d))
  .enter()
  .append("td")
  .text((d) => d);
