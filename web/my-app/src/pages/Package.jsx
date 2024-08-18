import { useState, useEffect } from "react";
import axios from 'axios';
import config from './../config';
import Modal from "./components/Modal";
import Swal from 'sweetalert2';

function Package() {
  const [packages, setPackages] = useState([]);
  const [yourPackages, setYourPackages] = useState({});
  const [storeName, setStoreName] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [username, setUsername] = useState('');
  const [first_Name, setFirst_Name] = useState('');
  const [last_Name, setLast_Name] = useState('');

  useEffect(() => {
    fetchDataPackage();
  }, [])

  const fetchDataPackage = async () => {
    try {
      axios.get(config.api_path + '/package/list').then(res => {
        setPackages(res.data.results);
      }).catch(err => {
        throw err.response.data;
      });
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  const choosePackage = (item) => {
    setYourPackages(item);
  }

  useEffect(() => {
    setUsername(`${first_Name} ${last_Name}`)
  }, [first_Name, last_Name])

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(config.api_path + `/package/check-email`, { email });

      if (response.status === 200) {
        if (response.data.exists) {
          console.log("อีเมลนี้ถูกใช้งานแล้ว");
          return false;
        } else {
          console.log("อีเมลนี้ยังไม่ถูกใช้งาน");
          return true;
        }
      } else {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบอีเมลล์");
        return false;
      }
    } catch (err) {
      console.error("ข้อผิดพลาด:", err.message);
      return false;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      console.log("อีเมลนี้ถูกใช้งานแล้ว");
      setEmailError("อีเมลนี้ถูกใช้งานแล้ว");
      return;
    }

    if (password !== confirmPassword) {
      console.log("รหัสผ่านไม่ตรงกัน");
      setPasswordErr("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      Swal.fire({
        title: "ยืนยันการสมัคร",
        text: "โปรดยืนยันการสมัครใช้บริการ Package",
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
      }).then(async (res) => {
        if (res.isConfirmed) {
          try {
            const payload = {
              packageId: yourPackages.id,
              username,
              storeName,
              email,
              password
            };

            const response = await axios.post(config.api_path + '/package/users', payload);

            if (response.data.message === 'success') {
              Swal.fire({
                title: "บันทึกข้อมูล",
                text: "บันทึกข้อมูลการสมัครแล้ว",
                icon: 'success',
                timer: 2000
              });
            }
          } catch (err) {
            Swal.fire({
              title: "Error1",
              text: err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
              icon: "error"
            });
          }
        }
      });
    } catch (err) {
      console.log({ message: err.message });
    }
  };

  return (
    <div>
      <div className="container mt-2">
        <div className="text-center">
          <div className="h2 text-">CatPOS : point Of Sale On cloud</div>
          <div className="h5">Package For You</div>
        </div>
        <div className="row">
          {packages.map(item =>
            <div key={item.id} className="col-4">
              <div className="card mt-3">
                <div className="card-body text-center">
                  <div className="mt-3 h3 text-success">{item.package_name}</div>
                  <hr />
                  <div className="mt-3 h5 text-secondary">{parseInt(item.bill_amount).toLocaleString('th-TH')}&nbsp;บิล / เดือน</div>
                  <div className="mt-3 h5 text-secondary">{parseInt(item.price).toLocaleString('th-TH')}&nbsp;บาท</div>
                  <div className="mt-3">
                    <button onClick={() => choosePackage(item)} data-bs-toggle="modal" data-bs-target="#modalSignUp" className="btn btn-primary">สมัครสมาชิก</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal id="modalSignUp" title="สมัครใช้บริการ">
        <form action="">
          <div>
            <div className="alert alert-info">{yourPackages.package_name} ราคา {yourPackages.price} </div>
          </div>
          <div className="mt-2">
            <label htmlFor="">E-mail</label>
            <input className="mt-1 form-control" type="email" onChange={e => setEmail(e.target.value)} />
            {emailError && (
              <label className="block text-danger text-sm font-bold mt-1">
                {emailError}
              </label>
            )}
          </div>
          <div className="row">
            <div className="mt-2 col-6">
              <label htmlFor="">รหัสผ่าน</label>
              <input className="mt-1 form-control" type="password" onChange={e => setPassword(e.target.value)} />
              {passwordErr && (
                <label className="block text-danger text-sm font-bold">
                  {passwordErr}
                </label>
              )}
            </div>
            <div className="mt-2 col-6">
              <label htmlFor="">ยืนยันรหัสผ่าน</label>
              <input className="mt-1 form-control" type="password" onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="">ชื่อร้านค้า</label>
            <input className="mt-1 form-control" type="text" onChange={e => setStoreName(e.target.value)} />
          </div>
          <div className="row">
            <div className="mt-2 col-6">
              <label htmlFor="">ชื่อ</label>
              <input className="mt-1 form-control" type="text" onChange={e => setFirst_Name(e.target.value)} />
            </div>
            <div className="mt-2 col-6">
              <label htmlFor="">นามสกุล</label>
              <input className="mt-1 form-control" type="text" onChange={e => setLast_Name(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
              <button onClick={handleSignUp} type="button" className="btn btn-primary">ยืนยันการสมัคร
                {/* <i className="fa fa-arrow-right "></i> */}
              </button>
            </div>
          </div>
        </form>

      </Modal>
    </div>
  );
}

export default Package;
