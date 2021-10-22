import { useRouter } from 'next/router';
import Product from '../../components/Product';

export default function SingleProductPage() {
  const router = useRouter();
  return <Product id={router.query.id} />;
}
