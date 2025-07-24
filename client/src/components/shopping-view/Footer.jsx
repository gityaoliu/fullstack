import {
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    FaPinterestP,
    FaInstagram,
} from "react-icons/fa6";
import { useState } from "react";

export default function Footer() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thanks for subscribing, ${email}!`);
        setEmail("");
        setShowModal(false);
    };

    return (
        <footer className="bg-gray-50 text-gray-800 text-sm border-t border-gray-200 relative">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="md:flex md:gap-12 md:items-start">
                    {/* 左侧 */}
                    <div className="md:w-1/3 mb-10 md:mb-0">
                        <button
                            onClick={() => setShowModal(true)}
                            className="border border-gray-800 px-6 py-2 font-semibold hover:bg-gray-100 tracking-wide"
                        >
                            SIGN UP FOR EMAILS & TEXTS
                        </button>
                        <div className="flex gap-5 text-2xl mt-6 text-gray-800">
                            <FaFacebookF />
                            <FaXTwitter />
                            <FaYoutube />
                            <FaPinterestP />
                            <FaInstagram />
                        </div>
                    </div>

                    {/* 右侧三栏 */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
                        <div>
                            <h4 className="font-semibold mb-2 tracking-wide">HELP</h4>
                            <ul className="space-y-1">
                                

                                <li><a href="/shop/credit-card" className="hover:underline">About Nailcode Credit Card</a></li>
                                <li><a href="/shop/find-store" className="hover:underline">Find a Store</a></li>
                                <li><a href="/shop/careers" className="hover:underline">Careers</a></li>
                            </ul>

                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 tracking-wide">ORDERS & RETURNS</h4>
                            <ul className="space-y-1">
                                <li><a href="/shop/account" className="hover:underline">Order Status</a></li>
                                <li><a href="/shop/shipping-info" className="hover:underline">Shipping Information</a></li>
                                <li><a href="/shop/return-policy" className="hover:underline">Return Policy</a></li>
                            </ul>

                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 tracking-wide">SERVICES</h4>
                            <ul className="space-y-1">
                                <li>Store Offer & Events</li>
                                <li>NailCode Creator Program</li>
                                <li>Discover</li>
                                <li>Get the iOS App</li>
                                <li>Get the Android App</li>
                                <li>Pay My Bill</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="border-t border-gray-300 pt-4 text-center text-xs text-gray-500 mt-8">
                    <p>© 2025 NailCode. All Rights Reserved.</p>
                    <p className="mt-1">
                        Terms of Use | Privacy & Security | Do Not Sell or Share My Info | Site Map
                    </p>
                </div>
            </div>

            {/* ✅ 模态框 */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-500 text-xl"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Subscribe to Updates</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </footer>
    );
}
