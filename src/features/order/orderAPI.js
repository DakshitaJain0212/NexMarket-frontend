export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  console.log(order);
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  console.log(sort);
  console.log(pagination);

  for (let key in sort) {
    console.log("key", key);
    console.log(sort[key]);
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    console.log("key", key);
    console.log(pagination[key]);
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/orders?" + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function fetchOrder() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/orders");
    const data = await response.json();
    resolve({ data });
  });
}
