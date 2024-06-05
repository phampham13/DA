import classNames from "classnames/bind";
import styles from "./ModalBorrowerSlip.module.scss"
import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"

const cx = classNames.bind(styles);
const ModalBorrowerSlip = ({ show, handleClose, cardListBook, total }) => {
    const dispatch = useDispatch()

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");
    const phoneRegExp = /^[0-9]{10,}$/;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        console.log(cardListBook)
    }, []);

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        const selectedCityData = cities.find((city) => city.Name === cityName);
        setDistricts(selectedCityData ? selectedCityData.Districts : []);
        formik.setFieldValue("city", cityName);
        formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "");
    };
    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        const selectedDistrictData = districts.find((district) => district.Name === districtName);
        setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
        formik.setFieldValue("district", districtName);
        formik.setFieldValue("ward", "");
    };
    const handleWardChange = (e) => {
        const wardName = e.target.value;
        formik.setFieldValue("ward", wardName);
    };

    const formik = useFormik({
        initialValues: {
            receiverName: "",
            phoneNumber: "",
            address: "",
            city: "",
            district: "",
            ward: "",
            status: 0
        },
        validationSchema: Yup.object({
            receiverName: Yup.string().required("Vui lòng nhập tên người nhận"),
            phoneNumber: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ").required("Bạn chưa nhập số điện thoại"),
            address: Yup.string().required("Vui lòng nhập địa chỉ (số nhà, đường/ thôn)"),
            city: Yup.string().required("Bạn chưa chọn tỉnh/ thành phố"),
            district: Yup.string().required("Bạn chưa chọn quận/huyện"),
            ward: Yup.string().required("Bạn chưa chọn phường/xã"),
        }),
        onSubmit: (values) => {
            const dataToSend = {
                name: values.name,
                province: values.city,
                address: `${values.address}, ${values.ward}, ${values.district}, ${values.city}, ${values.address}`,
                status: 0,
                items: cardListBook,
                total: total
            };
            dispatch(createSlipAction(dataToSend.name, dataToSend.phoneNumber, dataToSend.status, dataToSend.address, dataToSend.total, dataToSend.items))
            toast.success("Mượn sách thành công, CTV sẽ sớm xác nhận phiếu mượn");
            navigateTo("/borrowerCard");
        },
    })

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Phiếu mượn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
                    <div className={cx("container")}>
                        <div className={cx("delivery-info")}>
                            <p className={cx("header")}><strong>Thông tin giao sách:</strong></p>
                            <div className={cx("form-input")}>
                                <input id={cx("receiverName")} name="receiverName" type="text" placeholder="Tên người nhận" value={formik.values.receiverName} onChange={formik.handleChange} className={cx("form-control")} />
                                {formik.errors.receiverName && formik.touched.receiverName && <span className={cx("form-message")}>{formik.errors.receiverName}</span>}
                            </div>
                            <div className={cx("form-input")}>
                                <input id={cx("phoneNumber")} name="phoneNumber" type="text" placeholder="Số điện thoại" value={formik.values.phoneNumber} onChange={formik.handleChange} className={cx("form-control")} />
                                {formik.errors.phoneNumber && formik.touched.phoneNumber && <span className={cx("form-message")}>{formik.errors.phoneNumber}</span>}
                            </div>
                            <div className={cx('address')}>
                                <p><strong>Địa chỉ: </strong></p>
                                <div className={cx("optionDiv")}>
                                    <select value={formik.values.city} onChange={handleCityChange}>
                                        <option value="" disabled>
                                            Chọn tỉnh thành
                                        </option>
                                        {cities.map((city) => (
                                            <option key={city.Id} value={city.Name}>
                                                {city.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.errors.city && formik.touched.city && (
                                        <span className={cx("form-message")}>
                                            <br></br>
                                            {formik.errors.city}
                                        </span>
                                    )}
                                </div>
                                <div className={cx("optionDiv")}>
                                    <select value={formik.values.district} onChange={handleDistrictChange}>
                                        <option value="" disabled>
                                            Chọn quận huyện
                                        </option>
                                        {districts.map((district) => (
                                            <option key={district.Id} value={district.Name}>
                                                {district.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.errors.district && formik.touched.district && (
                                        <span className={cx("form-message")}>
                                            <br></br>
                                            {formik.errors.district}
                                        </span>
                                    )}
                                </div>
                                <div className={cx("optionDiv")}>
                                    <select value={formik.values.ward} onChange={handleWardChange}>
                                        <option value="" disabled>
                                            Chọn phường xã
                                        </option>
                                        {wards.map((ward) => (
                                            <option key={ward.Id} value={ward.Name}>
                                                {ward.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.errors.ward && formik.touched.ward && (
                                        <span className={cx("form-message")}>
                                            <br></br>
                                            {formik.errors.ward}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={cx('address-detail')}>
                                <div className={cx("form-input")}>
                                    <input id={cx("address")} name="address" type="text" placeholder="Số nhà, tên đường" value={formik.values.address} onChange={formik.handleChange} className={cx("form-control")} />
                                    {formik.errors.address && formik.touched.address && <span className={cx("form-message")}>{formik.errors.address}</span>}
                                </div>
                            </div>
                        </div>

                        <div className={cx("books-details")}>
                            <p className={cx("header")}><strong>Sách:</strong></p>
                            <div className={cx("book-list")}>

                                {cardListBook.map((book) => (
                                    <div key={book.bookId} className={cx("item")}>
                                        <img src={book.coverImg} alt={book.name} className={cx("b-image")} />
                                        <p className={cx("item-field")}>Tên sách: {book.name}</p>
                                        <p className={cx("item-field")}>Số lượng: {book.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="primary" className={cx("form-submit")} type="submit" value="Submit Form">
                            Tạo phiếu mượn
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalBorrowerSlip;