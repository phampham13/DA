import { env } from '~/config/environment'

/*module.exports = {
    partnerCode: env.MOMO_PARTNER_CODE,
    accessKey: env.MOMO_ACCESS_KEY,
    secretKey: env.MOMO_SECRET_KEY,
    apiEndpoint: "https://test-payment.momo.vn/v2/gateway/api/create"   //'https://test-payment.momo.vn/gw_payment/transactionProcessor'
};*/

module.exports = {
    partnerCode: env.MOMO_PARTNER_CODE,
    accessKey: env.MOMO_ACCESS_KEY,
    secretKey: env.MOMO_SECRET_KEY,
    orderInfo: 'pay with MoMo',
    redirectUrl: 'http://localhost:5173/',
    ipnBase: 'https://9c1b-14-231-21-213.ngrok-free.app/momo/',
    //ipnUrl: 'https://ea5e-14-231-21-213.ngrok-free.app/momo/callback', //chú ý: cần dùng ngrok thì momo mới post đến url này được
    //ipnUrl: 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b',
    requestType: 'captureWallet',
    extraData: '',
    orderGroupId: '',
    autoCapture: true,
    lang: 'vi',
}