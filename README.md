## Supermarket_app

### This app will be made with the help of 2 different technologies:
- iOS
- ReactNative

On the iOS side, it will be developed in Swift 3 and on the ReactNative side it will
be developed with ReactNative version 0.35

## Short description
The app will be a virtual supermarket.
The 'client' will visit the mobile app, login, select the products that it wants by adding the, to the basket and in the end, buying them. 
The app will work offline and online.

## Long description

### Type of users
- Simple users - they can only view and buy products
- Administrators - they cand add, remove change existing products

### What it does
The user will visit the mobile app, login, select the products that it wants by pressing the "buy" button next to it, when he finished selecting what he wants
he will press checkout and "Finish order" so that it will buy the products. He will be prompted with a form for the checkout address.
The administrators have the purpose to add, remove and update current products.   
When the app is online and an order will be placed, he will receive an on the screen aproval if the server confirms the order.
If the user is offline while he makes an order, the app will save the order until it has internet, and when it has, it will send the order and the server will send 
the user a confirmation mail.

### Product
A product will have the following fields:
- title
- picture
- description
- price
- [future feature] map of the origin of the product

### Main UI [Table]
The after he logs in he will be prompted with a table of all the products, each cell will have the title and a thumbnail of the product.

### Chart
The user can see the most popular products in a chart of top 10.

### Product description
When he selects a cell he will be prompted with a modal view which will have the title, picture, description, price.