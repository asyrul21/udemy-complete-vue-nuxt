export default function (context) {
  console.log("[Middleware] Checking auth...");
  context.store.dispatch("initAuth", context.req);
}
