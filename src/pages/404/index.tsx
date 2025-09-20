import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="orange-6000 flex h-screen flex-col items-center justify-center gap-5 text-2xl text-orange-600">
            <p>404 Oops, Page Not Found</p>
            <Link to="/">
                <button className="rounded-3xl bg-orange-600 px-9 py-4 text-slate-100">
                    Go Back to Main Page
                </button>
            </Link>
        </div>
    )
}

export default NotFoundPage
