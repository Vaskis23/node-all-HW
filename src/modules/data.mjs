import { readFile, writeFile } from 'node:fs/promises'

const getProducts = async () => {
    let data = await readFile("./storage/products.json");
    let products = JSON.parse(data.toString());
    return products
}

const saveCart = async (cart) => {
    await writeFile("./storage/cart.json", JSON.stringify(cart, null, 2));
    return true
}

const cart = {
    items: []
}

//HW make a function called - getCart() wich using promises will load the cart at the beginning
const getCart = async () => {
    try {
        let data = await readFile("./storage/cart.json");
        let cart = JSON.parse(data.toString());
        return cart;
    } catch (error) {
        console.error("Error loading cart:", error);
        return { items: [] }; // Return empty cart if there's an error
    }
};

export { getProducts, saveCart, cart, getCart };