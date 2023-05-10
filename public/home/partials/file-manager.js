import { file_manager } from "../modules/file-module.js";

const app = angular.module('myApp', []);

app.controller('myCtrl', async ($scope, $http, $timeout) => {
  const fm = new file_manager($scope, $http, $timeout);

  $scope.directories = [];

  fm.loadFolders();
  $scope.showMore = (index, callback) => {
    fm.showMore(index); 
  }
  $scope.openFolder = index => {
    fm.openFolder(index);
  }
  $scope.fileClick = index => {
    fm.fileClick(index);
  }

  /*$
  $scope.fileClick = (index) => {
    let files = document.querySelectorAll('.file');
    let name = document.querySelectorAll('.file .file-name h4')[index].innerHTML;
    let folders = document.querySelectorAll('.folder.ng-scope .folder-name');
    let foldersHTML = [];
    folders.forEach((folder, i) => {
      foldersHTML.push(document.querySelectorAll('.folder.ng-scope .folder-name h4')[i].innerHTML);
    })
    $timeout(() => {
      if ($scope.files[index].type === "fa-solid fa-folder-open") {
        if (foldersHTML.includes($scope.files[index].name)) {
          post($http, '/getFolderItems', { path: $scope.folders[foldersHTML.indexOf($scope.files[index].name)].path, fileName: $scope.folders[foldersHTML.indexOf($scope.files[index].name)].name }, files => {
            folders.forEach(folder => {
              folder.classList.remove('active');
            });
            folders[foldersHTML.indexOf($scope.files[index].name)].classList.add('active');
            $scope.files = files;
            $scope.directories.push(name);
            $timeout(() => {
              $scope.setDirectoryActive($scope.directories.length - 1);
            }, 0);
          });
        } else {
          folders.forEach((folder, i) => {
            if (folder.className === "folder-name active") {
              $scope.showMore(i, () => {
                $timeout(() => {
                  folders = document.querySelectorAll('.folder.ng-scope .folder-name');
                  for (let j = 0; j < $scope.folders.length; j++) {
                    if ($scope.folders[j].name === $scope.files[index].name) {
                      post($http, '/getFolderItems', { path: $scope.folders[j].path, fileName: $scope.folders[j].name }, files => {
                        folders.forEach(folder => {
                          folder.classList.remove('active');
                        });
                        folders[j].classList.add('active');
                        $scope.files = files;
                        $scope.directories.push(name);
                        $timeout(() => {
                          $scope.setDirectoryActive($scope.directories.length - 1);
                        }, 0);
                      });
                    }
                  }
                }, 0);
              });
            }
          });
        }
      }
    }, 0);
  }


  $scope.previusFolder = () => {
    let folders = document.querySelectorAll('.folder.ng-scope .folder-name');
    let foldersHTML = [];
    folders.forEach((folder, i) => {
      foldersHTML.push(document.querySelectorAll('.folder.ng-scope .folder-name h4')[i].innerHTML);
    })
    folders.forEach((folder, i) => {
      if (folder.className === 'folder-name active') {
        if (i > 0) {
          let arrayPath = $scope.folders[i].path.split("/");
          post($http, '/getFolderItems', { path: $scope.folders[foldersHTML.indexOf(arrayPath[arrayPath.length - 1])].path, fileName: $scope.folders[foldersHTML.indexOf(arrayPath[arrayPath.length - 1])].name }, files => {
            folders.forEach(folder => {
              folder.classList.remove('active');
            });
            folders[foldersHTML.indexOf(arrayPath[arrayPath.length - 1])].classList.add('active');
            $scope.navDirectory(i - 1);
            $scope.files = files;
          });
        }
      }
    });
  }


  $scope.createDirectory = () => {
    let foldersName = document.querySelectorAll('.folder .folder-name');
    let folders = document.querySelectorAll('.folder');
    let addFolder = document.querySelector('.folder.addFolder');
    foldersName.forEach((folder, i) => {
      if (folder.className === 'folder-name active') {
        if (addFolder.className.includes('active')) {
          let width;
          console.log(i);
          if (i === 0) {
            width = 15;
          } else {
            width = (parseInt(addFolder.previousElementSibling.style.width.substr(12, 4)) + 15).toString();
          }
          folders[i].parentNode.insertBefore(addFolder, folders[i].nextSibling);
          addFolder.style.width = 'calc(100% - ' + width + 'px)';
        }
      }
    });
    $timeout(() => {
      document.querySelector('#folderName').focus();
    }, 0);
  }*/

});