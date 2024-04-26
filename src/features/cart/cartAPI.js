export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(cart) {
  return new Promise(async (resolve) => {
    console.log(cart);
    const response = await fetch("https://nex-market-backend.vercel.app/cart/" + cart);
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    }
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  // get all items and delete each of them
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
