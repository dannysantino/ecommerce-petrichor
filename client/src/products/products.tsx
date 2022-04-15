import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './products.css';

interface Product {
	id: string;
	name: string;
}

interface Category {
	id: string;
	name: string;
	description: string;
}

const Products: FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((json) => {
				setProducts(json.products);
				setCategories(json.categories);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<main className="products">
			<div className="filters"></div>
			<div className="products-list">
				{products.map((product) => {
					return (
						<Link to={product.id} className="product" id={product.id}>
							<div
								className="product-img"
								style={{
									backgroundImage: `url('/assets/${product.id}.jpeg')`,
								}}></div>
							<h2>{product.name}</h2>
						</Link>
					);
				})}
			</div>
		</main>
	);
};

export default Products;
