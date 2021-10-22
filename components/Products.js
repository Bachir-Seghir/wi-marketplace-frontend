import React, { useState, useEffect } from 'react';
import Productcard from './Productcard';
import PaginationComp from './PaginationComp';
import Filters from './Filters';
import {perPage} from '../config'

import { 
  ALL_PRODUCTS, 
  PRODUCTS_BY_CATEGORY, 
  PRODUCTS_BY_DEPARTMENT, 
  PRODUCTS_BY_SUBCATEGORY, 
  PRODUCTS_SEARCH } from '../lib/productsQuery'
import { useQuery } from '@apollo/client';

function Products({ params }) {
  const [query, setQuery] = useState({
    queryName: ALL_PRODUCTS,
    variables: {},
  });
 const [page, setPage] = useState(1);
  
 useEffect(() => {
   if(params.sub)   getQuery('sub',params.sub)
   if(!params.sub)  getQuery('cat', params.cat)
   if(!params.sub && !params.cat)  getQuery('dpt', params.dpt)  
    if(!params.sub && !params.cat && !params.dpt)    getQuery('')
      }, [params]) 
      
// This function takes the query paramters and provides a Query 
  const getQuery = (param,value) => {
    const queriesName = {
      cat :PRODUCTS_BY_CATEGORY, 
      dpt: PRODUCTS_BY_DEPARTMENT, 
      sub : PRODUCTS_BY_SUBCATEGORY,
      default : ALL_PRODUCTS , 
    }
    return param in queriesName? setQuery({
    queryName: queriesName[param],
    variables: {[param] : value},
  }) : setQuery(
    {queryName: queriesName.default,
    variables: {},
  })
  }
  
    
const { data, loading, error } = useQuery(query.queryName, {
  variables: {
    ...query.variables,
    skip: page * perPage - perPage,
    first: perPage,
  },
});
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { count } = data?._allProductsMeta;
  const pageCount = Math.ceil(count / perPage)

  return (
    <div className='products'>
      <Filters />
      <div className='products__container'>
        <div className='products__container__header'>
          <h2>
            {Object.keys(params).length === 0
              ? 'All Products'
              : data?.allProducts[0]?.department?.name}
          </h2>
          {/* title of the this list of products */}
          <p>{data?.allProducts[0]?.department?.description}</p>
        </div>
        <div className='products__search-result'>
          <p>
            over {count} results for{' '}
            <strong>
              {Object.keys(params).length === 0
                ? 'All Products'
                : data?.allProducts[0]?.department?.name}
            </strong>
          </p>
        </div>
        <PaginationComp pageCount={pageCount} page={page} setPage={setPage} />
        <div className='products__layout'>
          {data?.allProducts?.map((product) => (
            <Productcard product={product} key={product.id} />
          ))}
          {/* <Productcard product={product} imgsrc={product.cardImgSrc} /> */}
        </div>
        <PaginationComp pageCount={pageCount} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
/* export async function getServerSideProps(context) {
  const res = await fetch(`https://...`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
} */
export default Products;
