export const handleMinChange = (event, maxValue, setMinValue) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
};

export const handleMaxChange = (event, minValue, setMaxValue) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
};

export const filterProductsByPrice = (products, minValue, maxValue) => {
    return products.filter(product => product.price >= minValue && product.price <= maxValue);
};

