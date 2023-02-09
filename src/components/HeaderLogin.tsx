import { Link, useMatch } from "react-router-dom";
import logo from "../assets/logo.jfif";
export default function HeaderLogin() {
    const registerMatch = useMatch("/register");
    return (
        <header className="py-5">
            <div className="max-w-7x1 mx-auto px-4">
                <nav className="flex item-end">
                    <Link to="/">
                        <img src={logo} loading="eager" alt="logo" className="h-8 lg:h-11" />
                    </Link>
                    <div className="ml-5 text-xl lg:text-2xl">
                        {registerMatch ? "Đăng ký" : "Đăng nhập"}
                        {/* Đăng ký */}
                    </div>
                </nav>
            </div>
        </header>
    );
}
