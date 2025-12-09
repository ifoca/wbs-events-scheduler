// functions which can be re-used across the project,
// such as add / remove from the local storage

export const getItemFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(item)) || [];
};

export const addToLocalStorage = (existingItem, newData) => {
  const updatedLocalStorage = [...getItemFromLocalStorage(existingItem), newData];
  localStorage.setItem(existingItem, JSON.stringify(updatedLocalStorage));
};

export const removeItemFromLocalStorage = (item) => {
  localStorage.removeItem(item);
};

export const login = async (email, pass) => {
  const res = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  localStorage.setItem('access_token', data.token);
  return data;
};

export const register = async (email, pass) => {
  const res = await fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });
  if (res.status === 409) {
    throw new Error(`HTTP error, status: ${res.status}. User already exists`);
  } else if (res.status === 400) {
    throw new Error(`HTTP error, status: ${res.status}. Password must have at least 8 characters`);
  } else if (!res.ok) {
    throw new Error(`HTTP error, status: ${res.status}. Registration failed. Contact support.`);
  }
  const data = await res.json();
  console.log(data);
};

export const compareStrings = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return false;
  }
};
