'use strict';

app.controller('NavCtrl', function($scope, SearchService){

  let searchText = SearchService.getSearchText();
  $scope.search = {};
  $scope.search.text = searchText;

  $scope.$watch('search.text', function(newValue) {
    $scope.search.text = newValue;
    SearchService.setSearchText(newValue);
  });


});
