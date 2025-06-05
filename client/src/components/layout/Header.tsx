import { CheckCircleIcon } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-items-center gap-3 p-4">
            <CheckCircleIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Smart Task Manager</h1>
        </header>
    );
}
