import Header from "./header";
import Close from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function Navbar({ showMenu, active }) {
  return (
    <div>
      <Header />
      <ul
        className={
          active
            ? "flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden"
            : "hidden"
        }
      >
        <Close onClick={showMenu} className="cursor-pointer" />
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Register</Link>
        </li>
        <li>
          <Link to="/">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
