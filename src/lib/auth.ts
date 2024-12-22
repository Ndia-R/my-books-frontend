import { BOOKS_API_ENDPOINT } from '@/constants/constants';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BOOKS_API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('login error:' + err);
  }
};

export const getUser = async (token: string) => {
  console.log(token);
  try {
    const response = await fetch(`${BOOKS_API_ENDPOINT}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('error');
    }
    const data = await response.json();
    console.log(data);

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
    };
    return user;
  } catch (err) {
    console.log('error:' + err);
  }
};
