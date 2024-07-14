class Service {
  apiBase = "https://dummyjson.com/products";

  searchProducts = async (query: string, offset = 0) => {
    try {
      const res = await fetch(
        `${this.apiBase}/search?q=${query}&limit=10&skip=${offset}`
      );
      const json = await res.json();
      return json;
    } catch (e) {
      throw new Error("not workin");
    }
  };

  getSingleProduct = async (id: string) => {
    try {
      const res = await fetch(`${this.apiBase}/${id}`);
      const json = await res.json();
      return json;
    } catch (e) {
      throw new Error("not workin");
    }
  };
}

export default Service;
