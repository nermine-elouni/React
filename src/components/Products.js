import React from 'react'
import styled from 'styled-components';
import products from '../Product.json';
import Product from '../components/Product';
import { useApi } from '../hooks/useApi';
import { useEffect } from 'react';

export default function Products() {
  useEffect(()=>useApi,[]);
  let [p]=useApi();
  console.log(p)
  return (
    <ProductsWrapper>
        {products.map((product,index)=>(
          <div index={index}>
            <Product product={product}></Product>
          </div>
        ))}
    </ProductsWrapper>
  );
}
const ProductsWrapper = styled.div `
 text-align: center; 
 display: flex; 
`;
