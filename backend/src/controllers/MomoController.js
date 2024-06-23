const axios = require('axios');
const crypto = require('crypto');
const momoConfig = require('../config/momo');
const Order = require('../models/OrderModel');

const createPayment = async (req, res) => {
    const { orderId, amount } = req.body;
    //const requestId = `${orderId}_${Date.now()}`;
    //const orderInfo = `Thanh toán đơn hàng ${orderId}`;
    //const redirectUrl = 'http://localhost:5173/'; //url điều hướng đến khi thanh toán thành công
    let {
        accessKey,
        secretKey,
        orderInfo,
        partnerCode,
        redirectUrl,
        ipnUrl,
        requestType,
        extraData,
        orderGroupId,
        autoCapture,
        lang,
    } = momoConfig

    //var amount = '10000';
    //var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;

    //const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureMoMoWallet`;

    var rawSignature =
        'accessKey=' +
        accessKey +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
    });

    let result;

    try {
        result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { payUrl } = result.data;

        //await Order.create({ orderId, amount, status: 'pending' });
        res.json({ payUrl });
        //res.status(200).json(result.data)
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const check = async (req, res) => {
    /**
      resultCode = 0: giao dịch thành công.
      resultCode = 9000: giao dịch được cấp quyền (authorization) thành công .
      resultCode <> 0: giao dịch thất bại.
     */
    //console.log('callback: ');
    console.log(req.body);
    /**
     * Dựa vào kết quả này để update trạng thái đơn hàng
     * Kết quả log:
     * {
          partnerCode: 'MOMO',
          orderId: 'MOMO1712108682648',
          requestId: 'MOMO1712108682648',
          amount: 10000,
          orderInfo: 'pay with MoMo',
          orderType: 'momo_wallet',
          transId: 4014083433,
          resultCode: 0,
          message: 'Thành công.',
          payType: 'qr',
          responseTime: 1712108811069,
          extraData: '',
          signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
        }
     */

    return res.status(204).json(req.body);
};

const transactionCheck = async (req, res) => {
    const { orderId } = req.body;

    // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
    // &requestId=$requestId
    var secretKey = momoConfig.secretKey;
    var accessKey = momoConfig.accessKey;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: 'MOMO',
        requestId: orderId,
        orderId: orderId,
        signature: signature,
        lang: 'vi',
    });

    const result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/query', requestBody, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return res.status(200).json(result.data);
};

const refund = async (req, res) => {
    const { transId, amount, requestId } = req.body;
    let {
        accessKey,
        secretKey,
        orderInfo,
        partnerCode,
        redirectUrl,
        ipnUrl,
        requestType,
        extraData,
        orderGroupId,
        autoCapture,
        lang,
    } = momoConfig
    var orderId = partnerCode + new Date().getTime() + "1";
    const description = "Hủy đơn hàng"

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${description}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&transId=${transId}`
    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: 'MOMO',
        requestId: requestId,
        orderId: orderId,
        amount: amount,
        transId: transId,
        lang: 'vi',
        description: description,
        signature: signature
    });

    try {
        const result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/refund', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.status(200).json(result.data)
    } catch (error) {
        //console.error(error);
        return res.status(500).json({ error: 'Something went wrong!' });
    }


}

module.exports = {
    createPayment,
    check,
    transactionCheck,
    refund
}