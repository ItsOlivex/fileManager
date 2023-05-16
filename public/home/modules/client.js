export class client {
  constructor(http) {
    this.http = http;
  }

  getElement(DOM) {
    return document.querySelector(DOM);
  }

  getElements(DOM) {
    return document.querySelectorAll(DOM);
  }

  get(url, callback) {
    this.http.get(url).then((res) => {
      callback(res.data);
    });
  }

  post(url, data, callback) {
    this.http.post(url, data).then((res) => {
      callback(res.data);
    })
  }

  setActive(element) {
    element.classList.add('active');
  }

  removeActive(element) {
    element.classList.remove('active');
  }

  toggleActive(element) {
    element.classList.toggle('active');
  }

  blurActive(title) {
    this.setActive(this.getElement('section.blur'));
    this.getElement('.blur-title h1').innerHTML = title;
  }

  blurRemove() {
    this.removeActive(this.getElement('section.blur'));
  }

}