import { get, post } from "../modules/http-request.js";

const app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http) => {

  get($http, '/folders', (folders) => {
    $scope.folders = folders;
  });

  $scope.showMore = (index) => {
    document.querySelectorAll('.folder')[index].classList.toggle('active');
    if (document.querySelectorAll('.folder')[index].className === 'folder ng-scope active') {
      post($http, '/getFolders', {  }, (folders) => {
        let tmpFolders = [];
        for (let i = 0; i <= index; i++) {
          tmpFolders[i] = $scope.folders[i];
        }
        folders.forEach((folder) => {
          tmpFolders.push(folder);
        });
        $scope.folders.forEach((folder, i) => {
          if (i > index) {
            tmpFolders.push(folder);
          }
        });
        $scope.folders = tmpFolders;
      });
      
    } else {
      post($http, '/getFolders', {  }, (folders) => {
        console.log(index+folders.length);
        console.log($scope.folders.splice(index+1, folders.length));
      });
    }
  }

  $scope.openFolder = () => {
    post($http, '/getFolders', {}, files => {
      $scope.files = files;
    });
  }

  $scope.directories = ["cartella1", "cartella2", "cartella3", "cartella4"]


});