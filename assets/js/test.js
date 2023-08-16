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
