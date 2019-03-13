var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Password",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
});

function userPurchase() {

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the Item ID which you would like to purchase.',
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            filter: Number
        }
    ]).then(function (input) {

        var item = input.id;
        var quantity = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { id: item }, function (err, res) {
            if (err) throw err;
            // console.table(res);
            if (res.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = res[0];

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('\nCongratulations, your item is in stock!\n');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;

                    // Update the inventory
                    connection.query(updateQueryStr, function (err, res) {
                        if (err) throw err;

                        // console.table(res);
                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('\nPlease shop with us again soon!\n');
                        console.log("\n---------------------------------------------------------------------\n");
                        // // console.table(res);
                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('\nSorry, there is not enough in stock, your order can not be placed as is.\n');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");
                    // console.log("Please enter a new item ID");
                    userPurchase();
                    // displayInventory();
                }
            }
        })
    })
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {

    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, res) {
        if (err) throw err;

        console.log('\n                _.~"~._.~"~._.~BAMAZON PRODUCTS FOR SALE~._.~"~._.~"~._\n')

        console.table(res);

        //Prompt the user for item/quantity they would like to purchase
        userPurchase();

    })
}

// runBamazon will execute the main application logic
function runBamazon() {

    // Display the available inventory
    displayInventory();
}

// Run the application logic
runBamazon();





