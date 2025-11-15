"use client";

import { useEffect, useState } from "react";
import { Box, Modal, TextField, Typography, Button } from "@mui/material";
import "./styles/home.scss";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

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
      return; // skip refetch if failed
    }

    try {
      const res = await fetch("/api/products");
      if (res.ok) setProducts(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });

    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
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
                  <button className="delete" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
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
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
