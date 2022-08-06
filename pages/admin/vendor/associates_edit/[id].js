import { useRouter } from 'next/router';
import VendorAssociates from '../../../../components/VendorAssociates';

export default function EditAssociates(){

    const router = useRouter()

    return (
        <>
            <VendorAssociates id={router.query.id}></VendorAssociates>
        </>
    )

}