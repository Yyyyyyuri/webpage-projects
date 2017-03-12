## Project
Our project is a website for online shopping. The website serves for the people who loves to shop online or wants to sell products online. Sellers can put their products on the website can sell them. Buyers can both login to the website by their username or even shop as a guest on the website. They can use keyword to search the products, leave comments under the products.

## Data
We will use MongoDB noSQL database program to store the data.

## Features 
neccessary attributes * <br />
Seller: 1. register and login<br />
		2. post products to the website(*name,picture,*price,breifly discription)<br />
	    3. have a list showing all the sold and unsold products.<br />
        4. if the seller can not determine the price for the specific product, seller can post an auction for the product(*name,picture,minimum price(default zero), *maximum price, brief description).<br />
        5. once the product hits the maximum price, the auction close automatically. Seller can also close the auction in advance(2 options:a) the buyer who bits the highest price owns the product b) seller cancel the auction.)

        data structure:
        sellers: array of objects seller
        seller: an oject that contains : 1. username: string
        								 2. prodcuts: array of product objects
        product: object with attributes (name: string, price: string, picture: binary string, description: string)

Buyer: we have two types of buyers(registered user and guest)	   
	   registered user:
		   1. register and login <br />
		   2. search by a) the name of the product<br />
		   			  b) department, then sort by rate, price, sold amount,latest update<br />
		   3. post comments after he(she) bought the products.<br />
		   4. add the products to the shopping list and check out.<br />
		   5. make auctions for some particular products in the auction list.<br />
		   6. after confirming the shopping list, select pick up the products by him(her)self(*date) or mailing(*address,*phone number, *date)<br />
		guest: can only search products<br />

(implement if possible)Admin: 
        1. ban sellers or buyers by their ID<br />
	    2. list the user that has been banned<br />

Undate at Nov 20th.2016:
We are setting the first milestone.

Milestone: the week Nov 21st (due before Friday)

Possibly using cloud9 as the developing environment(first atempt)

1. Steeve:
	Interface for register both user and seller, man home page for searching
2. Yuri:
	Item description page 
3. Jasper:
	homepage for buyer(including sold list, post item), homepage for seller 
4. Kylin: 
	item listing page

Mandatory meeting : Thursday

