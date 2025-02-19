import Done from "../components/Done";
import InProgress from "../components/InProgress";
import ToDo from "../components/ToDo";

const Home = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Welcome to taskU!</h1>
            <p className="mt-4 text-lg">Manage your tasks efficiently and stay on track.</p>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mx-3 mt-10">
                <div>
                    <ToDo></ToDo>
                </div>
                <div>
                    <InProgress></InProgress>
                </div>
                <div>
                    <Done></Done>
                </div>
            </div>
        </div>
    );
};

export default Home;