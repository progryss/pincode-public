// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

import mongoose from "mongoose";
import { router as authRouter } from "./router/auth-routes.js"; 

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());

app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use("/api-v2/*", authenticateUser);

async function authenticateUser(req,res,next){
  try {
    let shop = req.query.shop;
    let storeName = await shopify.config.sessionStorage.findSessionsByShop(shop);
    if(shop  === storeName[0].shop ){
      next();
    }else{
      res.send("user not Authorised");
    }
  } catch (error) {
    console.log(error);
    res.send("not working")
  }
}

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/store/info", async (req, res) => {
  let storeInfo = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  })
  res.status(200).send(storeInfo)
})

app.get("/api/Allproducts", async (req, res) => {

  try {
    let Allproducts = await shopify.api.rest.Product.all({
      session: res.locals.shopify.session,
    });
    res.status(200).send(Allproducts)

  } catch (error) {
    console.log(error);
  }
})

app.use('/api-v2',authRouter)

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});




mongoose.connect("mongodb://localhost:27017/publicAppData").then(()=>{
  console.log("mongoDB connected")
  app.listen(PORT);
})
.catch((error)=>{
  console.log(error);
})





