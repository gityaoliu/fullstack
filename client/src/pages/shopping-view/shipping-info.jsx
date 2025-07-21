import { FaTruck } from "react-icons/fa";

export default function ShippingInfo() {
    return (
        <div className="p-8 max-w-3xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaTruck className="text-green-600" /> Shipping Information
            </h1>
            <p className="mb-4 text-gray-600">We offer fast and reliable shipping across the U.S.</p>
            <ul className="list-disc ml-5 space-y-2">
                <li><strong>Standard Shipping:</strong> 3–5 business days — $4.99</li>
                <li><strong>Express Shipping:</strong> 1–2 business days — $9.99</li>
                <li><strong>Free Shipping:</strong> Orders over $30</li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">All orders are processed within 1–2 business days.</p>
        </div>
    );
}
