import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextauth.token?.email !== process.env.NEXT_PUBLIC_EMAIL &&
      req.nextUrl.pathname.startsWith("/admin-dashboard") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/dashboard",
    "/admin-dashboard/work-post",
    "/admin-dashboard/work-post/new1",
    "/admin-dashboard/work-post/edit/:id",
    "/admin-dashboard/work-post/delete/:id",
    "/admin-dashboard/users",
    "/admin-dashboard/users/new1",
    "/admin-dashboard/users/edit/:id",
    "/admin-dashboard/users/delete/:id",
  ],
};
