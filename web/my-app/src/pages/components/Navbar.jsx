import config from './../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const handleSignOut = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Sign Out",
            text: "ยินยันการออกจากระบบบ",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                localStorage.removeItem(config.token_name);

                navigate('/login')
            }
        })



    }

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="index3.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link" onClick={handleSignOut}>ออกจากระบบ</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;