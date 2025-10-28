const getproperties = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ships/1`,
      {
      next: { revalidate: 43200 },
    }
    );    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();    console.log("Properties Data:", data);
    return data;
  } catch (error) {
    return [];
  }
};

export default getproperties;