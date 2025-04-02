import { redirect } from "next/navigation";
import Dashboard from "./dashboard/page";

export default function Home() {
  // Simulating authentication state (Replace with real auth check)
  // const isAuthenticated = false; // Replace this with a real check

  // if (!isAuthenticated) {
  //   redirect("/auth/login"); // Redirect to login if not authenticated
  // }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
    <Dashboard/>
    </main>
  );
}
