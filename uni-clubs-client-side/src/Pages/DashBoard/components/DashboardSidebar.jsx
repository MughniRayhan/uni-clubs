import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { MdDashboard } from "react-icons/md";
import { ChevronDown, ChevronRight } from "lucide-react";
import { dashboardMenu } from "./DashboardMenu";

const DashboardSidebar = ({ role }) => {
    const location = useLocation();
    const menu = dashboardMenu[role] || [];
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (idx) => {
        setOpenMenu(openMenu === idx ? null : idx);
    };

    return (
        <ul className="menu bg-white min-h-full sm:w-80 w-[80%] p-4 space-y-2">

            <Link
                to="/"
                className="sm:text-4xl text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
                UniClubs
            </Link>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `flex items-center gap-2 w-full px-3 py-2 font-medium text-gray-800 mb-3 ${isActive ? "text-primary" : ""
                    }`
                }
            >
                <MdDashboard /> Dashboard
            </NavLink>

            {menu.map((item, idx) => {
                const Icon = item.icon;
                const isOpen = openMenu === idx;

                return (
                    <li key={idx} className="mb-2">
                        <button
                            onClick={() => toggleMenu(idx)}
                            className="w-full flex items-center justify-between py-2 px-3 font-medium text-gray-800 hover:text-primary"
                        >
                            <span className="flex items-center gap-2">
                                {Icon && <Icon className="w-5 h-5" />}
                                {item.title}
                            </span>
                            {item.children && (isOpen ? <ChevronDown /> : <ChevronRight />)}
                        </button>

                        {item.children && isOpen && (
                            <ul className="pl-6 mt-1 space-y-1">
                                {item.children.map((sub) => (
                                    <NavLink
                                        key={sub.path}
                                        to={sub.path}
                                        className={`block text-sm px-2 py-1 rounded ${location.pathname === sub.path
                                            ? "bg-primary text-white font-semibold"
                                            : "text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {sub.name}
                                    </NavLink>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default DashboardSidebar;