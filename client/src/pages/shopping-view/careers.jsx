import { FaBriefcase } from "react-icons/fa";
export default function Careers() {
    return (
        <div className="p-8 max-w-3xl mx-auto text-gray-800">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaBriefcase className="text-blue-600" /> Careers at Nailcode
            </h1>
            <p className="mb-4 text-gray-600">
                We're always looking for talented individuals to join our growing team.
            </p>
            <div className="space-y-4">
                <div className="border p-4 rounded-md bg-blue-50">
                    <h2 className="font-semibold">Frontend Developer</h2>
                    <p className="text-sm text-gray-600">React + Tailwind | Remote | Full-time</p>
                </div>
                <div className="border p-4 rounded-md bg-blue-50">
                    <h2 className="font-semibold">Customer Support Specialist</h2>
                    <p className="text-sm text-gray-600">Email & Live Chat | Remote | Part-time</p>
                </div>
                <div className="border p-4 rounded-md bg-blue-50">
                    <h2 className="font-semibold">Marketing Intern</h2>
                    <p className="text-sm text-gray-600">Social Media | SF Bay Area | Part-time</p>
                </div>
            </div>
            <p className="mt-6">Send your resume to <a href="mailto:careers@nailcode.com" className="text-blue-600 underline">careers@nailcode.com</a></p>
        </div>
    );
}
