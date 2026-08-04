(function () {
  const API_URL = "https://zedevents-production.up.railway.app";

  async function api(path, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (options.body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem("ze_token");
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) {
      const err = new Error((data && (data.error || data.message)) || "Request failed");
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function firstPhoto(photos) {
    if (!photos) return "";
    if (Array.isArray(photos)) return photos[0] || "";
    if (typeof photos === "string") {
      try {
        const parsed = JSON.parse(photos);
        if (Array.isArray(parsed)) return parsed[0] || "";
      } catch {
        return photos;
      }
    }
    return "";
  }

  function formatPrice(price) {
    if (price == null || price === "") return "Ask for price";
    const n = Number(price);
    if (Number.isNaN(n)) return String(price);
    return `K${n.toLocaleString()}`;
  }

  window.ZE = { API_URL, api, firstPhoto, formatPrice };
})();
