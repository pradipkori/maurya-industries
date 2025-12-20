import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Clear old token on login page load
  useEffect(() => {
    localStorage.removeItem("adminToken");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://maurya-industries-backend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.success === true) {
        localStorage.setItem("adminToken", data.token);

        // ✅ FORCE redirect (most reliable)
        window.location.href = "/admin/dashboard";
        return;
      }

      setError("Invalid admin credentials");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center py-20">
        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="bg-card p-8 rounded-lg shadow w-full max-w-md border"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h2>

          <Input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative mt-4">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
