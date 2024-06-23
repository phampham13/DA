const nodemailer = require('nodemailer')
import { env } from '~/config/environment';
//var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email, orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: env.MAIL_ACCOUNT, // generated ethereal user
      pass: env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  //transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

  let listItem = '';
  //const attachImage = []
  orderItems.forEach((product) => {
    listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${product.productId.name}</b> với số lượng: <b>${product.quantity}</b> và giá là: <b>${product.productId.price} VND</b></div>
      <div>Hình ảnh của sản phẩm</div>
      <img src=${product.productId.image} alt=${product.productId.name}>
    </div>`
    // attachImage.push({path: order.image})
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: env.MAIL_ACCOUNT, // sender address
    to: "bigbossngan@gmail.com", // list of receivers
    subject: "Bạn đã đặt hàng tại DFreeBook", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công</b></div> ${listItem}`, //
    //attachments: attachImage,
  });
}

module.exports = {
  sendEmailCreateOrder
}