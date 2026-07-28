import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";

export default function Profile() {
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
        Loading profile...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader user={user} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Account
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Profile information
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            These are the details associated with your account.
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                First name
              </dt>
              <dd className="mt-1 break-words font-medium text-slate-900">
                {user?.fname}
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last name
              </dt>
              <dd className="mt-1 break-words font-medium text-slate-900">
                {user?.lname}
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </dt>
              <dd className="mt-1 break-all font-medium text-slate-900">
                {user?.email}
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}
