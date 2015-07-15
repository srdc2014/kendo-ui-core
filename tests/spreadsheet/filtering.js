(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("filtering", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("filter hides rows that don't match the values", function() {
        sheet.range("A1:B2").values([
                [1, 2],
                [2, 3]
        ]).filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [1]
            })
        });

        equal(sheet.rowHeight(1), 0);
    });

    test("filter triggers the sheet change event", 1, function() {
        var range = sheet.range("A1:B2").values([
                [1, 2],
                [2, 3],
                [2, 4]
        ]);

        sheet.bind("change", function() {
            ok(true);
        });

        range.filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [2]
            })
        });
    });

    test("filter hides rows that don't match the values of the second column", function() {
        sheet.range("A1:B2").values([
            [1, 2],
            [2, 3]
        ]).filter({
            column: 1,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [2]
            })
        });

        equal(sheet.rowHeight(1), 0);
    });

    test("filter shows hidden rows", function() {
        sheet.range("A1:B2").values([
            [1, 2],
            [2, 3]
        ]).filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [2]
            })
        }).filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [1]
            })
        });

        equal(sheet.rowHeight(0), 20);
    });

    test("clearing a filter shows the hidden rows", function() {
        sheet.range("A1:B2").values([
            [1, 2],
            [2, 3]
        ]).filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [2]
            })
        });

        sheet.clearFilter(0);

        equal(sheet.rowHeight(0), 20);
    });

    test("prepares the filter with column range", 1, function() {
        var Filter = kendo.spreadsheet.Filter.extend({
            prepare: function(range) {
                equal(range._ref.toString(), "A1:A3");
            },
            matches: function() {
                return false;
            }
        });

        sheet.range("A1:B3").values([
            [1, 2],
            [1, 3],
            [2, 3]
        ]).filter({
            column: 0,
            filter: new Filter()
        });
    });

})();
