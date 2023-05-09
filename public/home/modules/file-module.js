import { client } from "./client.js";

export class file_manager {

  constructor(scope, http, timeout) {
    this.folders = [];
    this.files = [];
    this.directories = [];
    this.cl = new client(http);
    this.scope = scope;
    this.http = http;
    this.timeout = timeout;
  }

  loadFolders() {
    this.cl.get('/folders', (folders) => {
      this.scope.folders = folders;
    });
  }

  showMore(index, callback) {
    const folder = this.cl.getElements('.folder.ng-scope')[index];
    this.cl.toggleActive(folder);
    folder.className.includes('active') ? this.moreFolder(index) : this.lessFolder(index);
  }

  moreFolder(index, callback) {
    this.cl.post('/getFolders', { path: this.getFolderPath(index), fileName: this.getFolderName(index) }, folders => {
      folders.forEach((folder, i) => {
        this.scope.folders.splice(index + i + 1, 0, folder);
      });
      this.timeout(() => {
        folders.forEach((folder, i) => {
          let thisI = index + i + 1;
          let thisDiv = this.cl.getElements('.folder.ng-scope')[thisI];
          if (thisI === index + 1) {
            if (thisI === 1) {
              thisDiv.style.width = 'calc(100% - 15px)';
            } else {
              let width = (parseInt(thisDiv.previousElementSibling.style.width.substr(12, 4)) + 15).toString();
              thisDiv.style.width = 'calc(100% - ' + width + 'px)';
            }
          } else {
            thisDiv.style.width = thisDiv.previousElementSibling.style.width;
          }
        });
      }, 0);
    });
    if (callback) {
      callback();
    }
  }

  lessFolder(index) {
    let indexes = [];
    let folderPath = this.getFolderPath(index);
    this.scope.folders.forEach((folder, i) => {
      if (folder.path.length > folderPath.length) {
        indexes.push(i);
      }
    });
    this.scope.folders.splice(indexes[0], indexes.length);
  }

  openFolder(index) {
    console.log(index);
    this.cl.post('/getFolderItems', { path: this.getFolderPath(index), fileName: this.getFolderName(index) }, files => {
      this.scope.files = files;
      this.setFolderActive(index);
      this.generateDirPath(this.getFolder(index));
    });
  }

  fileClick(index) {
    let files = this.cl.getElements('.file');
    let name = this.getFile(index).name;
    let folders = this.cl.getElements('.folder.ng-scope');
    let foldersHTML = [];
    folders.forEach((folder, i) => {
      foldersHTML.push(this.cl.getElements('.folder.ng-scope .folder-name h4')[i].innerHTML);
    });
    if (this.getFile(index).type === 'fa-solid fa-folder-open') {
      if (foldersHTML.includes(name)) {
        let folderIndex = foldersHTML.indexOf(this.getFile(index).name);
        this.openFolder(folderIndex);
      } else {
        let folderNames = this.cl.getElements('.folder .folder-name');
        folderNames.forEach((folder, i) => {
          if (folder.className.includes('active')) {
            this.moreFolder(i, () => {
              this.timeout(() => {
                this.openFolder(i+index+1);
              }, 100);
            });
          }
        });
      }
    }
  }



  generateDirPath(folder) {
    let path = folder.path.split('/');
    let name = folder.name;
    if (!this.scope.directories.includes(name)) {
      this.scope.directories = [];
      if (path.length > 3) {
        for (let i = 3; i < path.length; i++) {
          this.scope.directories.push(path[i]);
        }
        this.scope.directories.push(name);
      } else {
        this.scope.directories.push(name);
      }
    }
    this.timeout(() => {
      this.setDirectoryActive(folder);
    });
  }

  setDirectoryActive(folder) {
    let directories = this.cl.getElements('.directory-item');
    let names = this.cl.getElements('.directory-item h3');
    let name = folder.name;
    let index;
    directories.forEach((directory, i) => {
      this.cl.removeActive(directory);
      if (names[i].innerHTML === name) {
        index = i;
      }
    });
    this.cl.setActive(directories[index]);
  }

  setFolderActive(index) {
    let folders = this.cl.getElements('.folder.ng-scope .folder-name');
    folders.forEach(folder => {
      this.cl.removeActive(folder);
    });
    this.cl.setActive(folders[index]);
  }

  getFolder(index) {
    return this.scope.folders[index];
  }

  getFile(index) {
    return this.scope.files[index];
  }

  getFolders() {
    return this.scope.folders;
  }

  getFiles() {
    return this.scope.files;
  }

  getFolderPath(index) {
    return this.scope.folders[index].path;
  }

  getFolderName(index) {
    return this.scope.folders[index].name;
  }

}