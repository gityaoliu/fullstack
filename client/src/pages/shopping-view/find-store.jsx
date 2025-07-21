import { FaMapMarkerAlt } from "react-icons/fa";

export default function FindStore() {
    return (
        <div className="p-8 max-w-3xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" /> Find a Store
            </h1>
            <p className="mb-4 text-gray-600">Visit us in person at one of our locations:</p>
            <ul className="space-y-4">
                <li className="border-b pb-2">
                    <strong>San Francisco, CA</strong>
                    <p className="text-sm text-gray-500">123 Market St, SF 94103</p>
                </li>
                <li className="border-b pb-2">
                    <strong>Los Angeles, CA</strong>
                    <p className="text-sm text-gray-500">456 Sunset Blvd, LA 90028</p>
                </li>
                <li>
                    <strong>New York, NY</strong>
                    <p className="text-sm text-gray-500">789 Madison Ave, NY 10001</p>
                </li>
            </ul>
        </div>
    );
}