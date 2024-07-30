import CenteredPage from './CenteredPage';
import NotFoundPage from './NotFoundPage';
import { useMyContext } from './useMyContext';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
    const { Products } = useMyContext();
    const { productId } = useParams();
    const item = Products.find(product => product.id === productId);
    if (item) {
        return (
            <div>{item?.name}</div>
        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
