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
  try {
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
    console.log(data);
    return data;
  } catch (err) {
    console.error('Login failed:', err);
    throw err;
  }
};
