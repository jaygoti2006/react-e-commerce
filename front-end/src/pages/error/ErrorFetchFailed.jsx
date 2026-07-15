export default function ErrorFetchFailed() {
    return (
        <>
            <h2 className="pt-15 pb-4 text-4xl text-center font-bold text-red-600">
                Could not get data from server!
            </h2>
            <h4 className="pb-6 text-2xl text-center font-medium">
                Refresh the page to try again.
            </h4>
            <button className="btn-secondary p-2 text-xl block mx-auto" onClick={() => location.reload()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#111111" d="M22.4 11.65a1.09 1.09 0 0 0 1.09 1.09h10.94V1.81a1.09 1.09 0 1 0-2.19 0v7.14a16.41 16.41 0 1 0 1.47 15.86a1.12 1.12 0 0 0-2.05-.9a14.18 14.18 0 1 1-1.05-13.36H23.5a1.09 1.09 0 0 0-1.1 1.1Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
            </button>
        </>
    );
}