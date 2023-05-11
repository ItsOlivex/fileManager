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
  $scope.navDirectory = index => {
    fm.navDirectory(index);
  }
  $scope.previusFolder = () => {
    fm.previusFolder();
  }
  $scope.createDirectory = () => {
    fm.createDirectory();
  }
  $scope.inputFocus = () => {
    fm.inputFocus();
  }
  $scope.inputBlur = () => {
    fm.inputBlur();
  }

  /*const newFolder = document.querySelector('.folder.addFolder');
  const folderInput = document.querySelector('#folderName');
  document.querySelector('#folderName').focus();

  folderInput.addEventListener('focus', () => {
    newFolder.classList.remove('active');
  });

  folderInput.addEventListener('blur', () => {
    const folders = document.querySelectorAll('.folder');
    folders.forEach((folder, i) => {
      if (folder.className.includes('addFolder')) {
        folder.parentNode.insertBefore(folder, folders[folders.length-1].nextSibling);
      }
    });
    newFolder.classList.add('active');
  });




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