import http from 'node:http'
import { loadTemplate } from './modules/template.mjs'
import { getProducts } from './modules/data.mjs'

 //HW rewrite using switch
const server = http.createServer(async (req,res) => {
    let html;
    switch (req.url) {
        case "/":
            html = await loadTemplate('home.html');
            const products = await getProducts();
            let list = ``;
            products.forEach(product => {
                list += `<h2>${product.name}</h2>`;
            });
            html = html.toString().replace("{% CATALOG %}", list);
            break;
        case "/cart":
            html = await loadTemplate('cart.html');
            break;
        case "/pay":
            html = await loadTemplate('pay.html');
            break;
        default:
            html = await loadTemplate('not_found.html');
            res.statusCode = 404;
            break;
    }
    res.setHeader("Content-type", "text/html");
    res.end(html);
});

server.listen("3000","localhost")