import React from 'react'
import { useParams } from 'react-router';

const SuitesPage = () => {

    const {suiteId} = useParams();

    return (
        <div>SutesPage</div>
    )
}

export default SuitesPage;