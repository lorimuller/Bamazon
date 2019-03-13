DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vintage Pentax Camera", "Electronics", 325, 10),
	   ("Vintage Polaroid", "Electronics", 445, 5),
       ("Polaroid 600 Film", "Electronics", 25, 30),
	   ("Silver Ring", "Jewlery", 50, 15),
       ("Diamond Earrings", "Jewlery", 450, 30),
       ("Turquoise Bracelet", "Jewlery",150, 11),
       ("Licensed To Ill by Beastie Boys", "Vinyl Records", 50, 3),
       ("Animals by Pink Floyd", "Vinyl Records", 30, 5),
       ("Gorillaz by Gorillaz", "Vinyl Records", 20, 7),
       ("The Best of Muddy Waters", "Vinyl Records", 24, 3);

SELECT * FROM products;