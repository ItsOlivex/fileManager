import { get, post } from "../modules/http-request.js";

const app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http, $timeout) => {

  get($http, '/folders', (folders) => {
    $scope.folders = folders;
    $timeout(() => {
      let foldersDiv = document.querySelectorAll('.folder');
      foldersDiv.forEach(folder => {
        folder.classList.add('fade');
      })
    }, 0);
  });

  $scope.directories = [];

  $scope.showMore = (index, callback) => {
    document.querySelectorAll('.folder')[index].classList.toggle('active');
    if (document.querySelectorAll('.folder')[index].className === 'folder ng-scope fade active' || document.querySelectorAll('.folder')[index].className === 'folder ng-scope active') {
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
            folderDiv.classList.add('fade');
            if (divIndex === index + 1) {
              if (divIndex === 1) {
                folderDiv.style.width = 'calc(100% - 15px)';
              } else {
                let width = (parseInt(folderDiv.previousElementSibling.style.width.substr(12, 4)) + 15).toString();
                folderDiv.style.width = 'calc(100% - ' + width + 'px)';
              }
            } else {
              folderDiv.style.width = folderDiv.previousElementSibling.style.width;
            }
          });
        }, 100);
        if (callback) {
          callback();
        }
      });
    } else {
      let folderDiv = document.querySelectorAll(".folder");
      let length = $scope.folders.length;
      let toRemove = [];
      for (let i = index + 1; i < length; i++) {
        if (parseInt(folderDiv[i].style.width.substr(12, 4)) > parseInt(folderDiv[index].style.width.substr(12, 4)) || folderDiv[index].style.width.length === 0) {
          folderDiv[i].classList.remove('fade');
          toRemove.push(i);
        }
      }
      $timeout(() => {
        $scope.folders.splice(toRemove[0], toRemove.length);
      }, 300);
    }
  }


  $scope.openFolder = (index) => {
    let name = document.querySelectorAll('.folder .folder-name h4')[index].innerHTML;
    $scope.directories = [];
    post($http, '/getFolderItems', { path: $scope.folders[index].path, fileName: name }, files => {
      let directories = $scope.folders[index].path.split('/');
      if (directories.length > 3) {
        for (let i = 3; i < directories.length; i++) {
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
    let dirName = document.querySelectorAll('.directory-item h3')[index].innerHTML;
    let folders = document.querySelectorAll('.folder .folder-name');
    let foldersHTML = [];
    folders.forEach((folder, i) => {
      foldersHTML.push(document.querySelectorAll('.folder .folder-name h4')[i].innerHTML);
    })
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
        $scope.setDirectoryActive(index);
        $scope.setFoldersActive(foldersHTML.indexOf(name));
        $scope.files = files;
      });
    }, 0);
  }


  $scope.setDirectoryActive = (index) => {
    let divDirectories = document.querySelectorAll('.directory-item');
    divDirectories.forEach(dir => {
      dir.classList.remove('active');
    });
    divDirectories[index].classList.add('active');
  }

  $scope.setFoldersActive = (index) => {
    let folders = document.querySelectorAll('.folder .folder-name');
    folders.forEach(folder => {
      folder.classList.remove('active');
    });
    folders[index].classList.add('active');
  }


  $scope.fileClick = (index) => {
    let files = document.querySelectorAll('.file');
    let name = document.querySelectorAll('.file .file-name h4')[index].innerHTML;
    let folders = document.querySelectorAll('.folder .folder-name');
    let foldersHTML = [];
    folders.forEach((folder, i) => {
      foldersHTML.push(document.querySelectorAll('.folder .folder-name h4')[i].innerHTML);
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
                  folders = document.querySelectorAll('.folder .folder-name');
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
    let folders = document.querySelectorAll('.folder .folder-name');
    let foldersHTML = [];
    folders.forEach((folder, i) => {
      foldersHTML.push(document.querySelectorAll('.folder .folder-name h4')[i].innerHTML);
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



  $scope.createFolder = () => {
    let folders = document.querySelectorAll('.folder .folder-name');
    folders.forEach((folder, i) => {
      if (folder.className.includes('active')) {
        
      } else {

      }
    })
  }









});