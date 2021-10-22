import Products from '../../components/Products';
import { useRouter } from 'next/router';

export default function productsPage() {
  const router = useRouter();

  return <Products params={router.query} />;
}
