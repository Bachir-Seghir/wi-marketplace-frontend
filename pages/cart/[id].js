import Cart from "../../components/Cart";
import { useRouter } from 'next/router'

export default function cartPage() {
const router = useRouter()
    return <Cart query={router.query} />;
}

