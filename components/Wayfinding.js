import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {gql, useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import Link from 'next/link'

export const PRODUCT_PATH = gql`
  query PRODUCT_PATH($id: ID!) {
    Product(where: { id: $id }) {
      department {
        id
        name
      }
      category {
        id
        name
      }
      subCategory {
        id
        name
      }
    }
  }
`;

function Wayfinding({id}) {
  const router = useRouter()

  const { data, error, loading } = useQuery(PRODUCT_PATH, {
    variables: {
      id,
    },
    
  });
 
  
  const department = data?.Product.department
  const category = data?.Product.category
  const subCategory = data?.Product.subCategory
  
  const handleClick = (slug) => {
    router.push({
      pathname: '/products/',
      query: {
        slug
      }
    })
  }
  const breadcrumbs = [
    <Link href={`/products/${department?.name}`} key={department?.id} passHref>
      <a>{department?.name}</a>
    </Link>,
    <Link href={`/products/${department?.name}/${category?.name}`} passHref>
      <a>{category?.name}</a>
    </Link>,
    subCategory && (
      <Link
        href={`/products/${department?.name}/${category?.name}/${subCategory.name}`}
        key={subCategory?.id}
        passHref>
        <a>{subCategory?.name}</a>
      </Link>
    ),
  ];

  return (
    <div className='wayfinding'>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default Wayfinding;
