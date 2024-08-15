
import { useState, useEffect } from "react";
import axios from 'axios';
import config from './../config';

function Package() {
  const [packages, setPackages] = useState([]);
  const [packageName, setPackageName] = useState();
  const [billAmount, setBillAmount] = useState();
  const [price, setPrice] = useState();

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
    } catch (e) {
      console.log({ message: e.message });
    }
  }

  return (
    <>
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
                  <div className="mt-3 h5 text-secondary">{parseInt(item.bill_amount).toLocaleString('th-TH')}&nbsp;บิล / เดือน</div>
                  <div className="mt-3 h5 text-secondary">{parseInt(item.price).toLocaleString('th-TH')}&nbsp;บาท</div>
                  <div className="mt-3">
                    <button className="btn btn-primary">สมัครสมาชิก</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Package;
