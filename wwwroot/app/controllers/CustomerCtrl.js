'use strict';

app.controller('CustomerCtrl', function($scope, SearchService, CustomerFactory){

  $scope.$watch(function () { return SearchService.getSearchText(); }, function (newValue, oldValue) {
      if (newValue !== null) {
          $scope.searchText= SearchService.getSearchText();
      }
  }, true);

  $scope.deleteCustomer = (id) => {
    console.log(id);
    CustomerFactory.deleteCustomer(id)
    .then(()=> {
      $scope.customers = $scope.customers.filter((c)=> c.customerId !== id);
    });
  };

  CustomerFactory.getCustomers()
  .then((customers)=> {
    customers.forEach(c => c.dateFormated = moment(c.dateCreated).format('MM/DD/YYYY hh:mma'));
    $scope.customers = customers;
  });
});
