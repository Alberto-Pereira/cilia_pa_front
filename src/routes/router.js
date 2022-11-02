import { createRouter, createWebHashHistory } from "vue-router";

import WelcomeIndex from "@/pages/WelcomeIndex.vue";

import ClientIndex from "@/pages/clients/ClientIndex.vue";
import ProductIndex from "@/pages/products/ProductIndex.vue";
import SaleIndex from "@/pages/sales/SaleIndex.vue";

const routes = [
  { path: "/", name: "WelcomeIndex", component: WelcomeIndex, meta: { title: 'Home' } },
  { path: "/clients", name: "ClientIndex", component: ClientIndex, meta: { title: 'Clients' } },
  { path: "/products", name: "ProductIndex", component: ProductIndex, meta: { title: 'Products' } },
  { path: "/sales", name: "SaleIndex", component: SaleIndex, meta: { title: 'Sales' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})

export default router;
