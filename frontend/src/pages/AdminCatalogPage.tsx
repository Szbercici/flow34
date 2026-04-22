import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { toast } from "sonner";
import AdminPageHeader from "../components/AdminPageHeader.tsx";
import { API_BASE_URL } from "../config/api";
import styles from "./AdminWorkspace.module.css";
import pageStyles from "./AdminCatalogPage.module.css";
import {
  currencyFormatter,
  normalizeStoredImage,
  numberFormatter,
  resolveProductImage,
  toNumber,
  type Product,
} from "./adminData";

type ProductFormState = {
  name: string;
  price: string;
  description: string;
  category: string;
  img: string;
};

const emptyForm: ProductFormState = {
  name: "",
  price: "",
  description: "",
  category: "",
  img: "",
};

const AdminCatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const formPanelRef = useRef<HTMLElement | null>(null);

  const loadProducts = async (selectedId?: number | null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);

      if (!response.ok) {
        throw new Error("Products could not be loaded.");
      }

      const data = (await response.json()) as Product[];
      setProducts(data);

      if (selectedId) {
        const selectedProduct = data.find(
          (product) => product.id === selectedId,
        );
        if (selectedProduct) {
          handleSelectProduct(selectedProduct, { scrollToForm: false });
        }
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unexpected catalog loading error.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const categoryCount = useMemo(
    () =>
      new Set(products.map((product) => product.category).filter(Boolean)).size,
    [products],
  );

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const scrollToForm = () => {
    window.requestAnimationFrame(() => {
      formPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleSelectProduct = (
    product: Product,
    options?: { scrollToForm?: boolean },
  ) => {
    setSelectedProductId(product.id);
    setForm({
      name: product.name ?? "",
      price: String(toNumber(product.price)),
      description: product.description ?? "",
      category: product.category ?? "",
      img: normalizeStoredImage(product.img ?? ""),
    });

    if (options?.scrollToForm ?? true) {
      scrollToForm();
    }
  };

  const resetForm = () => {
    setSelectedProductId(null);
    setForm(emptyForm);
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    setUploading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/uploads/images`, {
        method: "POST",
        body: uploadFormData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      const result = await response.json();
      const uploadedUrl =
        result.url || result.imageUrl || result.path || result;
      setForm((currentForm) => ({
        ...currentForm,
        img: normalizeStoredImage(uploadedUrl),
      }));
      toast.success("Image uploaded.");
    } catch (uploadError) {
      toast.error(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const buildPayload = () => {
    const price = Number(form.price);

    if (!form.name.trim()) {
      throw new Error("Product name is required.");
    }

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error("Price must be a positive number.");
    }

    if (!form.category.trim()) {
      throw new Error("Category is required.");
    }

    return {
      name: form.name.trim(),
      price,
      description: form.description.trim(),
      category: form.category.trim(),
      img: normalizeStoredImage(form.img),
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = buildPayload();
      const response = await fetch(
        selectedProductId
          ? `${API_BASE_URL}/api/products/admin/${selectedProductId}`
          : `${API_BASE_URL}/api/products`,
        {
          method: selectedProductId ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(
          selectedProductId
            ? "Product update failed."
            : "Product creation failed.",
        );
      }

      const savedProduct = (await response.json()) as Product;
      toast.success(
        selectedProductId ? "Product updated." : "Product created.",
      );
      await loadProducts(savedProduct.id);
    } catch (submitError) {
      toast.error(
        submitError instanceof Error
          ? submitError.message
          : "Unexpected catalog save error.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProductId) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/admin/${selectedProductId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Product delete failed.");
      }

      toast.success("Product deleted.");
      resetForm();
      await loadProducts();
    } catch (deleteError) {
      toast.error(
        deleteError instanceof Error
          ? deleteError.message
          : "Unexpected catalog delete error.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <AdminPageHeader
          title="Catalog modify"
          description="Create, update and delete products from one admin workspace, with optional image upload and storefront-safe image path handling."
          meta={
            loading
              ? "Loading catalog..."
              : `${numberFormatter.format(products.length)} products loaded`
          }
        />

        {error && <div className={styles.errorBox}>{error}</div>}

        <section className={styles.miniStatGrid}>
          <article className={styles.miniStat}>
            <span className={styles.ctaLabel}>Catalog size</span>
            <strong>{numberFormatter.format(products.length)}</strong>
            <p className={styles.ctaText}>Products in current store data.</p>
          </article>

          <article className={styles.miniStat}>
            <span className={styles.ctaLabel}>Categories</span>
            <strong>{numberFormatter.format(categoryCount)}</strong>
            <p className={styles.ctaText}>
              Distinct categories across the catalog.
            </p>
          </article>

          <article className={styles.miniStat}>
            <span className={styles.ctaLabel}>Mode</span>
            <strong>{selectedProduct ? "Edit" : "Create"}</strong>
            <p className={styles.ctaText}>
              {selectedProduct
                ? `Editing ${selectedProduct.name}`
                : "Fill the form to add a new product."}
            </p>
          </article>
        </section>

        <section
          className={`${styles.productsLayout} ${pageStyles.productsLayout}`}
        >
          <article
            className={`${styles.productPanel} ${pageStyles.productPanel}`}
          >
            <div className={styles.tableHeader}>
              <strong>Product list</strong>
              <span>Click a row to edit or start a fresh entry.</span>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className={`${styles.clickableRow} ${selectedProductId === product.id ? styles.selectedRow : ""}`}
                        onClick={() => handleSelectProduct(product)}
                      >
                        <td>
                          <div className={styles.tablePrimary}>
                            {product.name}
                          </div>
                          <div className={styles.tableSecondary}>
                            #{product.id}
                          </div>
                        </td>
                        <td>{product.category || "Uncategorized"}</td>
                        <td>
                          {currencyFormatter.format(toNumber(product.price))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className={styles.emptyCell}>
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <article
            ref={formPanelRef}
            className={`${styles.formPanel} ${pageStyles.formPanel}`}
          >
            <div className={styles.toolbar}>
              <div>
                <p className={styles.eyebrow}>Editor</p>
                <h2>{selectedProduct ? "Update product" : "Create product"}</h2>
              </div>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={resetForm}
              >
                Reset form
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Name</span>
                  <input
                    className={styles.input}
                    name="name"
                    value={form.name}
                    onChange={handleFieldChange}
                    placeholder="Flow Bottle"
                  />
                </label>

                <label className={styles.field}>
                  <span>Category</span>
                  <input
                    className={styles.input}
                    name="category"
                    value={form.category}
                    onChange={handleFieldChange}
                    placeholder="Water Bottles"
                  />
                </label>

                <label className={styles.field}>
                  <span>Price</span>
                  <input
                    className={styles.input}
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleFieldChange}
                    placeholder="49.99"
                  />
                </label>

                <label className={styles.field}>
                  <span>Image path</span>
                  <input
                    className={styles.input}
                    name="img"
                    value={form.img}
                    onChange={handleFieldChange}
                    placeholder="images/your-file.webp"
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span>Description</span>
                <textarea
                  className={styles.textarea}
                  name="description"
                  value={form.description}
                  onChange={handleFieldChange}
                  placeholder="Short product description for the storefront."
                />
              </label>

              <div className={styles.uploadRow}>
                <label className={styles.field}>
                  <span>Upload image</span>
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                </label>
                <p className={styles.inputHint}>
                  Upload returns a full backend URL, but the saved product image
                  is normalized to a storefront-safe relative path.
                </p>
              </div>

              {form.img ? (
                <img
                  className={styles.imagePreview}
                  src={resolveProductImage(form.img)}
                  alt={form.name || "Product preview"}
                />
              ) : null}

              <div className={styles.helperRow}>
                <p className={styles.inputHint}>
                  Selected product:{" "}
                  {selectedProduct ? `#${selectedProduct.id}` : "new draft"}
                </p>
                <p className={styles.inputHint}>
                  Estimated storefront price:{" "}
                  {form.price
                    ? currencyFormatter.format(Number(form.price))
                    : "$0"}
                </p>
              </div>

              <div className={styles.buttonRow}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={submitting || uploading}
                >
                  {submitting
                    ? "Saving..."
                    : selectedProduct
                      ? "Save changes"
                      : "Create product"}
                </button>

                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => void loadProducts(selectedProductId)}
                  disabled={submitting || uploading}
                >
                  Refresh list
                </button>

                <button
                  type="button"
                  className={styles.dangerButton}
                  onClick={() => void handleDelete()}
                  disabled={!selectedProduct || submitting || uploading}
                >
                  Delete product
                </button>
              </div>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
};

export default AdminCatalogPage;
