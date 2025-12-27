import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Tab = "dashboard" | "enquiries" | "products";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // 📦 FETCH DATA
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const p = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res => res.json());

      const e = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiries`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res => res.json());

      if (p?.success) setProducts(p.products);
      if (e?.success) setEnquiries(e.enquiries);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🗑 DELETE PRODUCT
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    fetchData();
  };

  // 🗑 DELETE ENQUIRY
  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/enquiries/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    fetchData();
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Maurya Admin</h2>

        <nav className="flex flex-col gap-3">
          <Button
            variant={tab === "dashboard" ? "default" : "ghost"}
            onClick={() => setTab("dashboard")}
          >
            Dashboard
          </Button>

          <Button
            variant={tab === "enquiries" ? "default" : "ghost"}
            onClick={() => setTab("enquiries")}
          >
            Enquiries
          </Button>

          <Button
            variant={tab === "products" ? "default" : "ghost"}
            onClick={() => setTab("products")}
          >
            Products
          </Button>

          <Button variant="ghost" onClick={() => navigate("/admin/add-product")}>
            + Add Product
          </Button>
        </nav>

        <div className="mt-auto">
          <Button variant="destructive" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        {/* ================= DASHBOARD ================= */}
        {tab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border rounded p-6">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <h2 className="text-3xl font-bold">{products.length}</h2>
              </div>

              <div className="bg-white border rounded p-6">
                <p className="text-sm text-muted-foreground">Total Enquiries</p>
                <h2 className="text-3xl font-bold">{enquiries.length}</h2>
              </div>

              <div className="bg-white border rounded p-6">
                <p className="text-sm text-muted-foreground">System Status</p>
                <h2 className="text-xl font-semibold text-green-600 mt-2">
                  Active
                </h2>
              </div>
            </div>
          </>
        )}

        {/* ================= ENQUIRIES ================= */}
        {tab === "enquiries" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Enquiries</h1>

            {enquiries.length === 0 ? (
              <p>No enquiries found.</p>
            ) : (
              <div className="bg-white border rounded overflow-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map(e => (
                      <tr key={e._id} className="border-t">
                        <td className="p-3">{e.name}</td>
                        <td className="p-3">{e.email}</td>
                        <td className="p-3">{e.message}</td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteEnquiry(e._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ================= PRODUCTS ================= */}
        {tab === "products" && (
          <>
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <input
                placeholder="Search product..."
                className="border px-3 py-2 rounded"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div key={p._id} className="bg-white border rounded p-4">
                    <h3 className="font-bold">{p.name}</h3>
                    {p.shortDesc && (
                      <p className="text-sm mt-2">{p.shortDesc}</p>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/admin/edit-product/${p._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProduct(p._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
