import React from 'react'
import PageTitle from '../components/PageTitle'
import ProductSidebar from '../components/ProductSidebar';
import Counter from '../components/Counter';


const Home = () => {
  return (
    <div>

    <PageTitle title="Home" />

    <div>

    <div className='container flex-space-around'>
        <div className='sidebar-container'>
          <ProductSidebar/>
        </div>
        <div className='main-container'>
          <h2>List of All Products</h2>
          <Counter/>
        </div>
    </div>
    </div>
    
    </div>
  );
}

export default Home