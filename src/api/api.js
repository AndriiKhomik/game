const BASE_URL = "https://demo7919674.mockable.io/";

export const getRequest = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`Could not fetch ${BASE_URL}, received ${res.status}`);
  }
  return res.json();
};
