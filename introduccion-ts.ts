// 1) Crear una interfaz Product con propiedades como nombre, precio, stock y una función para calcular el valor total.

type TotalPriceMethod = () => number;

export interface Product {
  name: string;
  price: number;
  stock?: number;

  totalValue: TotalPriceMethod ;
}

const exampleProduct: Product = {
  name: "Laptop",
  price: 1200,
  stock: 5,

  totalValue: function () {
    if (this.stock) return this.price * this.stock;
    else {
      return this.price;
    }
  },
};

console.log(`El valor total del producto es: $${exampleProduct.totalValue()}`);


// 2) Implementar un sistema de tipos para un carrito de compras con funciones para añadir/eliminar productos
// y calcular el total.

export interface Product {
  count?: number;
}

interface AddProduct {
  (product: Product, count: number): string;
}

// Se recomienda usar un ID en vez de nombre.
interface DeleteProduct {
  (name: string): string;
}

interface Carrier {
  products: Product[];

  addProduct: AddProduct;
  deteleProduct: DeleteProduct;
  totalValue: TotalPriceMethod;
}

// Ejemplo de implementación de Carrier y uso de Product

const shoppingCart: Carrier = {
    products: [],

    addProduct: function (product, count) {
        const existing = this.products.find(p => p.name === product.name);
        if (existing) {
            existing.count = (existing.count || 0) + count;
        } else {
            this.products.push({ ...product, count });
        }
        return `${count} ${product.name} incorporado al carrito.`;
    },

    deteleProduct: function (name) {
        const index = this.products.findIndex(p => p.name === name);
        if (index !== -1) {
            this.products.splice(index, 1);
            return `${name} eliminado del carrito.`;
        }
        return `${name} no encontrado en el carrito.`;
    },

    totalValue: function () {
        return this.products.reduce((sum, p) => sum + (p.price || 0) * (p.count || 0), 0);
    }
};

// Ejemplo de uso
const prod1: Product = { name: "Mouse", price: 25, stock: 10, totalValue: function() { return (this.price || 0) * (this.count || 0); } };
const prod2: Product = { name: "Keyboard", price: 50, stock: 5, totalValue: function pepe() { return (this.price || 0) * (this.count || 0); } };

console.log(shoppingCart.addProduct(prod1, 2));
console.log(shoppingCart.addProduct(prod2, 1));
console.log(shoppingCart.deteleProduct("Mouse"));
console.log(shoppingCart.products);
console.log(`Total del carrito: $${shoppingCart.totalValue()}`);

// Convertir una función JavaScript existente a TypeScript añadiendo tipos adecuados.

// Función JavaScript sin tipos, para convertir a TypeScript

const applyDiscount: DiscountFunction = (product, discount) =>  {
    if (!product.price) return product;
    return {
        ...product,
        price: product.price - discount
    };
}

interface DiscountFunction {
    (product: Product, discount: number): Product
}
