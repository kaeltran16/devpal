export const postData = async (url: string, data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return await res.json();
};
