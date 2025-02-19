import { SiTask } from "react-icons/si";
import { signInWithGoogle } from "../firebase/firebase";

const Login = () => {
    const handleSignIn = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="hero mt-48">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl flex gap-2 items-center justify-center font-bold">
                        <span className="text-red-600"><SiTask /></span> taskU
                    </h1>
                    <p className="py-6">
                        Stay on Track, Get Things Done!
                    </p>
                    <button
                        onClick={handleSignIn}
                        className="btn bg-red-600 text-white btn-sm"
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;