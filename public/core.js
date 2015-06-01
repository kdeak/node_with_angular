// public/core.js
var hrExtension = angular.module('hrExtension', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/angular/jelenletek')
          .success(function (data) {
            console.log("core-get-data: " + data);
            $scope.jelenletek = data;
            console.log("core-get-jelenletek: " + $scope.jelenletek);
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });

  $scope.createTodo = function () {
    console.log("core-create-scope: " + $scope);
    console.log("core-create-scope.formData: " + $scope.formData);
    $http.post('/angular/jelenletek', $scope.formData)
            .success(function (data) {
              $scope.formData = {};
              $scope.jelenletek = data;
            })
            .error(function (data) {
              console.log('Error: ' + data);
            });
  };

  $scope.deleteTodo = function (id) {
    $http.delete('/angular/jelenletek/' + id)
            .success(function (data) {
              console.log("core-delete-id: " + id);
              $scope.jelenletek = data;
            })
            .error(function (data) {
              console.log('Error: ' + data);
            });
  };
}