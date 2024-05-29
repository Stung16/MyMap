import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const path = request.nextUrl.pathname;
  const id = path.replace("/mind-maps/", "");
  const response = await fetch(`${process.env.SERVER_API}/api/mindmaps/${id}`);
  const data = await response.json();
  if (data?.mindmap?.status) {
    const res = await fetch(`${process.env.SERVER_API}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (res?.status !== 200) {
      return NextResponse.rewrite(new URL("/auth/signin", request.url));
    }
  }
  
}

export const config = {
  matcher: ["/mind-maps/:path*"],
};
