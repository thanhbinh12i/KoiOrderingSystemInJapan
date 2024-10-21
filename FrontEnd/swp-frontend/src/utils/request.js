const API_DOMAIN = `${process.env.REACT_APP_API_URL}`;

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const result = await response.json();
  return result;
};
export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },

    body: options !== null ? JSON.stringify(options) : undefined,
  });
  if (!response.ok) {
    console.log("Response Status:", response.status, await response.text());
    throw new Error(`Error: ${response.statusText}`);
  }

  const responseText = await response.text();
  if (!responseText) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      return JSON.parse(responseText);
    } catch (jsonError) {
      throw new Error("Invalid JSON response");
    }
  } else {
    return responseText;
  }
};

export const del = async (path, id) => {
  const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: "DELETE",
  });
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const result = await response.json();
    return result;
  } else {
    const text = await response.text();
    return { success: response.ok, message: text };
  }
};

export const patch = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = response.json();
  return result;
};
export const put = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};
