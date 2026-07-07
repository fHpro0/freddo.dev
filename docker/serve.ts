// Static file server for Astro dist/. Reads from volume mount at runtime,
// so host rebuilds appear without restarting the container.
const ROOT = "/dist";
const PORT = 3000;

async function resolve(pathname: string) {
  // ponytail: naive path map. Astro static emits foo/index.html for /foo.
  const candidates = [
    `${ROOT}${pathname}`,
    `${ROOT}${pathname}/index.html`,
    `${ROOT}${pathname}.html`,
  ];
  if (pathname === "/") candidates.unshift(`${ROOT}/index.html`);
  for (const p of candidates) {
    // guard against ../ traversal escaping ROOT
    if (!p.startsWith(ROOT)) continue;
    const f = Bun.file(p);
    if (await f.exists()) return f;
  }
  return null;
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const clean = decodeURIComponent(pathname).replace(/\/+$/, "") || "/";
    const file = await resolve(clean);
    if (file) return new Response(file);
    const notFound = Bun.file(`${ROOT}/404.html`);
    if (await notFound.exists())
      return new Response(notFound, { status: 404 });
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`serving ${ROOT} on :${PORT}`);
