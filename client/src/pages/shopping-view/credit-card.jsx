import { FaCreditCard, FaShippingFast, FaGift } from "react-icons/fa";

export default function CreditCard() {
    return (
        <div className="p-8 max-w-3xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaCreditCard className="text-pink-600" /> Nailcode Credit Card
            </h1>
            <p className="mb-4 text-gray-600">
                Unlock exclusive perks and rewards with our Nailcode Credit Card:
            </p>
            <div className="grid gap-4">
                <div className="flex items-start gap-3">
                    <FaGift className="text-pink-500 mt-1" />
                    <p>Earn <strong>5% cashback</strong> on all Nailcode purchases</p>
                </div>
                <div className="flex items-start gap-3">
                    <FaShippingFast className="text-pink-500 mt-1" />
                    <p><strong>Free shipping</strong> on orders over $25</p>
                </div>
                <div className="flex items-start gap-3">
                    <FaGift className="text-pink-500 mt-1" />
                    <p>Exclusive early access to <strong>new styles</strong> and promotions</p>
                </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
                Apply Now
            </button>
        </div>
    );
}