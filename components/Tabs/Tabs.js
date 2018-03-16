
class TabsItem {
  constructor(element) {
    this.element = element;
    // attach dom element to object. Example in Tabs class
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
    // should use classList
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
    // should use classList
  }
}

class TabsLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabsItem = parent.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    // reassign this.tabsItem to be a new instance of TabsItem, passing it this.tabsItem
    this.tabsItem = new TabsItem(this.tabsItem);
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    // select this link
    this.element.classList.add("Tabs__item-selected");
    // select the associated tab
    this.tabsItem.select();
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
    // deselect this link
    this.tabsItem.deselect();
    // deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabsLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
  }

  updateActive(newActive) {
    // deselect the old active link
    this.activeLink.deselect();
    // assign the new active link
    this.activeLink = newActive;
  }

  getTab(data) {
return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);

    
  }

}

let tabs = document.querySelectorAll(".Tabs"); 
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));

// take query string looks for all elements and returns as node list, which is an array-like object uses forEach
// use the tab item classname and the data attribute to select the proper tab