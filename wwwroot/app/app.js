"use strict";

let app = angular.module('BangAPI', ['ngRoute']);

app.config(($routeProvider)=> {
  $routeProvider
  .when('/', {
    templateUrl: 'app/partials/customers.html',
    controller: 'CustomerCtrl'
  })
  .when('/customers/:customerId', {
    templateUrl: 'app/partials/customersingle.html',
    controller: 'CustomerSingleCtrl'
  })
  .when('/orders', {
    templateUrl: 'app/partials/orders.html',
    controller: 'OrdersCtrl'
  })
  .when('/orders/:orderId', {
    templateUrl: 'app/partials/ordersingle.html',
    controller: 'OrdersSingleCtrl'
  })
  .when('/products', {
    templateUrl: 'app/partials/products.html',
    controller: 'ProductsCtrl'
  })
  .when('/products/:productId',{
    templateUrl: 'partials/productsingle.html',
    controller: 'ProductsSingleCtrl'
  })
  .otherwise('/');
});
