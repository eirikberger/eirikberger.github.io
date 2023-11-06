$(document).ready(function() {
    $('#csv-table').DataTable({
        ajax: {
            url: 'docs/table.csv',  // Adjust with your CSV file path
            dataType: 'text',
            dataSrc: function(data) {
                var lines = data.split('\n');
                return lines.slice(1).map(line => {  // Adjusted here: .slice(1) removes the first row
                    return line.split(',').map(cell => {
                        cell = cell.trim().replace(/^"(.*)"$/, '$1');
                        return cell === "" ? null : cell;
                    });
                }).filter(row => {
                    return row.some(cell => cell !== null && cell !== "");
                });
            }
        },
        columns: [
            // Example column names. Adjust based on your CSV structure
            { title: "Surname" },
            { title: "Firstname" },
            { title: "Income" },
            { title: "Wealth" },
            { title: "Occupation" },
            { title: "Residence" },
            { title: "Municipality" },
            { title: "Year" }
        ],
        columnDefs: [{
            targets: '_all',
            defaultContent: '-'
        }],
        paging: false,     // Disable pagination
        searching: false,  // Disable search bar
        info: false        // Disable showing info like "Showing 1 to 5 of 5 entries"
    });
});

