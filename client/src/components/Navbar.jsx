import { useState, useEffect } from "react";
import { IoLogOut } from "react-icons/io5";
import { MdAddBox, MdHome } from "react-icons/md";
import { SiTask } from "react-icons/si";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle, logout } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const handleSignIn = async () => {
        await signInWithGoogle();
    };

    const handleSignOut = async () => {
        await logout();
        setUser(null);
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">
                    <span className="text-red-600"><SiTask /></span> taskU
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal gap-5 px-1">
                    <Link to="/" className="flex gap-1 items-center font-semibold">
                        <span className="text-red-600"><MdHome /></span> Home
                    </Link>
                    <Link to="/add-task" className="flex gap-1 items-center font-semibold">
                        <span className="text-red-600"><MdAddBox /></span> Add
                    </Link>
                    {user ? (
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">{user.displayName}</span>
                            <button onClick={handleSignOut} className="flex gap-1 items-center font-semibold text-red-600">
                                <IoLogOut />
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleSignIn} className="flex gap-1 items-center font-semibold text-blue-600">
                            Sign In with Google
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;