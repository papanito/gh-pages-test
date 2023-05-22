// var jsonData = fetch("./resources.json")
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// Sample JSON data
// var jsonData = [
//   { Name: "John\nAdams", Age: 30, City: "New York" },
//   { Name: "Jane", Age: 25, City: "London" },
//   { Name: "Bob", Age: 35, City: "Paris" },
// ];
var jsonData = [
  {
    name: "codeconv",
    description:
      "a tool to see absolute coverage and coverage changes overlayed with your source code",
    url: "https://codecov.io",
    pricing: "https://about.codecov.io/pricing/",
    features: [
      "Unlimited Public / Private Repositories",
      "SAML Ready",
      "Community Support",
      "Integrates with [github], [gitlab] and [bitbucket]",
    ],
    category: ["build", "code scan"],
  },
];

window.onload = function () {
  // Create the table dynamically
  var table = document.createElement("table");

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var columns = Object.keys(jsonData[0]);
  columns.forEach(function (column) {
    if (column != "url") {
      var th = document.createElement("th");
      var filterbox = document.createElement("input");
      filterbox.id = column;
      filterbox.type = "text";
      th.textContent = column;
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement("tbody");
  function createTableBody(data) {
    tbody.innerHTML = ""; // Clear previous table body
    var row = document.createElement("tr");
    tbody.appendChild(row);
    data.forEach(function (rowData) {
      var row = document.createElement("tr");
      columns.forEach(function (column) {
        if (column != "url") {
          var cell = document.createElement("td");
          if (column == "name") {
            cell.innerHTML =
              "<a href='" + rowData["url"] + "'>" + rowData[column] + "</a>";
          } else if (column == "pricing") {
            cell.innerHTML =
              "<a href='" + rowData[column] + "'>" + column + "</a>";
          } else if (column == "features" || column == "category") {
            var features = "<ul>";
            rowData[column].forEach(function (feature) {
              features += "<li>" + feature + "</li>";
            });
            features += "</ul>";
            cell.innerHTML = features;
          } else {
            cell.textContent = rowData[column];
          }
          row.appendChild(cell);
        }
      });
      tbody.appendChild(row);
    });
  }
  createTableBody(jsonData);
  table.appendChild(tbody);

  // Append the table to the container
  var tableContainer = document.getElementById("tableContainer");
  tableContainer.appendChild(table);

  // Create the column filter options
  var columnSelect = document.getElementById("columnSelect");
  columns.forEach(function (column) {
    if (column != "url") {
      var option = document.createElement("option");
      option.value = column;
      option.textContent = column;
      columnSelect.appendChild(option);
    }
  });

  // Filter the table based on user input
  var filterInput = document.getElementById("filterInput");
  var selectedColumn = "";
  filterInput.addEventListener("input", filterTable);
  columnSelect.addEventListener("change", function () {
    selectedColumn = columnSelect.value;
    filterTable();
  });

  function filterTable() {
    var query = filterInput.value.toLowerCase();
    var filteredData = jsonData.filter(function (rowData) {
      if (selectedColumn) {
        return rowData[selectedColumn].toString().toLowerCase().includes(query);
      } else {
        return Object.values(rowData).some(function (value) {
          return value.toString().toLowerCase().includes(query);
        });
      }
    });
    createTableBody(filteredData);
  }
};
