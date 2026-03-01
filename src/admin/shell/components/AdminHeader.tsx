import { Bell, Settings } from "lucide-react";
import { SelectCompany } from "./SelectCompany";

export const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 h-18">
      <div className="flex items-center justify-end">
        {/* Actions */}
        <SelectCompany />
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button> */}

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};
