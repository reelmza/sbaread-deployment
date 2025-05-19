import { auth } from "./auth";

export default auth((req) => {
  // If no auth and user is on an auth page
  if (
    !(
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/set-password" ||
      req.nextUrl.pathname === "/reset-password" ||
      req.nextUrl.pathname === "/signup"
    ) &&
    !req.auth
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // If auth and user is trying to visit login page
  if (
    (req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/set-password" ||
      req.nextUrl.pathname === "/reset-password" ||
      req.nextUrl.pathname === "/signup") &&
    req.auth
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    console.log(newUrl);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
