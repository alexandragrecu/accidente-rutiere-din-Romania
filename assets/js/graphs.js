const widthGraph5 = 500;
const heightGraph5 = 500;

const svgGraph5 = d3
  .select("#my_dataviz5")
  .append("svg")
  .attr("viewBox", "0 0 " + widthGraph5 + " " + heightGraph5)
  .append("g")
  .attr("transform", "translate(40,0)");

// correct dendrogram
const data = {
  name: "Accidents",
  children: [
    {
      name: "Major Accidents",
      children: [
        {
          name: "Fatal Accidents",
          children: [{ name: "High Fatal" }, { name: "Low Fatal" }],
        },
        {
          name: "Serious Accidents",
          children: [{ name: "High Serious" }, { name: "Low Serious" }],
        },
      ],
    },
    {
      name: "Minor Accidents",
    },
  ],
};

const cluster = d3.cluster().size([heightGraph5, widthGraph5 - 100]);
const root = d3.hierarchy(data);
cluster(root);

svgGraph5
  .selectAll("path")
  .data(root.descendants().slice(1))
  .enter()
  .append("path")
  .attr("d", function (d) {
    return (
      "M" +
      d.y +
      "," +
      d.x +
      "C" +
      (d.parent.y + 50) +
      "," +
      d.x +
      " " +
      (d.parent.y + 150) +
      "," +
      d.parent.x +
      " " +
      d.parent.y +
      "," +
      d.parent.x
    );
  })
  .style("fill", "none")
  .attr("stroke", "#ccc");

const nodes = svgGraph5
  .selectAll("g")
  .data(root.descendants())
  .enter()
  .append("g")
  .attr("transform", function (d) {
    return "translate(" + d.y + "," + d.x + ")";
  });

nodes
  .append("circle")
  .attr("r", 7)
  .style("fill", "#1a96cf")
  .attr("stroke", "#0145ac")
  .style("stroke-width", 2);

nodes
  .append("text")
  .text(function (d) {
    return d.data.name;
  })
  .attr("dx", -10)
  .attr("dy", 20)
  .style("font-size", "12.4px")
  .style("text-anchor", "middle");

function resizeChart() {
  var targetWidth = svgGraph5.node().getBoundingClientRect().width;
  svgGraph5.attr("width", targetWidth);
  svgGraph5.attr("height", targetWidth / (widthGraph5 / heightGraph5));
}

d3.select(window).on("resize", resizeChart);

// Initial chart setup
resizeChart();

// graph 6 -> tables
////////////////////////////////
const buttonsGraph6 = document.querySelectorAll(".buttons.graph6 button");
buttonsGraph6[0].classList.add("clicked");
buttonsGraph6.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph6.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
    tableContainer.selectAll("table").style("opacity", 0);
    setTimeout(() => {
      UpdateGraph6(button.id === "button2021" ? data2021 : data2022);
      tableContainer.selectAll("table").style("opacity", 1);
    }, 500);
  });
});

const data2021 = [
  {
    Grup: "Accidente totale",
    "Număr de accidente": "26 694",
    Percentage: "100%",
  },
  {
    Grup: "Minor",
    "Număr de accidente": "21788",
    Percentage: "81.63%",
  },
  {
    Grup: "Major",
    "Număr de accidente": "4906",
    Percentage: "18.37%",
  },
  {
    Grup: "Major - High Fatal",
    "Număr de accidente": "101",
    Percentage: "0.37%",
  },
  {
    Grup: "Major - Low Fatal",
    "Număr de accidente": "1499",
    Percentage: "5.61%",
  },
  {
    Grup: "Major - High Serious",
    "Număr de accidente": "24",
    Percentage: "0.009%",
  },
  {
    Grup: "Major - Low Serious",
    "Număr de accidente": "3282",
    Percentage: "12.29%",
  },

  // ...
];

const data2022 = [
  {
    Grup: "Accidente totale",
    "Număr de accidente": "27 945",
    Percentage: "100%",
  },
  {
    Grup: "Minor",
    "Număr de accidente": "23251",
    Percentage: "83.20%",
  },
  {
    Grup: "Major",
    "Număr de accidente": "4704",
    Percentage: "16.80%",
  },
  {
    Grup: "Major - High Fatal",
    "Număr de accidente": "78",
    Percentage: "0.27%",
  },
  {
    Grup: "Major - Low Fatal",
    "Număr de accidente": "1403",
    Percentage: "5.02%",
  },
  {
    Grup: "Major - High Serious",
    "Număr de accidente": "20",
    Percentage: "0.007%",
  },
  {
    Grup: "Major - Low Serious",
    "Număr de accidente": "3203",
    Percentage: "11.46%",
  },
  // ...
];

const tableContainer = d3.select("#my_dataviz6");

function UpdateGraph6(data) {
  tableContainer.html(""); // Clear the table container

  // Create table
  const table = tableContainer
    .append("div")
    .attr("class", "table-container")
    .append("table");
  const thead = table.append("thead");
  const tbody = table.append("tbody");

  // Add header
  thead
    .append("tr")
    .selectAll("th")
    .data(Object.keys(data[0]))
    .enter()
    .append("th")
    .text((d) => d);

  // Add rows
  const rows = tbody.selectAll("tr").data(data).enter().append("tr");

  // Add cells
  rows
    .selectAll("td")
    .data((d) => Object.values(d))
    .enter()
    .append("td")
    .text((d) => d);
}

// Initial table data
UpdateGraph6(data2021);

// Add event listeners to buttons
d3.select("#button2021").on("click", () => {
  tableContainer.selectAll("table").style("opacity", 0);
  setTimeout(() => {
    UpdateGraph6(data2021);
    tableContainer.selectAll("table").style("opacity", 1);
  }, 100);
});

d3.select("#button2022").on("click", () => {
  tableContainer.selectAll("table").style("opacity", 0);
  setTimeout(() => {
    UpdateGraph6(data2022);
    tableContainer.selectAll("table").style("opacity", 1);
  }, 100);
});

function resizeTable() {
  const tableWidth = tableContainer.node().getBoundingClientRect().width;
  tableContainer
    .selectAll(".table-container")
    .style("width", tableWidth + "px");
}

d3.select(window).on("resize", resizeTable);

// Initial table setup
resizeTable();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// graph 3
//// graph 3
const buttonsGraph3 = document.querySelectorAll(".buttons.graph3 button");
buttonsGraph3[0].classList.add("clicked");
buttonsGraph3.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph3.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

// set the dimensions and margins of the graph
let marginGraph3, widthGraph3, heightGraph3, innerRadius, outerRadius;

// Check if the screen width is less than or equal to 600px (phone screen)
if (window.matchMedia("(max-width: 600px)").matches) {
  marginGraph3 = { top: 20, right: 0, bottom: 0, left: 0 };
  widthGraph3 = 360 - marginGraph3.left - marginGraph3.right;
  heightGraph3 = 320 - marginGraph3.top - marginGraph3.bottom;
  innerRadius = 50;
  outerRadius = (Math.min(widthGraph3, heightGraph3) / 3) * 5;
} else {
  marginGraph3 = { top: 100, right: 0, bottom: 0, left: 0 };
  widthGraph3 = 600 - marginGraph3.left - marginGraph3.right;
  heightGraph3 = 460 - marginGraph3.top - marginGraph3.bottom;
  innerRadius = 90;
  outerRadius = (Math.min(widthGraph3, heightGraph3) / 3) * 8;
}

const svgGraph3 = d3
  .select("#my_dataviz3")
  .append("svg")
  .attr("width", widthGraph3 + marginGraph3.left + marginGraph3.right)
  .attr("height", heightGraph3 + marginGraph3.top + marginGraph3.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (widthGraph3 / 2 + marginGraph3.left) +
      "," +
      (heightGraph3 / 2 + marginGraph3.top) +
      ")"
  );

function updateGraph3(selectedYear) {
  d3.csv("./datasets/accidente_majore.csv").then(function (data) {
    // remove existing bars and labels
    svgGraph3.selectAll("g").remove();

    const filteredData = data.filter((d) => {
      const date = new Date(d["data_accident"]);
      return date.getFullYear() === parseInt(selectedYear);
    });
    const accidentsByCounty = d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d.judet
    );

    const formattedData = Array.from(accidentsByCounty, ([judet, Value]) => ({
      judet,
      Value,
    }));

    // Scales
    var x = d3
      .scaleBand()
      .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0) // This does nothing
      .domain(
        data.map(function (d) {
          return d.judet;
        })
      ); // The domain of the X axis is the list of states.
    var y = d3
      .scaleRadial()
      .range([innerRadius, outerRadius]) // Domain will be define later.
      .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data

    // Remove existing traffic restriction rectangles
    svgGraph3.selectAll(".circular-bars").remove();
    // Add the bars
    svgGraph3
      .append("g")
      .selectAll("path")
      .data(formattedData)
      .attr("class", "circular-bars")
      .enter()
      .append("path")
      .attr("fill", "#0145ac")
      .attr(
        "d",
        d3
          .arc() // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function (d) {
            return y(d["Value"]);
          })
          .startAngle(function (d) {
            return x(d.judet);
          })
          .endAngle(function (d) {
            return x(d.judet) + x.bandwidth();
          })
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    svgGraph3.selectAll(".label-bars").remove();
    // Add the labels
    svgGraph3
      .append("g")
      .selectAll("g")
      .data(formattedData)
      .attr("class", "label-bars")
      .enter()
      .append("g")
      .attr("text-anchor", function (d) {
        return (x(d.judet) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
          Math.PI
          ? "end"
          : "start";
      })
      .attr("transform", function (d) {
        return (
          "rotate(" +
          (((x(d.judet) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
          ")" +
          "translate(" +
          (y(d["Value"]) + 10) +
          ",0)"
        );
      })
      .append("text")
      .text(function (d) {
        return d.judet;
      })
      .attr("transform", function (d) {
        return (x(d.judet) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
          Math.PI
          ? "rotate(180)"
          : "rotate(0)";
      })
      .style("font-size", "11px")
      .attr("alignment-baseline", "middle")
      .attr("opacity", 0) // Set initial opacity to 0
      .transition() // Add transition
      .duration(1000) // Transition duration in milliseconds
      .attr("opacity", 1); // Final opacity
  });
}

updateGraph3("2021");

///////////////////////////////////////////////////////////////////////////
/// graph 12
/// Graph 12
const buttonsGraph12 = document.querySelectorAll(".buttons.graph12 button");
buttonsGraph12[0].classList.add("clicked");
buttonsGraph12.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph12.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

if (window.matchMedia("(max-width: 600px)").matches) {
  marginGraph12 = { top: 20, right: 0, bottom: 0, left: 0 };
  widthGraph12 = 400 - marginGraph12.left - marginGraph12.right;
  heightGraph12 = 320 - marginGraph12.top - marginGraph12.bottom;
  sc = 2000;
} else {
  marginGraph12 = { top: 100, right: 0, bottom: 0, left: 0 };
  widthGraph12 = 700 - marginGraph12.left - marginGraph12.right;
  heightGraph12 = 460 - marginGraph12.top - marginGraph12.bottom;
  sc = 3000;
}

const svgGraph12 = d3
  .select("#my_dataviz12")
  .attr("width", widthGraph12 + marginGraph12.left + marginGraph12.right)
  .attr("height", heightGraph12 + marginGraph12.top + marginGraph12.bottom)
  .append("g")
  .attr("transform", `translate(${marginGraph12.left}, ${marginGraph12.top})`);

// Map and projectionGraph12
const projectionGraph12 = d3
  .geoMercator()
  .center([25, 46]) // GPS of location to zoom on
  .scale(1000) // This is like the zoom
  .translate([widthGraph12 / 2, heightGraph12 / 3]);

// Load external data and boot
d3.json(
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
).then(function (data) {
  // Filter data
  data.features = data.features.filter((d) => d.properties.name == "Romania");

  // Center and scale the projection for Romania
  projectionGraph12.center([24.96676, 45.94316]).scale(sc);

  // Create a color scale
  const color = d3
    .scaleOrdinal()
    .domain(["Low Fatal", "High Fatal"])
    .range(["#ff9900", "#ff0000"]);

  // Add a scale for bubble size
  const size = d3
    .scaleLinear()
    .domain([1, 100]) // What's in the data
    .range([4, 50]); // Size in pixel

  // Draw the map
  svgGraph12
    .append("g")
    .selectAll("path")
    .data(data.features)
    .join("path")
    .attr("fill", "#b8b8b8")
    .attr("d", d3.geoPath().projection(projectionGraph12))
    .style("stroke", "black")
    .style("opacity", 0.3);

  // Load the Romanian accidents data
  d3.csv("./datasets/accidente2.csv").then(function (accidentsData) {
    // Function to check if a category is selected
    function isChecked(value) {
      return d3
        .select(`input[type="checkbox"][value="${value}"]`)
        .property("checked");
    }

    let selectedYear = 2021; // Add a variable to store the currently selected year

    function updateGraph12(year) {
      selectedYear = year; // Update the selected year when the function is called

      // Clear existing circles
      svgGraph12.selectAll("g.circles").remove();

      // Filter the data based on the selected year
      const filteredData = accidentsData.filter(
        (d) =>
          d.an == year &&
          (d.categorie === "High Fatal" || d.categorie === "Low Fatal")
      );

      const markers = filteredData.map((d) => ({
        long: +d.lat,
        lat: +d.long,
        group: d.categorie,
      }));

      const highFatalMarkers = markers.filter(
        (d) => d.group === "High Fatal" && isChecked("HighFatal")
      );
      const lowFatalMarkers = markers.filter(
        (d) => d.group === "Low Fatal" && isChecked("LowFatal")
      );

      // Create separate groups for Low Fatal and High Fatal accidents
      const lowFatalGroup = svgGraph12
        .append("g")
        .attr("class", "circles lowFatal");
      const highFatalGroup = svgGraph12
        .append("g")
        .attr("class", "circles highFatal");

      // Add circles for Low Fatal accidents
      lowFatalGroup
        .selectAll("circle")
        .data(lowFatalMarkers)
        .join("circle")
        .attr("class", (d) => d.group.replace(" ", ""))
        .attr("cx", (d) => projectionGraph12([d.long, d.lat])[0])
        .attr("cy", (d) => projectionGraph12([d.long, d.lat])[1])
        .attr("r", 2) // Set the smallest bubble size
        .style("fill", (d) => color(d.group))
        .attr("stroke", (d) => color(d.group))
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4);

      // Add circles for High Fatal accidents
      highFatalGroup
        .selectAll("circle")
        .data(highFatalMarkers)
        .join("circle")
        .attr("class", (d) => d.group.replace(" ", ""))
        .attr("cx", (d) => projectionGraph12([d.long, d.lat])[0])
        .attr("cy", (d) => projectionGraph12([d.long, d.lat])[1])
        .attr("r", 2) // Set the smallest bubble size
        .style("fill", (d) => color(d.group))
        .attr("stroke", (d) => color(d.group))
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4);
    }
    // Initialize the map with the 2021 data
    updateGraph12(2021);

    // Bind the updateGraph12 function to the buttons
    d3.selectAll(".buttons.graph12 button").on("click", function () {
      const year = +d3.select(this).text();
      updateGraph12(year);
    });

    // When a checkbox changes, call updateGraph12 with the currently selected year
    d3.selectAll(".checkbox").on("change", function () {
      updateGraph12(selectedYear);
    });
  });

  // This function is gonna change the opacity and size of selected and unselected circles
  function update() {
    updateGraph12(selectedYear); // Call updateGraph12 with the currently selected year

    // When a button change, I run the update function
    d3.selectAll(".buttons.graph12 button").on("click", function () {
      const year = +d3.select(this).text();
      updateGraph12(year);
    });

    // For each check box:
    d3.selectAll(".checkbox").each(function (d) {
      cb = d3.select(this);
      grp = cb.property("value").replace(" ", "");

      // If the box is checked, I show the group
      if (cb.property("checked")) {
        svgGraph12
          .selectAll("." + grp)
          .transition()
          .duration(1000)
          .style("opacity", 1)
          .attr("r", 2); // Set the smallest bubble size

        // Otherwise I hide it
      } else {
        svgGraph12
          .selectAll("." + grp)
          .transition()
          .duration(1000)
          .style("opacity", 0)
          .attr("r", 0);
      }
    });
  }
  // When a button change, I run the update function
  d3.selectAll(".buttons.graph12 button").on("click", function () {
    const year = +d3.select(this).text();
    updateGraph12(year);
  });
  // And I initialize it at the beginning
  update();
});

///////
/// graph 4
// Set the dimensions and margins of the graph
//// graph 4
//// graph 4
const buttonsGraph4 = document.querySelectorAll(".buttons.graph4 button");
buttonsGraph4[0].classList.add("clicked");
buttonsGraph4.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph4.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

// Set the dimensions and margins of the graph

// set the dimensions and margins of the graph
let marginGraph4, widthGraph4, heightGraph4;

// Check if the screen width is less than or equal to 600px (phone screen)
if (window.matchMedia("(max-width: 600px)").matches) {
  marginGraph4 = { top: 20, right: 20, bottom: 0, left: 70 };
  widthGraph4 = 340 - marginGraph4.left - marginGraph4.right;
  heightGraph4 = 320 - marginGraph4.top - marginGraph4.bottom;
} else {
  (marginGraph4 = { top: 0, right: 80, bottom: 20, left: 70 }),
    (widthGraph4 = 550 - marginGraph4.left - marginGraph4.right),
    (heightGraph4 = 400 - marginGraph4.top - marginGraph4.bottom);
}

// Append the svg object to the body of the page
const svgGraph4 = d3
  .select("#my_dataviz4")
  .append("svg")
  .attr("width", widthGraph4 + marginGraph4.left + marginGraph4.right)
  .attr("height", heightGraph4 + marginGraph4.top + marginGraph4.bottom + 100)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginGraph4.left + "," + marginGraph4.top + ")"
  );

// X axis scale
const xGraph4 = d3.scaleLinear().range([0, widthGraph4]);
const xAxisGraph4 = svgGraph4
  .append("g")
  .attr("transform", "translate(0," + heightGraph4 + ")");

// Y axis scale
const yGraph4 = d3.scaleBand().range([heightGraph4, 0]).padding(0.2);
const yAxisGraph4 = svgGraph4.append("g").attr("class", "myYaxis");

function updateGraph4(selectedYear) {
  d3.csv("./datasets/accidente_majore.csv").then(function (data) {
    // remove existing bars and labels
    svgGraph4.selectAll("circle").remove();
    svgGraph4.selectAll(".myLine").remove();

    const filteredData = data.filter((d) => {
      const date = new Date(d["data_accident"]);
      return date.getFullYear() === parseInt(selectedYear);
    });
    const accidentsByCounty = d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d.regiune
    );

    const formattedData = Array.from(accidentsByCounty, ([regiune, Value]) => ({
      regiune,
      Value,
    }));

    formattedData.sort((a, b) => a.Value - b.Value);

    // X axis
    xGraph4.domain([
      0,
      d3.max(formattedData, function (d) {
        return +d.Value;
      }),
    ]);
    xAxisGraph4.transition().duration(1000).call(d3.axisBottom(xGraph4));

    // Y axis
    yGraph4.domain(
      formattedData.map(function (d) {
        return d.regiune;
      })
    );
    yAxisGraph4
      .transition()
      .duration(1000)
      .call(d3.axisLeft(yGraph4).tickSize(0).tickPadding(10))
      .selectAll("text") // Select all Y-axis labels
      .selectAll(".tick text"); // Select all Y-axis labels

    // variable u: map formattedData to existing circle
    var j = svgGraph4.selectAll(".myLine").data(formattedData);
    // update lines
    j.enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
      .attr("x1", xGraph4(0))
      .attr("x2", function (d) {
        return xGraph4(d.Value);
      })
      .attr("y1", function (d) {
        return yGraph4(d.regiune);
      })
      .attr("y2", function (d) {
        return yGraph4(d.regiune);
      })
      .attr("stroke", "grey");

    // variable u: map formattedData to existing circle
    var u = svgGraph4.selectAll("circle").data(formattedData);
    // update bars
    u.enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("cx", function (d) {
        return xGraph4(d.Value);
      })
      .attr("cy", function (d) {
        return yGraph4(d.regiune);
      })
      .attr("r", 8)
      .attr("fill", "#0145ac");
  });
}

updateGraph4("2021");
