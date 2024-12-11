## Shopify

Project is hosted at: https://svetlinexam.netlify.app/

Implements Cloud Firestore SDK as BAAS

## Idea
Shopify app is an application that allows authorized users to create new products. Unauthorized user could add products to their shopping cart. Authorized users can create, edit and delete their owned products.

## Public part
* Unauthorized user
  * User has access to Home page.
  * User has access to Register page.
  * User has access to Login page.
  * User has access to Catalog page (with no edit/delete functionalities, which are ownerbound).
  * User has access to product Details page.
  * Home page lists 5 most recently added products.
  
## Private part
* Authorized user
  * User could add a new product.
  * User has edit/delete access to all created products by themselves.
  * User has access to profile page, where username or password can be changed. If password is changed user gets logged-out & redirected to login page.
  * Each user has his own shopping cart, where products are added by clicking "Add to Cart".
    
## Functionality
* All input fields error-handling.
* API error-handling.

## Client Project setup
```
npm install
```

```
ng serve --open
```

### Compiles and minifies for production
```
ng build --configuration production
```


