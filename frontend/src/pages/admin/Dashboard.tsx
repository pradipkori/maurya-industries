import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Plus,
  LogOut,
  Search,
  Edit,
  Trash2,
  TrendingUp,
  Activity,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

type Tab = "dashboard" | "enquiries" | "products";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔐 AUTH CHECK (SAME AS OLD CODE)
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
    }
  }, []);

  // 📦 FETCH REAL DATA (MATCHES OLD WORKING LOGIC)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const productsRes = await fetch(`${API_BASE}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const enquiriesRes = await fetch(`${API_BASE}/api/enquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productsJson = await productsRes.json();
      const enquiriesJson = await enquiriesRes.json();

      // ✅ IMPORTANT FIX
      if (productsJson?.success) {
        setProducts(productsJson.products);
      }

      if (enquiriesJson?.success) {
        setEnquiries(enquiriesJson.enquiries);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🗑 DELETE PRODUCT (REAL DB)
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`${API_BASE}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    fetchData();
  };

  // 🗑 DELETE ENQUIRY (REAL DB)
  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;

    await fetch(`${API_BASE}/api/enquiries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    fetchData();
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <p className="text-slate-300 text-lg">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* MOBILE MENU */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 text-white"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:relative z-40 w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col h-screen transition-transform ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold text-white mb-10">
          Maurya Admin
        </h2>

        <nav className="flex flex-col gap-3 flex-1">
          <NavButton
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={tab === "dashboard"}
            onClick={() => setTab("dashboard")}
          />
          <NavButton
            icon={<MessageSquare />}
            label="Enquiries"
            badge={enquiries.length}
            active={tab === "enquiries"}
            onClick={() => setTab("enquiries")}
          />
          <NavButton
            icon={<Package />}
            label="Products"
            badge={products.length}
            active={tab === "products"}
            onClick={() => setTab("products")}
          />
        </nav>

        <Button
          className="mt-auto bg-red-500/20 border border-red-500/30"
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className="mr-2" /> Logout
        </Button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {tab === "dashboard" && (
          <>
            <h1 className="text-4xl font-bold text-white mb-6">
              Dashboard Overview
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                icon={<Package />}
                label="Total Products"
                value={products.length}
                gradient="from-blue-500 to-indigo-600"
              />
              <StatCard
                icon={<MessageSquare />}
                label="Total Enquiries"
                value={enquiries.length}
                gradient="from-purple-500 to-pink-600"
              />
              <StatCard
                icon={<Activity />}
                label="System Status"
                value="Active"
                gradient="from-green-500 to-emerald-600"
                isStatus
              />
            </div>
          </>
        )}

        {tab === "enquiries" && (
          <div className="space-y-4">
            {enquiries.map((e) => (
              <div
                key={e._id}
                className="bg-white/5 p-4 rounded-xl flex justify-between"
              >
                <div>
                  <p className="text-white font-medium">{e.name}</p>
                  <p className="text-slate-400 text-sm">{e.email}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => deleteEnquiry(e._id)}
                >
                  <Trash2 className="mr-1" /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}

        {tab === "products" && (
          <>
            <input
              placeholder="Search products..."
              className="mb-4 px-4 py-2 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white/5 p-6 rounded-2xl"
                >
                  <h3 className="text-white font-bold">{p.name}</h3>
                  <p className="text-slate-400 text-sm">{p.shortDesc}</p>

                  <div className="flex gap-2 mt-4">
                    <Button>
                      <Edit className="mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteProduct(p._id)}
                    >
                      <Trash2 className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function NavButton({ icon, label, active, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
      {badge > 0 && (
        <span className="ml-auto bg-blue-500 text-white px-2 rounded-full text-xs">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, label, value, gradient, isStatus }: any) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl">
      <div
        className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <p className="text-slate-400">{label}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      {isStatus && <CheckCircle className="text-green-400 mt-2" />}
    </div>
  );
}
