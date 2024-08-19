import { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import config from './../config';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignIn = async (e) => {
        try {
            const payload = {
                email: email,
                password: password
            }
            await axios.post(config.api_path + '/member/signin', payload).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "success",
                        text: "เข้าสู่ระบบแล้ว",
                        icon: "success",
                        timer: 2000
                    });
                } else {
                    Swal.fire({
                        title: "เข้าสู่ระบบ",
                        text: "ไม่พบข้อมูลในระบบ",
                        icon: "warning",
                        timer: 2000
                    });
                }
            }).catch(err => {
                throw err.response.data;
            })
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error"
            });
        }
    }

    return (
        <div id="intro" className="bg-image shadow-2-strong">
            <div className="mask d-flex align-items-center justify-content-center h-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-md-8 col-sm-10">
                            <div className="card shadow-5-strong p-4 mt-5">
                                <div className="card-body">
                                    <h2 className="text-center mb-4">เข้าสู่ระบบ</h2>
                                    <hr />
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form1Example1">Email</label>
                                        <input type="email" id="form1Example1" className="form-control" placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form1Example2">Password</label>
                                        <input type="password" id="form1Example2" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary" onClick={handleSignIn}>
                                            เข้าสู่ระบบ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
