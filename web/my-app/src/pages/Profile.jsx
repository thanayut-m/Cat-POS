import Template from "./components/Template";
import axios from 'axios';
import config from '../config';
import { useEffect, useState } from "react";
import Swal  from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Profile() {
    const [memberName, setMemberName] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + '/member/info', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setMemberName(res.data.result.username);
                }
            }).catch(err => {
                throw err.response.data;
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeProfile = async () => {

        try {
            const payload = {
                memberName: memberName
            }
            await axios.put(config.api_path + '/member/changeProfile', payload, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title : "บันทึกข้อมูล",
                        text: "เปลี่ยนแปลงข้อมูลร้านของคุณแล้ว",
                        icon : "success",
                        timer : 2000
                    })

                }
            })
        } catch (err) {
            console.log({ message: err.message });
            Swal.fire({
                title : "Error",
                text: err.message ,
                icon : "error"
            })
        }
    }

    return (
        <div>
            <Template></Template>
            <div className="container">
                <label htmlFor="">ร้านค้า</label>
                <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
            </div>
            <div className="mt-3">
                <button className="btn btn-primary" onClick={handleChangeProfile}>save</button>
            </div>
        </div>
    )
}
export default Profile;