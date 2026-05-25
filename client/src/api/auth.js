const request = async (path, options = {}) => {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const signup = (payload) => {
  return request("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const signin = (payload) => {
  return request("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const logout = () => {
  return request("/api/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUser = (token) => {
  return request("/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
