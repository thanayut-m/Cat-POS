import { useEffect, useState } from 'react';
import Template from './components/Template';
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Modal from './components/Modal';


function Product() {
    const [productBarcode, setProductBarcode] = useState();
    const [productName, setProductName] = useState();
    const [productCost, setProductCost] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productDetail, setProductDetail] = useState();

    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetchDataProduct();
    }, [])

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                productBarcode: productBarcode,
                productName: productName,
                productPrice: parseFloat(productPrice),
                productCost: parseFloat(productCost),
                productDetail: productDetail
            }

            await axios.post(config.api_path + "/product/insert", payload, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "บันทึกข้อมูล",
                        text: 'บันทึกสินค้าเรียบร้อย',
                        icon: 'success',
                        timer: 1000
                    })
                    fetchDataProduct();
                }
            })
        } catch (err) {
            console.log({ message: err.message });
            Swal.fire({
                title: "Error",
                text: err.message,
                icon: 'error',
                timer: 2000
            })
        }
    }

    const handleChangeProduct = async () => {
        try {

        } catch (err) {
            console.log(err)
        }
    }

    const fetchDataProduct = async () => {
        try {
            axios.get(config.api_path + '/product/info', config.headers()).then(res => {
                setProducts(res.data.result);
            }).catch(err => {
                throw err.response.data;
            })
        } catch (err) {
            console.log({ message: err.message });
        }
    }

    const handelDelete = (products_id) => {
        Swal.fire({
            title: "ลบข้อมูล",
            text: "ยืนยันการลบข้อมูลออกจากระบบ",
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    await axios.delete(config.api_path + `/product/deleteProduct/${products_id}`, config.headers()).then(res => {
                        if (res.data.message === 'success') {
                            fetchDataProduct();
                            Swal.fire({
                                title: "ลบข้อมูล",
                                text: "ลบข้อมูลแล้ว",
                                icon: 'success',
                                timer: 1000
                            })
                        }
                    })
                } catch (err) {
                    console.log({ message: err.message });
                    Swal.fire({
                        title: "Error",
                        text: err.message,
                        icon: 'error',
                        timer: 2000
                    })
                }
            }
        })
    }

    return (
        <div>
            <Template>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">สินค้า</div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSaveProduct}>
                            <div className="row">
                                <div className="mt-3 col-3">
                                    <label>Barcode</label>
                                    <input type="text" className="form-control" onChange={e => setProductBarcode(e.target.value)} />
                                </div>
                                <div className="mt-3 col-3">
                                    <label>ชื่อสินค้า</label>
                                    <input type="text" className="form-control" onChange={e => setProductName(e.target.value)} />
                                </div>
                                <div className="mt-3 col-3">
                                    <label>ราคาจำหน่าย</label>
                                    <input type="number" className="form-control" onChange={e => setProductPrice(e.target.value)} />
                                </div>
                                <div className="mt-3 col-3">
                                    <label>ราคาทุน</label>
                                    <input type="number" className="form-control" onChange={e => setProductCost(e.target.value)} />
                                </div>
                                <div className="mt-3 col-12">
                                    <label>รายละเอียด</label>
                                    <input type="text" className="form-control" onChange={e => setProductDetail(e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <button onClick={handleSaveProduct} type="submit" className="btn btn-primary">
                                    <i className="fa fa-check mr-2" />เพิ่มสินค้า
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">ข้อมูลสินค้า</div>
                    </div>
                    <div className="card-body">
                        <table className="mt-3 table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>ราคาทุน</th>
                                    <th>ราคาจำหน่าย</th>
                                    <th>รายละเอียด</th>
                                    <th width='180px'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? products.map(item =>
                                    <tr key={item.products_id}>
                                        <td>{item.products_barcode}</td>
                                        <td>{item.products_name}</td>
                                        <td>{parseInt(item.products_cost).toLocaleString('th-TH')}&nbsp;บาท</td>
                                        <td>{parseInt(item.products_price).toLocaleString('th-TH')}&nbsp;บาท</td>
                                        <td>{item.products_detail}</td>
                                        <td>
                                            <div className='d-flex justify-content-between'>
                                                {/* <button className="btn btn-primary mr-1">
                                                    <i className='fa fa-eye'></i>
                                                </button> */}
                                                <button  className="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#modalEditProduct">
                                                    <i className='fa fa-edit'></i>
                                                </button>
                                                <button onClick={() => handelDelete(item.products_id)} className="btn btn-danger mr-1">
                                                    <i className='fa fa-trash'></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Template>

            <Modal id="modalEditProduct" title="แก้ไข้ข้อมูลสินค้า">
                <form onSubmit={handleSaveProduct}>
                    <div className="row">
                        <div className="mt-3 col-3">
                            <label>Barcode</label>
                            <input type="text" className="form-control" value={products.productBarcode} onChange={e => setProductBarcode(e.target.value)} />
                        </div>
                        <div className="mt-3 col-9">
                            <label>ชื่อสินค้า</label>
                            <input type="text" className="form-control" value={productName} onChange={e => setProductName(e.target.value)} />
                        </div>
                        <div className="mt-3 col-6">
                            <label>ราคาจำหน่าย</label>
                        </div>
                        <div className="mt-3 col-6">
                            <label>ราคาทุน</label>
                            <input type="number" className="form-control" value={productCost} onChange={e => setProductCost(e.target.value)} />
                        </div>
                        <div className="mt-3 col-12">
                            <label>รายละเอียด</label>
                            <input type="text" className="form-control" value={productDetail} onChange={e => setProductDetail(e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <button onClick={handleChangeProduct} type="submit" className="btn btn-primary">
                            <i className="fa fa-check mr-2" />ยืนยัน
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Product;