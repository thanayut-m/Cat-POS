import { useState, useEffect } from "react";
import axios from 'axios';
import config from './../../config';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {

    const [memberName, setMemberName] = useState();
    const [packageName, setPackageName] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            axios.get(config.api_path + '/member/info', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setMemberName(res.data.result.username);
                    setPackageName(res.data.result.package.package_name);
                }
            }).catch(err => {
                throw err.response.data;
            })
        } catch (err) {
            console.log(err)
        }
    }

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
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Cat-POS</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex ">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <div className="text-white">ชื่อร้านค้า : </div>
                            <div className="text-white">ชื่อผู้ใช้ : {memberName}</div>
                            <div className="text-white">Package : {packageName}</div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/product"} className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        สินค้า
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fa fa-cog"></i>
                                    <p>
                                        ตั้งค่าระบบ
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Profile</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/top-nav.html" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>กําหนดสิทธิ์</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <hr />
                            <li className="nav-item">
                                <a className="nav-link" onClick={handleSignOut}>
                                    <i className="nav-icon fa fa-sign-out"></i>
                                    <p>
                                        ออกจากระบบ
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;