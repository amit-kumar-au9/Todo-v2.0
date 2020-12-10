import '../assets/css/navbar.css'
const Navbar = () => {
    return(
        <nav className="navbar">
            <span className="navbar-brand text-white">Todo App</span>
            <div>
                <button className="btn btn-dark mr-2" type="submit">Help</button>
                <button className="btn btn-dark mr-2" type="submit">About Us</button>
                <button className="btn btn-dark mr-2" type="submit">Let's get started</button>
            </div>
        </nav>
    )
}
export default Navbar