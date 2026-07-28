import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  async function logOut() {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader user={user} />
      <main className="flex min-h-[calc(100dvh-65px)] items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full max-w-xl rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Dashboard
          </p>
          <h1 className="mt-3 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome back, {user?.fname}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Your account is active and ready to use.
          </p>
          <Link
            to="/signin"
            className="mt-6 inline-flex rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => logOut()}
          >
            Logout
          </Link>
        </section>
      </main>
    </div>
  );
}
