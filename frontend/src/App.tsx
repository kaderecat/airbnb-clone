import "./App.css";
import NavFooter from "./components/NavFooter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className=" h-[150vh]">
      <Navbar />
      <div className="md:hidden absolute flex my-4 justify-center items-center bottom-0 left-0 right-0">
        <NavFooter />
      </div>
    </div>
  );
}

export default App;
