# Free Developers Resources (XaaS)

There are plenty of interesting services (XaaS) out there and some offer even free tiers for developers and small teams. I collect them in this list.

> Students may also checkout [GitHub Student Developer Pack](https://education.github.com/pack) which may even offer better deals.

   <div id="filterContainer">
      <label for="filterInput">Filter:</label>
      <input type="text" id="filterInput" />
      <select id="columnSelect">
        <option value="">All Columns</option>
      </select>
    </div>
    <div id="tableContainer"></div>

    <script>
      // Sample JSON data
      var jsonData = [
        { Name: "John\nAdams", Age: 30, City: "New York" },
        { Name: "Jane", Age: 25, City: "London" },
        { Name: "Bob", Age: 35, City: "Paris" },
      ];

      // Create the table dynamically
      var tableContainer = document.getElementById("tableContainer");
      var table = document.createElement("table");

      // Create the table header
      var thead = document.createElement("thead");
      var headerRow = document.createElement("tr");
      var columns = Object.keys(jsonData[0]);
      columns.forEach(function (column) {
        var th = document.createElement("th");
          var filterbox = document.createElement("input")
          filterbox.id = column
          filterbox.type = "text"
        th.textContent = column;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create the table body
      var tbody = document.createElement("tbody");
      function createTableBody(data) {
        tbody.innerHTML = ""; // Clear previous table body
        var row = document.createElement("tr")
        tbody.appendChild(row);
        data.forEach(function (rowData) {
          var row = document.createElement("tr");
          columns.forEach(function (column) {
            var cell = document.createElement("td");
            cell.textContent = rowData[column];
            row.appendChild(cell);
          });
          tbody.appendChild(row);
        });
      }
      createTableBody(jsonData);
      table.appendChild(tbody);

      // Append the table to the container
      tableContainer.appendChild(table);

      // Create the column filter options
      var columnSelect = document.getElementById("columnSelect");
      columns.forEach(function (column) {
        var option = document.createElement("option");
        option.value = column;
        option.textContent = column;
        columnSelect.appendChild(option);
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
            return rowData[selectedColumn]
              .toString()
              .toLowerCase()
              .includes(query);
          } else {
            return Object.values(rowData).some(function (value) {
              return value.toString().toLowerCase().includes(query);
            });
          }
        });
        createTableBody(filteredData);
      }
    </script>