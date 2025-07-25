import {
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    FaPinterestP,
    FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-gray-800 text-sm border-t border-gray-200 relative">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="md:flex md:gap-12 md:items-start">
                    {/* 左侧 */}
                    <div className="md:w-1/3 mb-10 md:mb-0">
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
                                <li>About Nailcode Credit Card</li>
                                <li>Find a Store</li>
                                <li>Careers</li>
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
        </footer>
    );
}
