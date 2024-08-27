import { useEffect, useState } from 'react';
import Template from './components/Template';
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';
import Modal from './components/Modal';


function Product() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetchDataProduct();
    }, [])

    const fetchDataProduct = async () => {
        try {
            axios.get(config.api_path + '/product/info', config.headers()).then(res => {
                setProducts(res.data.result);
                clearForm();
            }).catch(err => {
                throw err.response.data;
            })
        } catch (err) {
            console.log({ message: err.message });
        }
    }

    const handleSaveProduct = async (e) => {
        e.preventDefault();

        let url = config.api_path + '/product/inserts';
        if (product.products_id !== undefined) {
            url = config.api_path + '/product/changeProduct'
        }

        try {
            await axios.post(url, product, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "บันทึกข้อมูล",
                        text: 'บันทึกสินค้าเรียบร้อย',
                        icon: 'success',
                        timer: 1000
                    })
                    fetchDataProduct();
                    clearForm();
                    handleClose();
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

    const clearForm = () => {
        setProduct({
            products_barcode: '',
            products_name: '',
            products_cost: '',
            products_price: '',
            products_detail: ''
        });
    }

    const handleClose = () => {
        const btns = document.getElementsByClassName('btnClose')
        for (let i = 0; i < btns.length; i++) {
            btns[i].click();
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
                        <div className="mt-3 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProduct">
                                <i className="fa fa-check mr-2" />เพิ่มสินค้า
                            </button>
                        </div>
                        <table className="mt-3 table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>ราคาทุน</th>
                                    <th>ราคาจำหน่าย</th>
                                    <th>รายละเอียด</th>
                                    <th width='150px'></th>
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
                                            <div className='d-flex justify-content-center'>
                                                {/* <button className="btn btn-primary mr-1">
                                                    <i className='fa fa-eye'></i>
                                                </button> */}
                                                <button onClick={() => setProduct(item)} className="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#modalProduct">
                                                    <i className='fa fa-edit'></i>
                                                </button>
                                                <button onClick={() => handelDelete(item.products_id)} className="btn btn-danger mr-1">
                                                    <i className='fa fa-trash'></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Template>

            <Modal id="modalProduct" title="สินค้า" modalSize='modal-lg'>
                <form onSubmit={handleSaveProduct}>
                    <div className="row">
                        <div className="mt-3 col-3">
                            <label>Barcode</label>
                            <input type="text" className="form-control" value={product.products_barcode} onChange={e => setProduct({ ...product, products_barcode: e.target.value })} />
                        </div>
                        <div className="mt-3 col-9">
                            <label>ชื่อสินค้า</label>
                            <input type="text" className="form-control" value={product.products_name} onChange={e => setProduct({ ...product, products_name: e.target.value })} />
                        </div>
                        <div className="mt-3 col-2">
                            <label>ราคาจำหน่าย</label>
                            <input type="number" className="form-control" value={product.products_price} onChange={e => setProduct({ ...product, products_price: parseInt(e.target.value) })} />
                        </div>
                        <div className="mt-3 col-2">
                            <label>ราคาทุน</label>
                            <input type="number" className="form-control" value={product.products_cost} onChange={e => setProduct({ ...product, products_cost: parseInt(e.target.value) })} />
                        </div>
                        <div className="mt-3 col-8">
                            <label>รายละเอียด</label>
                            <input type="text" className="form-control" value={product.products_detail} onChange={e => setProduct({ ...product, products_detail: e.target.value })} />
                        </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                            <i className="fa fa-check mr-2" />ยืนยัน
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Product;