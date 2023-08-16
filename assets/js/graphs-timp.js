const buttonsGraph1 = document.querySelectorAll(".buttons.graph1 button");
buttonsGraph1[0].classList.add("clicked");
buttonsGraph1.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph1.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

var marginGraph1 = { top: 30, right: 30, bottom: 70, left: 60 };
var width = 460 - marginGraph1.left - marginGraph1.right;
var height = 400 - marginGraph1.top - marginGraph1.bottom;

var svgGraph1 = d3
  .select("#my_dataviz1")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr(
    "viewBox",
    `0 0 ${width + marginGraph1.left + marginGraph1.right} ${
      height + marginGraph1.top + marginGraph1.bottom
    }`
  )
  .classed("svg-content-responsive", true)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginGraph1.left + "," + marginGraph1.top + ")"
  );

var xGraph1 = d3.scaleBand().range([0, width]).padding(0.2);
var xAxisGraph1 = svgGraph1
  .append("g")
  .attr("transform", "translate(0," + height + ")");

var yGraph1 = d3.scaleLinear().range([height, 0]);
var yAxisGraph1 = svgGraph1.append("g").attr("class", "myYaxis");

function updateGraph1(selectedVar) {
  d3.csv("./datasets/accidente_majore.csv").then(function (data) {
    data.forEach((d) => {
      const date = new Date(d["data_accident"]);
      d.year = date.getFullYear();
      d.month = date.getMonth() + 1;
      d.tip_accident = d["tip_accident"];
    });

    const groupedData = d3.group(data, (d) => d.year);

    const accidentsByYearAndMonth = new Map();

    groupedData.forEach((accidents, year) => {
      const accidentsByMonth = d3.rollup(
        accidents,
        (v) => v.length,
        (d) => d.month
      );
      accidentsByYearAndMonth.set(year, accidentsByMonth);
    });

    const formattedData = [];

    for (let month = 1; month <= 12; ++month) {
      const row = { month };
      accidentsByYearAndMonth.forEach((accidentsByMonth, year) => {
        row[`count_${year}`] = accidentsByMonth.get(month) || 0;
      });
      formattedData.push(row);
    }

    xGraph1.domain(
      formattedData.map(function (d) {
        return d.month;
      })
    );
    xAxisGraph1.transition().duration(1000).call(d3.axisBottom(xGraph1));

    yGraph1.domain([
      0,
      d3.max(formattedData, function (d) {
        return +d[selectedVar];
      }),
    ]);
    yAxisGraph1.transition().duration(1000).call(d3.axisLeft(yGraph1));

    var u = svgGraph1.selectAll("rect").data(formattedData);

    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        return xGraph1(d.month);
      })
      .attr("y", function (d) {
        return yGraph1(d[selectedVar]);
      })
      .attr("width", xGraph1.bandwidth())
      .attr("height", function (d) {
        return height - yGraph1(d[selectedVar]);
      })
      .attr("fill", "#0145ac");
  });
}

// Initialize plot
updateGraph1("count_2021");

// Make the chart responsive
var aspect = width / height;
var chart = d3.select("#my_dataviz1 svg");

d3.select(window).on("resize", function () {
  var targetWidth = chart.node().getBoundingClientRect().width;
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

///////////////////////////////////////////////////////////////////////////
// for graph2
const buttonsGraph2 = document.querySelectorAll(".buttons.graph2 button");
buttonsGraph2[0].classList.add("clicked");
buttonsGraph2.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph2.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

var windowWidth2 =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var marginGraph2 = { top: 0, right: 20, bottom: 30, left: 20 };

var width2;
var height2;
var xCol;

if (windowWidth2 < 900) {
  width2 = 380;
  height2 = 150;
  xCol = [
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Iun",
    "Iul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
} else {
  width2 = 500 + marginGraph2.left + marginGraph2.right + 550;
  height2 = 400 - marginGraph2.top - marginGraph2.bottom;
  xCol = [
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];
}

var svgGraph2 = d3
  .select("#my_dataviz2")
  .append("svg")
  .attr("width", width2)
  .attr("height", height2 + marginGraph2.top + marginGraph2.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginGraph2.left + "," + marginGraph2.top + ")"
  );
var xGraph2 = d3.scaleTime().range([0, width2]);
var xAxisGraph2 = svgGraph2
  .append("g")
  .attr("transform", "translate(0," + height2 + ")");

var yGraph2 = d3.scaleLinear().range([height2, 0]);
var yAxisGraph2 = svgGraph2.append("g").attr("class", "myYaxis");

function update2(selectedYear) {
  d3.csv("./datasets/accidente_majore.csv").then(function (data) {
    // Filter the data based on the selected year
    const filteredData = data.filter((d) => {
      const date = new Date(d["data_accident"]);
      return date.getFullYear() === parseInt(selectedYear);
    });

    filteredData.forEach((d) => {
      d.date = new Date(d["data_accident"]);
      d.city = d["city"];
    });

    const accidentsByDate = d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d.date.toISOString().slice(0, 10)
    );

    const formattedData = Array.from(accidentsByDate, ([date, count]) => ({
      date: new Date(date),
      count,
    }));

    formattedData.sort((a, b) => a.date - b.date);

    xGraph2.domain(d3.extent(formattedData, (d) => d.date));
    xAxisGraph2
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xGraph2).tickFormat((d, i) => xCol[i % xCol.length]));

    yGraph2.domain([0, d3.max(formattedData, (d) => d.count)]);
    yAxisGraph2.transition().duration(1000).call(d3.axisLeft(yGraph2));

    const line = d3
      .line()
      .x((d) => xGraph2(d.date))
      .y((d) => yGraph2(d.count));

    // Define the date ranges for traffic restrictions
    const trafficRestrictionRanges = [
      {
        startDate: new Date("2021-01-01"),
        endDate: new Date("2021-05-18"),
      },
      {
        startDate: new Date("2021-10-25"),
        endDate: new Date("2021-12-09"),
      },
    ];

    // Remove existing traffic restriction rectangles
    svgGraph2.selectAll(".traffic-restriction-rect").remove();

    // Append rectangles for each date range
    trafficRestrictionRanges.forEach((range) => {
      if (
        (selectedYear == 2021 &&
          range.startDate.getFullYear() == 2021 &&
          range.endDate.getFullYear() == 2021) ||
        (selectedYear == 2022 &&
          range.startDate.getFullYear() == 2022 &&
          range.endDate.getFullYear() == 2022)
      ) {
        svgGraph2
          .append("rect")
          .attr("class", "traffic-restriction-rect")
          .attr("x", xGraph2(range.startDate))
          .attr("y", 0)
          .attr("width", xGraph2(range.endDate) - xGraph2(range.startDate))
          .attr("height", height2)
          .attr("fill", "gray")
          .attr("opacity", 0.2);
      }
    });

    svgGraph2.selectAll(".line-path").remove();

    const newPath = svgGraph2
      .append("path")
      .datum(formattedData)
      .attr("class", "line-path")
      .attr("fill", "none")
      .attr("stroke", "#0145ac")
      .attr("stroke-width", 1.5);

    // Save the initial and final paths for the transition
    const initialPath = d3
      .line()
      .x((d) => xGraph2(d.date))
      .y((d) => height2);
    const finalPath = line;

    // Apply the transition
    newPath
      .attr("d", initialPath(formattedData))
      .transition()
      .duration(1000)
      .attr("d", finalPath(formattedData));
  });
}

// Initialize plot
update2(2021);
///////////////////////////////////
/// graph 13
const buttonsGraph13 = document.querySelectorAll(".buttons.graph13 button");
buttonsGraph13[0].classList.add("clicked");
buttonsGraph13.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph13.forEach((button) => {
      button.classList.remove("clicked");
    });

    button.classList.add("clicked");
  });
});

var marginGraph13 = { top: 30, right: 30, bottom: 70, left: 30 };
var width13 = 460 - marginGraph13.left - marginGraph13.right;
var height13 = 400 - marginGraph13.top - marginGraph13.bottom;

var svgGraph13 = d3
  .select("#my_dataviz13")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr(
    "viewBox",
    `0 0 ${width13 + marginGraph13.left + marginGraph13.right} ${
      height13 + marginGraph13.top + marginGraph13.bottom
    }`
  )
  .classed("svg-content-responsive", true)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginGraph13.left + "," + marginGraph13.top + ")"
  );

var xGraph13 = d3.scaleBand().range([0, width13]).padding(0.2);
var xAxisGraph13 = svgGraph13
  .append("g")
  .attr("transform", "translate(0," + height13 + ")");

var yGraph13 = d3.scaleLinear().range([height13, 0]);
var yAxisGraph13 = svgGraph13.append("g").attr("class", "myYaxis");

function updateGraph13(selectedVar) {
  d3.csv("./datasets/accidente_majore.csv").then(function (data) {
    data.forEach((d) => {
      const date = new Date(d["data_accident"]);
      d.year = date.getFullYear();
      d.dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      d.tip_accident = d["tip_accident"];
    });

    const groupedData = d3.group(data, (d) => d.year);

    const accidentsByYearAndDayOfWeek = new Map();

    groupedData.forEach((accidents, year) => {
      const accidentsByDayOfWeek = d3.rollup(
        accidents,
        (v) => v.length,
        (d) => d.dayOfWeek
      );
      accidentsByYearAndDayOfWeek.set(year, accidentsByDayOfWeek);
    });

    const formattedData = [];

    const daysOfWeekTranslations = {
      Sunday: "Duminică",
      Monday: "Luni",
      Tuesday: "Marți",
      Wednesday: "Miercuri",
      Thursday: "Joi",
      Friday: "Vineri",
      Saturday: "Sâmbătă",
    };

    Object.keys(daysOfWeekTranslations).forEach((day) => {
      const row = { dayOfWeek: daysOfWeekTranslations[day] };
      accidentsByYearAndDayOfWeek.forEach((accidentsByDayOfWeek, year) => {
        row[`count_${year}`] = accidentsByDayOfWeek.get(day) || 0;
      });
      formattedData.push(row);
    });

    xGraph13.domain(
      formattedData.map(function (d) {
        return d.dayOfWeek;
      })
    );
    xAxisGraph13.transition().duration(1000).call(d3.axisBottom(xGraph13));

    yGraph13.domain([
      0,
      d3.max(formattedData, function (d) {
        return +d[selectedVar];
      }),
    ]);
    yAxisGraph13.transition().duration(1000).call(d3.axisLeft(yGraph13));

    var u = svgGraph13.selectAll("rect").data(formattedData);

    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        return xGraph13(d.dayOfWeek);
      })
      .attr("y", function (d) {
        return yGraph13(d[selectedVar]);
      })
      .attr("width", xGraph13.bandwidth())
      .attr("height", function (d) {
        return height13 - yGraph13(d[selectedVar]);
      })
      .attr("fill", "#0145ac");
  });
}

// Initialize plot
updateGraph13("count_2021");

// Make the chart responsive
var aspect = width13 / height13;
var chart = d3.select("#my_dataviz13 svg");

d3.select(window).on("resize", function () {
  var targetwidth13 = chart.node().getBoundingClientRect().width;
  chart.attr("width", targetwidth13);
  chart.attr("height", targetwidth13 / aspect);
});

//////////////////////////////////////
//// graph 8 + 9
////// graph 8
const buttonsGraph8 = document.querySelectorAll(".buttons.graph8 button");
buttonsGraph8[0].classList.add("clicked");
buttonsGraph8.forEach((button) => {
  button.addEventListener("click", function () {
    buttonsGraph8.forEach((button) => {
      button.classList.remove("clicked");
    });
    button.classList.add("clicked");
  });
});

const data2021Graph8 = [
  {
    time: "Dimineața",
    "Accidente minore": 5746,
    "Accidente majore": 1333,
  },
  {
    time: "După-amiaza",
    "Accidente minore": 9286,
    "Accidente majore": 1814,
  },
  {
    time: "Seara",
    "Accidente minore": 5773,
    "Accidente majore": 1380,
  },
  {
    time: "Noaptea",
    "Accidente minore": 983,
    "Accidente majore": 379,
  },
];

const data2022Graph8 = [
  {
    time: "Dimineața",
    "Accidente minore": 6197,
    "Accidente majore": 1224,
  },
  {
    time: "După-amiaza",
    "Accidente minore": 9576,
    "Accidente majore": 1725,
  },
  {
    time: "Seara",
    "Accidente minore": 6167,
    "Accidente majore": 1369,
  },
  {
    time: "Noaptea",
    "Accidente minore": 1311,
    "Accidente majore": 386,
  },
];

function updateGraph8(year) {
  d3.select("#my_dataviz8").html("");

  var data = year === 2021 ? data2021Graph8 : data2022Graph8;

  var marginGraph8 = { top: 10, right: 30, bottom: 20, left: 50 },
    widthGraph8 = 460 - marginGraph8.left - marginGraph8.right,
    heightGraph8 = 400 - marginGraph8.top - marginGraph8.bottom;

  var svgGraph8 = d3
    .select("#my_dataviz8")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 460 400")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr(
      "transform",
      "translate(" + marginGraph8.left + "," + marginGraph8.top + ")"
    );

  var subgroups = Object.keys(data[0]).slice(1);
  var groups = data.map(function (d) {
    return d.time;
  });

  var x = d3.scaleBand().domain(groups).range([0, widthGraph8]).padding([0.2]);
  svgGraph8
    .append("g")
    .attr("transform", "translate(0," + heightGraph8 + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  var y = d3.scaleLinear().domain([0, 10000]).range([heightGraph8, 0]);
  svgGraph8.append("g").call(d3.axisLeft(y));

  var color = d3.scaleOrdinal().domain(subgroups).range(["#367be2", "#0145ac"]);

  var stackedData = d3.stack().keys(subgroups)(data);

  var mouseover = function (d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    d3.selectAll(".myRect").style("opacity", 0.2);
    d3.selectAll("." + subgroupName.replace(/ /g, "")).style("opacity", 1);
  };

  var mouseleave = function (d) {
    d3.selectAll(".myRect").style("opacity", 1);
  };

  svgGraph8
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", function (d) {
      return color(d.key);
    })
    .attr("class", function (d) {
      return "myRect " + d.key.replace(/ /g, "");
    })
    .selectAll("rect")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.data.time);
    })
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth())
    .attr("stroke", "grey")
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave);

  var legend = svgGraph8
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(subgroups)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend
    .append("rect")
    .attr("x", widthGraph8 - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

  legend
    .append("text")
    .attr("x", widthGraph8 - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function (d) {
      if (d === "Accidente minore") return "Accidente minore";
      else if (d === "Accidente majore") return "Accidente majore";
    });
}

var chart = d3.select("#my_dataviz8 svg");
var aspect = 460 / 400;

d3.select(window).on("resize", function () {
  var targetWidth = chart.node().getBoundingClientRect().width;
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

updateGraph8(2021);

///////////////////////////////////////////////////////////
// graph 9 - tables

const data2021Graph9 = [
  {
    "Accident group": "Accidente majore",
    Dimineața: 1333,
    "După-amiaza": 1814,
    Seara: 1380,
    Noaptea: 379,
  },
  {
    "Accident group": "Accidente minore",
    Dimineața: 5746,
    "După-amiaza": 9286,
    Seara: 5773,
    Noaptea: 983,
  },
];

const data2022Graph9 = [
  {
    "Accident group": "Accidente majore",
    Dimineața: 1224,
    "După-amiaza": 1725,
    Seara: 1369,
    Noaptea: 386,
  },
  {
    "Accident group": "Accidente minore",
    Dimineața: 6197,
    "După-amiaza": 9576,
    Seara: 6167,
    Noaptea: 1311,
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
