import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Protect admin route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // 🔁 Fetch data
  const fetchData = async () => {
    try {
      const enquiryRes = await fetch("http://localhost:5000/api/enquiries");
      const enquiryData = await enquiryRes.json();
      if (enquiryData.success) setEnquiries(enquiryData.enquiries);

      const productRes = await fetch("http://localhost:5000/api/products");
      const productData = await productRes.json();
      if (productData.success) setProducts(productData.products);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🗑 Delete enquiry
  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`http://localhost:5000/api/enquiries/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // 🗑 Delete product
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-muted-foreground">
          Loading admin data...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/admin/add-product")}>
              + Add Product
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* ===================== */}
        {/* Enquiries Section */}
        {/* ===================== */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Enquiries</h2>

          {enquiries.length === 0 ? (
            <p className="text-muted-foreground">No enquiries found.</p>
          ) : (
            <div className="overflow-auto border rounded">
              <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e._id} className="border-t">
                      <td className="p-3">{e.name}</td>
                      <td className="p-3">{e.email}</td>
                      <td className="p-3">{e.phone}</td>
                      <td className="p-3">{e.message}</td>
                      <td className="p-3">
                        <Button
                          variant="destructive"
                          size="sm"
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
        </section>

        {/* ===================== */}
        {/* Products Section */}
        {/* ===================== */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Products</h2>

          {products.length === 0 ? (
            <p className="text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p._id} className="border rounded p-4 bg-card">
                  <h3 className="font-bold">{p.name}</h3>
                  {p.model && (
                    <p className="text-sm text-muted-foreground">
                      {p.model}
                    </p>
                  )}
                  {p.shortDesc && <p className="mt-2">{p.shortDesc}</p>}

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
        </section>
      </div>
    </Layout>
  );
}
