import Header from "../components/Header"
import {Link} from 'react-router'

export default function ErrorNotFound(){
    return (
        <>
            <Header/>
            <div className="flex flex-col items-center">
                <h1 className="text-8xl font-bold text-neutral-600 pt-15 pb-5 text-center">404</h1>
                <p className="text-4xl text-neutral-600 font-medium text-center">Page Not Found!</p>
                <Link to='/' className="btn-primary text-xl px-6 py-4 mt-10">Go back Home</Link>
            </div>
        </>
    );
}