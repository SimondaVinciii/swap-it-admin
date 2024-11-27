export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
export const getUsers = () => {
  // return fetch("https://swap-it-api.onrender.com/api/v1/users").then((res) => res.json());
  return fetch("http://localhost:3002/api/v1/users").then((res) => res.json());
}
export const getItems = () => {
  // return fetch("https://swap-it-api.onrender.com/api/v1/items").then((res) => res.json());
  return fetch("http://localhost:3002/api/v1/items").then((res) => res.json());
}
export const getTransactions = () => {
  // return fetch("https://swap-it-api.onrender.com/api/v1/transactions").then((res) => res.json());
  return fetch("http://localhost:3002/api/v1/transactions").then((res) => res.json());
}