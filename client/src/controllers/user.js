const base = "http://localhost:5000";

export const register_user = async (obj) => {
  const res = await fetch(`${base}/api/user/signup`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};
export const auth_user = async (obj) => {
  const res = await fetch(`${base}/api/user/auth`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const login_user = async (obj) => {
  const res = await fetch(`${base}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const get_user_det_by_id = async (obj) => {
  const res = await fetch(`${base}/api/user/userdets`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const get_forms = async (obj) => {
  const res = await fetch(`${base}/api/user/forms_by_user`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const delete_form = async (obj) => {
  const res = await fetch(`${base}/api/user/form/delete`, {
    method: "DELETE",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const submit_form = async (obj) => {
  const res = await fetch(`${base}/api/user/submit_form`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const edit_form = async (obj) => {
  const res = await fetch(`${base}/api/user/form/edit`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const get_forms_by_formid = async (obj) => {
  const res = await fetch(`${base}/api/user/forms_by_id`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};
