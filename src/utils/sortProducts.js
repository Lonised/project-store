const sortProducts = (products, sortOption) => {
    switch (sortOption) {
        case "recommended":
            return products;
        case "newest":
            return products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        case "priceLowToHigh":
            return products.sort((a, b) => a.price - b.price);
        case "priceHighToLow":
            return products.sort((a, b) => b.price - a.price);
        case "nameAZ":
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case "nameZA":
            return products.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return products;
    }
};

export default sortProducts;