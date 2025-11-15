"use client";

import { useEffect, useState } from "react";
import { Box, Modal, TextField, Typography, Button } from "@mui/material";
import "./styles/home.scss";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDeleteIds, setLoadingDeleteIds] = useState(new Set());
  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
    image: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
  });

  // Load Products
  useEffect(() => {
    const abort = new AbortController();
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { signal: abort.signal });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
      abort.abort();
    };
  }, []);

  // Handle Save Product
  const handleAdd = async () => {
    if (loadingAdd) return;
    setLoadingAdd(true);
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", String(Number(newProduct.price || 0)));
    formData.append("category", newProduct.category);
    formData.append("stock", String(Number(newProduct.stock || 0)));
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      const resp = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (!resp.ok) {
        const e = await resp.json().catch(() => ({}));
        throw new Error(e.error || e.message || "Failed to save product");
      }
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: 0,
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
      setLoadingAdd(false);
      return; // skip refetch if failed
    }

    try {
      const res = await fetch("/api/products");
      if (res.ok) setProducts(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAdd(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (loadingDeleteIds.has(id)) return;
    const next = new Set(loadingDeleteIds);
    next.add(id);
    setLoadingDeleteIds(next);

    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } finally {
      const after = new Set(loadingDeleteIds);
      after.delete(id);
      setLoadingDeleteIds(after);
    }
  };

  // Open Edit Modal with selected product
  const openEdit = (p) => {
    setEditing(p);
    setEditProduct({
      name: p.name || "",
      description: p.description || "",
      price: String(p.price ?? ""),
      category: p.category || "",
      stock: String(p.stock ?? 0),
      image: p.image || "",
    });
    setEditOpen(true);
  };

  // Save Edit (PUT)
  const handleUpdate = async () => {
    if (!editing || loadingUpdate) return;
    setLoadingUpdate(true);

    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", String(Number(editProduct.price || 0)));
    formData.append("category", editProduct.category);
    formData.append("stock", String(Number(editProduct.stock || 0)));
    // Only append image if user selected a new File
    if (editProduct.image && typeof editProduct.image !== "string") {
      formData.append("image", editProduct.image);
    }

    const resp = await fetch(`/api/products/${editing.id}`, {
      method: "PUT",
      body: formData,
    });

    if (!resp.ok) {
      console.error("Failed to update product");
    } else {
      // refresh list
      try {
        const res = await fetch("/api/products");
        if (res.ok) setProducts(await res.json());
      } catch (e) {
        console.error(e);
      }
      setEditOpen(false);
      setEditing(null);
    }
    setLoadingUpdate(false);
  };

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="title">
          Shop Products <span>New</span>
        </h1>
        <div className="actions">
          <button className="btn-primary" onClick={() => setOpen(true)}>
            Add Product
          </button>
        </div>
      </div>

      <div className="home__grid">
        {products.map((p) => (
          <div className="col" key={p.id}>
            <div className="product-card">
              <img className="product-card__media" src={p?.image || "/placeholder.png"} alt={p?.name || "Product"} />
              <div className="product-card__body">
                <p className="name">{p.name}</p>
                <p className="desc">{p.description}</p>
                <div className="price-row">
                  <span className="price">{p.price} DT</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="delete" onClick={() => handleDelete(p.id)} disabled={loadingDeleteIds.has(p.id)}>
                      {loadingDeleteIds.has(p.id) ? "Deleting..." : "Delete"}
                    </button>
                    <button className="btn-outline" onClick={() => openEdit(p)} disabled={loadingDeleteIds.has(p.id)}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          className="modal-card"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 3,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" className="title" mb={2}>
            Add Product
          </Typography>
          <TextField
            className="field"
            label="Name"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <TextField
            className="field"
            label="Description"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <TextField
            className="field"
            label="Price"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const max = 5 * 1024 * 1024;
                if (!file.type.startsWith("image/") || file.size > max) return;
                setNewProduct({ ...newProduct, image: file });
              }}
            />
          </Button>
          {newProduct.image && typeof newProduct.image !== "string" && (
            <Typography fontSize={14}>{newProduct.image.name}</Typography>
          )}
          <TextField
            className="field"
            label="Category"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <TextField
            className="field"
            label="Stock"
            type="number"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAdd}
            disabled={loadingAdd}
          >
            {loadingAdd ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box
          className="modal-card"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 3,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" className="title" mb={2}>
            Edit Product
          </Typography>
          <TextField
            className="field"
            label="Name"
            fullWidth
            margin="dense"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <TextField
            className="field"
            label="Description"
            fullWidth
            margin="dense"
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          />
          <TextField
            className="field"
            label="Price"
            fullWidth
            margin="dense"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          />
          <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
            {typeof editProduct.image === "string" && editProduct.image ? "Change Image" : "Upload Image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const max = 5 * 1024 * 1024;
                if (!file.type.startsWith("image/") || file.size > max) return;
                setEditProduct({ ...editProduct, image: file });
              }}
            />
          </Button>
          {editProduct.image && typeof editProduct.image !== "string" && (
            <Typography fontSize={14}>{editProduct.image.name}</Typography>
          )}
          <TextField
            className="field"
            label="Category"
            fullWidth
            margin="dense"
            value={editProduct.category}
            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
          />
          <TextField
            className="field"
            label="Stock"
            type="number"
            fullWidth
            margin="dense"
            value={editProduct.stock}
            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleUpdate}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? "Updating..." : "Update"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
