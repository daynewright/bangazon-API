'use strict';

app.controller('CustomerCtrl', function($scope, SearchService){

  $scope.$watch(function () { return SearchService.getSearchText(); }, function (newValue, oldValue) {
      if (newValue !== null) {
          $scope.searchText= SearchService.getSearchText();
      }
  }, true);


});
