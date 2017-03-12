# Instructions
After install mongodb, run `mongod --dbpath=$PWD/data` in one terminal, then open another terminal and load our database using following commands.
```
mongoimport --db schemadb --collection buyers --type json --file buyer.json --jsonArray --drop
mongoimport --db schemadb --collection sellers --type json --file seller.json --jsonArray --drop
mongoimport --db schemadb --collection products --type json --file product.json --jsonArray --drop
```

# Our website
Link to website: [http://zsls.herokuapp.com](http://zsls.herokuapp.com)

There are 5 pages in our website: the main search page, the user login page, the user register page, the seller home page, the buyer homepage, the item description page and the order confirmation page. Users are divided into sellers and buyers.

Admin need to manually add `admin.html` to the end of the URL to access the admin page, and use password 'wozuidiao' to sign in.

## In the main search page
1. only buyer that has logged in can search items
2. buyer can search item by the item name, the item will display if you typed in a substring of the item name
3. buyer can search item by choosing the department, it will display all the items in that department
4. buyer can sort the item by price when searching, the cheapest item will display first

## In the user login page
1. user need to provide their username and password, and choose correct role (either buyer or seller)
2. by clicking the `create user` button, it will redirect to register page which allows user to register

## In the item description page
1. display the item information, show the description and comments after clicking corresponding buttons
2. redirect to the order confirmation page after clicking the `buy it` button

## In the confirmation page
1. type in the address that the buyer needs to sent the item to
2. after clicking the `submit` button, the order is placed

## In our seller home page, the seller
1. can see a list of products that he posts
2. can see a list of products already sold out
3. can post a new product
4. can delete a product that already post

## In our buyer home page, the buyer
1. show the list of item that has been bought by the current user
2. add comments for the item that has been bought but the user has not commented
3. change the password

## In our admin page, the admin can
1. ban some of the buyers, sellers or products. Once the buyers and sellers have been banned, they can not log in anymore. Once the products have been banned, they can not be searched anymore.
2. change buyer/seller password

# Addition features
1. The buyer can comment on products that they bought.

2. After every login, every seller and buyer homepage has its own id, which is randomized to be 10 digits by the backend; so other people can not 'login in' as a particular user by entering the username in the url of a page (for security purposes). Users who attempt such methods will be redirected.
