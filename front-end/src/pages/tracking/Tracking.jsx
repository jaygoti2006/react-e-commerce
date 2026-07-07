import {Link} from "react-router";

export default function Tracking(){
    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="tracking-favicon.png"></link>
            <div className="max-w-4xl px-4 mx-auto py-8 flex flex-col">
                <Link to='/orders' className="underline text-green-700 hover:text-green-700/70 self-start">View all orders</Link>
                <div className="flex flex-col gap-3 py-6 mb-7">
                    <h2 className="font-bold text-2xl">Arriving on Wednesday, July 8</h2>
                    <div className="flex flex-col leading-none gap-1.5 mb-4">
                        <h4>Black and Gray Athletic Cotton Socks - 6 Pairs</h4>
                        <span>Quantity: 1</span>
                    </div>
                    <img className="w-37.5" src="https://supersimple.dev/projects/ecommerce/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" alt="" />
                </div>
                <div className="flex flex-col gap-3.5">
                    <div className="flex justify-between">
                        <span className="font-medium text-xl">Preparing</span>
                        <span className="font-medium text-xl">Shipped</span>
                        <span className="font-medium text-xl">Delivered</span>
                    </div>
                    <div className="border border-neutral-300 rounded-full h-6 relative">
                        <div className="absolute inset-0 bg-[#198754] rounded-full w-10">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};