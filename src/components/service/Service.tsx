class Service {
  apiBase = "https://dummyjson.com/products";

  searchProducts = async (query: string) => {
    try {
      const res = await fetch(`${this.apiBase}/search?q=${query}`);
      const json = await res.json();
      return json.products;
    } catch (e) {
      throw new Error("not workin");
    }
  };
}

export default Service;
