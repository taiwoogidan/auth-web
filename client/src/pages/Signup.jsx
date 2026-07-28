import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    const user = {
      fname,
      lname,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        navigate("/signin");

        setFname("");
        setLname("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError();
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-50 px-4 py-8 sm:px-6">
      <section className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-slate-900">Auth Web</h1>
          <p className="mt-1 text-sm text-slate-600">
            Create an account to continue
          </p>
        </div>
        {message && <p className="mb-3 text-sm text-emerald-600">{message}</p>}
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="First name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
          <input
            type="email"
            name=""
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            required
          />
          <input
            type="password"
            name=""
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
