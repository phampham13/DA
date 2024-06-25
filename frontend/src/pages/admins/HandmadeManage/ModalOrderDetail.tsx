import React from "react";
import "./ModalOrderDetail.scss";
import { Numeral } from "react-numeral";
import moment from "moment";
import Chip from '@mui/material/Chip';
const ModalOrderDetail = ({ order }) => {
    return (
        <div className="order-container">
            <div className="order-info">
          
                <p className="order-field"><strong>Tên người nhận:</strong> {order.user.name}</p>
                <p className="order-field"><strong>Tên:</strong> {order.shippingAddress.name}</p>
                <p className="order-field"><strong>Địa chỉ:</strong> {order.shippingAddress.address}</p>
                <p className="order-field"><strong>Điện thoại:</strong> {order.shippingAddress.phoneNumber}</p>
                <p className="order-field"><strong>Tổng tiền:</strong> {<Numeral
                    value={order.itemsPrice}
                    format={"0,0"}
                />} đ</p>
                <p className="order-field"><strong>Ngày đặt hàng:</strong> {moment(order.orderDate).format('HH:mm:ss DD-MM-YYYY')} </p>
                <p className="order-field"><strong>Trạng thái:</strong> {order.status === "pending" ? <Chip label="Pending" color="warning"/> : order.status === "shipped" ? <Chip label="Shipped" variant="outlined" color="primary"/> :<Chip label="Returned" variant="outlined" color="primary"/>  }</p>
            </div>
            <div className="order-details">
                <p className="order-header"><strong>Chi tiết sản phẩm:</strong></p>
                <div className="item-list">

                    {order.orderItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.productId.image} alt={item.image} className="product-image" />
                            <p className="item-field">Tên sản phẩm: {item.productId.name}</p>
                            <p className="item-field">Giá: {<Numeral
                                value={item.price}
                                format={"0,0"}
                            />} đ</p>
                            <p className="item-field">Số lượng: {item.quantity}</p>
                            {/* <p className="item-field">Kích thước: {item.size}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ModalOrderDetail;