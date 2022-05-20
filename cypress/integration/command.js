/*let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(id => {
    LOCAL_STORAGE_MEMORY[id] = localStorage[id];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(id => {
    localStorage.setItem(id, LOCAL_STORAGE_MEMORY[id]);
  });
});*/