export function reload(arr, place, component) {
    let box = document.querySelector(`.${place}`);
    if (!box) {
      return;
    }
    box.innerHTML = '';  
    for (const item of arr) {
      let elem = component(item);
      box.append(elem);
    }
  }
