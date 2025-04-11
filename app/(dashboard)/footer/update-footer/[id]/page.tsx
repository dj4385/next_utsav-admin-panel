'use client'

import { useParams } from "next/navigation";
import UpdateFooterForm from "./_components/FooterUpdateForm";
const UpdateFooterPage = () => {
    
    const params = useParams() ;
    const id = params.id as string;

    return (
        <UpdateFooterForm id={id} />
    )
}

export default UpdateFooterPage;
