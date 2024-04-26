export function fetchLoggedInUserOrders(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/orders/" + order.id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/users/" + userId);
    const data = await response.json();
    localStorage.setItem("userInfo", JSON.stringify(data));
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    console.log(update);
    const response = await fetch("https://nex-market-backend.vercel.app/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
