import { useRouter } from 'next/router'
import React from 'react'

const CommentPage = () => {
    const router = useRouter()
    const id = router.query.id;
    return (
        <div>CommentPage: {id}</div>
    )
}

export default CommentPage;