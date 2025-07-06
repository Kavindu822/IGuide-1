"use client";

// import React, { useEffect, useState, Suspense } from "react";
// import Input from "@/components/Input";
// import { useRouter, useSearchParams } from "next/navigation";
// import './page.css';

// const CLOUDINARY_CLOUD_NAME = "dwq5xfmci";
// const UPLOAD_PRESET = "iguide_past_papers";

// const initialState = {
//   name: "",
//   photo: null,
//   _id: null,
// };

// const AdForm = () => {
//   const [state, setState] = useState(initialState);
//   const [ads, setAds] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams(); // ❗ Must be wrapped in Suspense
//   const editIdFromQuery = searchParams.get("editId");

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   useEffect(() => {
//     if (ads.length > 0 && editIdFromQuery) {
//       const toEdit = ads.find((ad) => ad._id === editIdFromQuery);
//       if (toEdit) {
//         setState({
//           name: toEdit.name,
//           photo: toEdit.image?.url || null,
//           _id: toEdit._id,
//         });
//       }
//     }
//   }, [ads, editIdFromQuery]);

//   const fetchAds = async () => {
//     try {
//       const res = await fetch("/api/ads");
//       if (!res.ok) throw new Error("Failed to fetch ads");
//       const data = await res.json();
//       setAds(data);
//     } catch {
//       setError("Failed to fetch ads.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setError("");
//     if (type === "file") {
//       setState((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setState((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const uploadImage = async () => {
//     if (!state.photo || typeof state.photo === "string") return null;
//     const formData = new FormData();
//     formData.append("file", state.photo);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       if (!res.ok) throw new Error("Cloudinary upload failed");
//       const data = await res.json();
//       return { id: data.public_id, url: data.secure_url };
//     } catch (err) {
//       console.error("Upload error:", err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!state.name || !state.photo) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     if (state.photo.size > 5 * 1024 * 1024) {
//       setError("Max file size is 5MB.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const image = await uploadImage();
//       if (!image && !state._id) {
//         setError("Failed to upload image.");
//         setIsLoading(false);
//         return;
//       }

//       const adData = {
//         name: state.name,
//         image: image || (typeof state.photo === "string" ? { url: state.photo } : null),
//       };

//       const response = await fetch(
//         state._id ? `/api/ads/${state._id}` : "/api/ads",
//         {
//           method: state._id ? "PUT" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(adData),
//         }
//       );

//       if (response.ok) {
//         setSuccess(state._id ? "Ad updated." : "Ad created.");
//         setState(initialState);
//         setTimeout(() => {
//           router.push("/news");
//         }, 1000);
//       } else {
//         setError("Submission failed.");
//       }
//     } catch (err) {
//       setError("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="container max-w-4xl">
//       <h2>
//         {state._id ? "Update" : "Create"} <span className="special-word">Ad</span>
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           label="Name"
//           type="text"
//           name="name"
//           placeholder="Enter ad title..."
//           value={state.name}
//           onChange={handleChange}
//         />

//         <label htmlFor="photo">Upload Image</label>
//         <input type="file" name="photo" accept="image/*" onChange={handleChange} />

//         {state.photo && typeof state.photo !== "string" && (
//           <img
//             src={URL.createObjectURL(state.photo)}
//             alt="Preview"
//             style={{ maxWidth: "200px", marginTop: "10px" }}
//           />
//         )}
//         {typeof state.photo === "string" && (
//           <img
//             src={state.photo}
//             alt="Existing"
//             style={{ maxWidth: "200px", marginTop: "10px" }}
//           />
//         )}

//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <button type="submit" className="btn" disabled={isLoading}>
//           {isLoading ? "Submitting..." : state._id ? "Update Ad" : "Create Ad"}
//         </button>
//       </form>
//     </section>
//   );
// };

// // ✅ Wrap with Suspense in exported Client Page
// const AdManager = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <AdForm />
//     </Suspense>
//   );
// };

// export default AdManager;
// export const dynamic = "force-dynamic";

// "use client";

// import React, { useEffect, useState, Suspense } from "react";
// import Input from "@/components/Input";
// import { useRouter, useSearchParams } from "next/navigation";
// import "./page.css";

// const CLOUDINARY_CLOUD_NAME = "dwq5xfmci";
// const UPLOAD_PRESET = "iguide_past_papers";

// const initialState = {
//   name: "",
//   photo: null,
//   _id: null,
// };

// const AdForm = () => {
//   const [state, setState] = useState(initialState);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const editId = searchParams.get("editId");

//   useEffect(() => {
//     if (editId) {
//       fetch(`/api/ads/${editId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setState({
//             name: data.name,
//             photo: data.image?.url || null,
//             _id: data._id,
//           });
//         })
//         .catch(() => setError("Failed to load ad data"));
//     }
//   }, [editId]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setError("");
//     if (type === "file") {
//       setState((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setState((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const uploadImage = async () => {
//     if (!state.photo || typeof state.photo === "string") return null;
//     const formData = new FormData();
//     formData.append("file", state.photo);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//       { method: "POST", body: formData }
//     );

//     if (!res.ok) throw new Error("Image upload failed");

//     const data = await res.json();
//     return { public_id: data.public_id, url: data.secure_url };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!state.name || !state.photo) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     if (state.photo.size > 5 * 1024 * 1024) {
//       setError("Max file size is 5MB.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const image = await uploadImage();

//       const adData = {
//         name: state.name,
//         image:
//           image ||
//           (typeof state.photo === "string" ? { url: state.photo } : null),
//       };

//       const response = await fetch(
//         state._id ? `/api/ads/${state._id}` : "/api/ads",
//         {
//           method: state._id ? "PUT" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(adData),
//         }
//       );

//       if (!response.ok) throw new Error("Submission failed");

//       setSuccess(state._id ? "Ad updated." : "Ad created.");
//       setState(initialState);
//       setTimeout(() => {
//         router.push("/ads"); // or wherever you want to redirect
//       }, 1000);
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//       <h2>{state._id ? "Update" : "Create"} Ad</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             name="name"
//             type="text"
//             value={state.name}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label style={{ display: "block", marginTop: 10 }}>
//           Upload Image:
//           <input
//             type="file"
//             name="photo"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </label>

//         {state.photo && typeof state.photo !== "string" && (
//           <img
//             src={URL.createObjectURL(state.photo)}
//             alt="Preview"
//             style={{ maxWidth: "200px", marginTop: 10 }}
//           />
//         )}
//         {typeof state.photo === "string" && (
//           <img
//             src={state.photo}
//             alt="Existing"
//             style={{ maxWidth: "200px", marginTop: 10 }}
//           />
//         )}

//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {success && <p style={{ color: "green" }}>{success}</p>}

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Submitting..." : state._id ? "Update Ad" : "Create Ad"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AdForm;

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CLOUDINARY_CLOUD_NAME = "dwq5xfmci"; // Your Cloudinary cloud name
const UPLOAD_PRESET = "iguide_past_papers"; // Your Cloudinary upload preset

const initialState = {
  name: "",
  photo: null,
  _id: null,
};

const AdsPage = () => {
  const [state, setState] = useState(initialState);
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdFromQuery = searchParams.get("editId");

  // Fetch ads from backend
  const fetchAds = async () => {
    try {
      const res = await fetch("/api/ads");
      if (!res.ok) throw new Error("Failed to fetch ads");
      const data = await res.json();
      setAds(data);
    } catch {
      setError("Failed to fetch ads.");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // If editId query param exists, load ad data into form
  useEffect(() => {
    if (ads.length > 0 && editIdFromQuery) {
      const toEdit = ads.find((ad) => ad._id === editIdFromQuery);
      if (toEdit) {
        setState({
          name: toEdit.name,
          photo: toEdit.image?.url || null,
          _id: toEdit._id,
        });
      }
    }
  }, [ads, editIdFromQuery]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setError("");
    if (type === "file") {
      setState((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!state.photo || typeof state.photo === "string") return null;

    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Cloudinary upload failed");
      const data = await res.json();
      return { url: data.secure_url };
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!state.name) {
      setError("Please enter ad name.");
      return;
    }

    if (
      state.photo &&
      typeof state.photo !== "string" &&
      state.photo.size > 5 * 1024 * 1024
    ) {
      setError("Max file size is 5MB.");
      return;
    }

    setIsLoading(true);

    try {
      let image = null;
      if (typeof state.photo !== "string") {
        image = await uploadImage();
        if (!image) {
          setError("Failed to upload image.");
          setIsLoading(false);
          return;
        }
      }

      const adData = {
        name: state.name,
        image:
          image ||
          (typeof state.photo === "string" ? { url: state.photo } : null),
      };

      const response = await fetch(
        state._id ? `/api/ads/${state._id}` : "/api/ads",
        {
          method: state._id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adData),
        }
      );

      if (response.ok) {
        setSuccess(
          state._id ? "Ad updated successfully." : "Ad created successfully."
        );
        setState(initialState);
        fetchAds();
        router.push("/news");
      } else {
        setError("Submission failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <h1>{state._id ? "Update" : "Create"} Ad</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter ad title"
            value={state.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: 8,
              marginTop: 5,
              marginBottom: 15,
              fontSize: 16,
            }}
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            style={{ marginTop: 5, marginBottom: 15 }}
          />
        </label>

        {state.photo && typeof state.photo !== "string" && (
          <img
            src={URL.createObjectURL(state.photo)}
            alt="Preview"
            style={{ maxWidth: "100%", marginBottom: 15, borderRadius: 8 }}
          />
        )}
        {typeof state.photo === "string" && (
          <img
            src={state.photo}
            alt="Existing"
            style={{ maxWidth: "100%", marginBottom: 15, borderRadius: 8 }}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}
        >
          {isLoading ? "Submitting..." : state._id ? "Update Ad" : "Create Ad"}
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Existing Ads</h2>
      {ads.length === 0 && <p>No ads found.</p>}
      {ads.map((ad) => (
        <div
          key={ad._id}
          style={{
            marginBottom: 20,
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <h3>{ad.name}</h3>
          {ad.image?.url && (
            <img
              src={ad.image.url}
              alt={ad.name}
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AdsPage;
