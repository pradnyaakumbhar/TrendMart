import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const addToCartHandler = () => {};
  return (
    <div className="home">
      <section>{/* <img src="../assets/cover.jpg" alt="grfbik" /> */}</section>
      <h1>
        Latest Products
        <Link to={'/search'} className="findMore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="rgqe"
          name="macbook"
          price={3758}
          stock={10}
          handler={addToCartHandler}
          photo="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </main>
    </div>
  );
};

export default Home;
