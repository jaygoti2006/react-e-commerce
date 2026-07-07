import { Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState, useContext } from 'react';
import { useSearchParams } from 'react-router';
import CartContext from '../contexts/CartContext';

export default function Header() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    const [params] = useSearchParams();
    const search = (params.get("search")) ? params.get("search") : "";

    const {itemsCount}=useContext(CartContext);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchInput(search);
    }, [search, setSearchInput]);

    function handleChange() {
        setSearchInput(searchBarRef.current.value);
    }

    function handleSearch() {
        if (searchInput != "") {
            if (new URLSearchParams(location.search).get("search") != searchInput) {
                navigate({
                    pathname: '',
                    search: '?' + new URLSearchParams({ "search": searchInput }).toString()
                });
            }
        } else {
            navigate({
                pathname: '/'
            });
        }
    }

    return (
        <div className="fixed z-10 top-0 left-0 right-0 py-2.5 px-2 flex xs:gap-5 md:gap-20 lg:gap-40 items-center justify-between bg-green-900">
            <Link to="/" className="text-white py-1 px-1 xs:px-4 flex items-center gap-2">
                <span>
                    <svg className="block fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M484.5 168.1C484.3 167 483.8 166 483 165.3C482.2 164.6 481.2 164.1 480.1 164.1C478.1 164.1 442.9 163.3 442.9 163.3C442.9 163.3 421.3 142.5 413.3 134.5L413.3 567.2L539 536C539 536 485 170.5 484.6 168.1zM384.9 134.5C383 128.4 380.6 122.6 377.7 116.9C367.3 96.9 351.7 86 333.3 86C332 86 330.6 86.1 329.3 86.4C328.9 85.6 328.1 85.2 327.7 84.4C319.7 75.6 309.3 71.6 296.9 72C272.9 72.8 248.9 90 229.7 120.8C216.1 142.4 205.7 169.6 202.9 190.9C175.3 199.3 156.1 205.3 155.7 205.7C141.7 210.1 141.3 210.5 139.7 223.7C138.5 233.7 101.7 515.5 101.7 515.5L404.3 568L404.3 129.7C402.8 129.8 401.4 129.9 399.9 130.1C399.9 130.1 394.3 131.7 385.1 134.5zM329.6 151.7C313.6 156.5 296 162.1 278.8 167.3C283.6 148.5 293.2 129.7 304.4 117.3C308.8 112.9 314.8 107.7 321.6 104.5C328.4 118.9 330 138.5 329.6 151.7zM296.8 88.4C301.8 88.2 306.8 89.5 311.2 92C304.8 95.2 298.4 100.4 292.4 106.4C277.2 122.8 265.6 148.4 260.8 172.9C246.4 177.3 232 181.7 218.8 185.7C227.6 147.3 260 89.3 296.8 88.5zM250.4 308.6C252 334.2 319.6 339.8 323.6 400.3C326.4 447.9 298.4 480.4 258 482.8C209.2 486 182.4 457.2 182.4 457.2L192.8 413.2C192.8 413.2 219.6 433.6 241.2 432C255.2 431.2 260.4 419.6 260 411.6C258 378 202.8 380 199.2 324.7C196 278.3 226.4 231.4 293.7 227C319.7 225.4 332.9 231.8 332.9 231.8L317.7 289.4C317.7 289.4 300.5 281.4 280.1 283C250.5 285 250.1 303.8 250.5 308.6zM345.6 146.9C345.6 134.9 344 117.7 338.4 103.3C356.8 106.9 365.6 127.3 369.6 139.7C362.4 141.7 354.4 144.1 345.6 146.9z" /></svg>
                </span>
                <span className="hidden sm:block font-semibold leading-none text-[20px]">ShopNow</span>
            </Link>

            <div className="flex grow min-w-0">
                <input
                    className="min-w-0 border grow border-green-600 focus:border-green-700 rounded-lg rounded-r-none px-3 py-2 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
                    type="text" placeholder="Search products..." data-name="search" value={searchInput} onChange={handleChange} ref={searchBarRef} />
                <button onClick={handleSearch} className=" relative focus-visible:z-[-1] flex items-center justify-center text-green-700 bg-green-200 border border-l-0 border-green-600 hover:border-green-700 hover:bg-green-200/85 active:border-green-600 active:bg-green-200 rounded-lg rounded-l-none px-4 py-2 transition-all duration-300 cursor-pointer">
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24">
                        <path fillRule="evenodd"
                            d="M14.385 15.446a6.751 6.751 0 1 1 1.06-1.06l5.156 5.155a.75.75 0 1 1-1.06 1.06l-5.156-5.155ZM6.46 13.884a5.25 5.25 0 1 1 7.43-.005l-.005.005l-.005.004a5.25 5.25 0 0 1-7.42-.004Z"
                            clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="text-white font-semibold flex xs:gap-2">
                <Link to="/orders" className="flex items-center px-1 xs:px-3 py-2">Orders</Link>
                <Link to="/checkout" className="flex items-center px-1 xs:px-3">
                    <span className="relative">
                        <svg className="block fill-current" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fillRule="evenodd" d="M9.5 19.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 1a2 2 0 1 0 0-4a2 2 0 0 0 0 4m7-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 1a2 2 0 1 0 0-4a2 2 0 0 0 0 4M3 4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .476.348L9.37 14.5H17a.5.5 0 0 1 0 1H9.004a.5.5 0 0 1-.476-.348L5.135 4.5H3.5A.5.5 0 0 1 3 4" clipRule="evenodd" /><path d="M8.5 13L6 6h13.337a.5.5 0 0 1 .48.637l-1.713 6a.5.5 0 0 1-.481.363z" /></svg>
                        <span className="absolute top-[50%] left-[50%] translate-x-[-40%] translate-y-[-70%] text-green-700 text-[12px]">{itemsCount}</span>
                    </span>
                    <span className="py-2">Cart</span>
                </Link>
            </div>
        </div>
    );
};