import React from "react";
import Link from "next/link";

export default function TopHeader() {

    const navLinks = [
        { name: "Demo",
        path: "/"
        },
        { name: "Webhook",
            path: "/web-hook?id=1"
        },
        { name: "Metrics",
            path: "/metric"
        },
        {
            name: "User Profile",
            path: "/profile",
        },
        {
            name: "Events",
            path: "/events?id=1",
        }
    ];

    return (
        <header>
            <nav>
                <div className="topnav">
                    <div className="title">Optimizely Fullstack Javascript Examples</div>
                    {navLinks.map((link, index) => {
                    return (
                        <Link key={index} href={link.path}>
                            <a>{link.name}</a>
                        </Link>
                    );
                    })}
                </div>
            </nav>
        </header>
    );
}