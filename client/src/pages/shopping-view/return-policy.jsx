import { FaUndo } from "react-icons/fa";

export default function ReturnPolicy() {
    return (
        <div className="p-8 max-w-3xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaUndo className="text-red-600" /> Return Policy
            </h1>
            <p className="mb-4 text-gray-600">We want you to love your nails — here’s how we handle returns:</p>
            <ul className="list-disc ml-5 space-y-2">
                <li>Returns accepted within 30 days of delivery</li>
                <li>Items must be unused and in original packaging</li>
                <li>Refunds processed within 5–7 business days</li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
                Email us at <a href="mailto:support@nailcode.com" className="underline text-blue-600">support@nailcode.com</a> to initiate a return.
            </p>
        </div>
    );
}