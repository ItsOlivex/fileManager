import { get, post } from "../modules/http-request.js";

const app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http, $timeout) => {

  get($http, '/folders', (folders) => {
    $scope.folders = folders;
  });

  $scope.directories = [];

  $scope.showMore = (index) => {
    document.querySelectorAll('.folder')[index].classList.toggle('active');
    if (document.querySelectorAll('.folder')[index].className === 'folder ng-scope active') {
      post($http, '/getFolders', { path: $scope.folders[index].path, fileName: document.querySelectorAll('.folder .folder-name h4')[index].innerHTML }, folders => {
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
        let folderDiv;
        $timeout(() => {
          folders.forEach((folder, i) => {
            let divIndex = index + i + 1;
            folderDiv = document.querySelectorAll(".folder")[divIndex];
            if (divIndex === index + 1) {
              if (divIndex === 1) {
                folderDiv.style.width = 'calc(100% - 20px)';
              } else {
                let width = (parseInt(folderDiv.previousElementSibling.style.width.substr(12, 4)) + 20).toString();
                console.log(width);
                folderDiv.style.width = 'calc(100% - ' + width + 'px)';  
              }
            } else {
              folderDiv.style.width = folderDiv.previousElementSibling.style.width;
            }
          });
        }, 0);
      });
    } else {
      let folderDiv = document.querySelectorAll(".folder");
      let length = $scope.folders.length;
      let toRemove = [];
      for (let i = index + 1; i < length; i++) {  
        if (parseInt(folderDiv[i].style.width.substr(12, 4)) > parseInt(folderDiv[index].style.width.substr(12, 4)) || folderDiv[index].style.width.length === 0) {
          toRemove.push(i);
        }
      }
      $scope.folders.splice(toRemove[0], toRemove.length);
    }
  }


  $scope.openFolder = (index) => {
    let name = document.querySelectorAll('.folder .folder-name h4')[index].innerHTML;
    $scope.directories = [];
    post($http, '/getFolderItems', { path: $scope.folders[index].path, fileName: name }, files => {
      let directories = $scope.folders[index].path.split('/');
      if (directories.length > 3) {
        for (let i = 3 ; i < directories.length; i++) {
          $scope.directories.push(directories[i]);
        }
        $scope.directories.push(name);
      } else {
        $scope.directories.push(name);
      }
      $timeout(() => {
        $scope.files = files;
        let divDirectory = document.querySelectorAll('.directory-item')[$scope.directories.length - 1];
        divDirectory.classList.add('active');
      }, 0);
    });
    let bgHover = document.querySelectorAll('.folder .folder-name');
    bgHover.forEach(name => {
      name.classList.remove('active');
    });
    bgHover[index].classList.add('active');
  }


  $scope.navDirectory = (index) => {
    let divDirectories = document.querySelectorAll('.directory-item');
    let dirName = document.querySelectorAll('.directory-item h3')[index].innerHTML;
    let path, name;
    for (let i = 0; i < $scope.folders.length; i++) {
      if ($scope.folders[i].name === dirName) {
        path = $scope.folders[i].path;
        name = $scope.folders[i].name;
        break;
      }
    }
    $timeout(() => {
      post($http, '/getFolderItems', { path: path, fileName: name }, files => { 
        divDirectories.forEach(dir => {
          dir.classList.remove('active');
        });
        divDirectories[index].classList.add('active');
        $scope.files = files;
      });
    }, 0);
  }



});