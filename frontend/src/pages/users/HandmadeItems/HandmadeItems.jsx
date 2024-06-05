import classNames from 'classnames/bind';
import styles from './HandmadeItems.module.scss';
const cx = classNames.bind(styles);

const FakeItem = [
    {
        itemId: 1,
        itemName: "Hoa giấy",
        imgUrl: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/387816018_726350522843767_3404249883016556922_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEk9soRF1Awj-R4Lb9Iuh77j3QqDjJkgpePdCoOMmSCl6tpiOkWH5CzPHU5tXYin_Q_9TeDUfTlslkif6m3M2yn&_nc_ohc=ro5h7D8VLWoAX8cUiW7&_nc_ht=scontent.fhan19-1.fna&oh=00_AfDXMhwJTalQGtS9MtXSaOW2WMdkixHhZHBsSOdzoy4Cgw&oe=65A9447E',
        price: '70000',
        quantity: 10
    },
    {
        itemId: 2,
        itemName: "Móc khóa len",
        imgUrl: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/368293684_694521869359966_2473646488812589258_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeE7HnKAiFmeSmUeK7zlFhe99z9srAlKYFH3P2ysCUpgUSQdOXDIUfckjKcJ0nOPlExCi-g0XaIUrSW582s5tIk7&_nc_ohc=i3GAGxadTSIAX--NCqr&_nc_ht=scontent.fhan19-1.fna&oh=00_AfAWarhmkL5MKN6ush7SDBjBJj2yHx1gjbLWuUmCI2VBPw&oe=65A9CC2A',
        price: '20000',
        quantity: 1
    },
    {
        itemId: 3,
        itemName: "Cặp tóc",
        imgUrl: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/366912892_688323753313111_8946297977608784985_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeF_aqIHNBUVaomoCBZ-ug3_IM1aAWmyhDcgzVoBabKENzgQSoClkDoKS9hXGpkN4jpCoag-86GmymVvBBb7Zc2H&_nc_ohc=h8jouz8PqnkAX9ec2A9&_nc_ht=scontent.fhan19-1.fna&oh=00_AfCk9HPDzdqU7JZNLaByIIiMOPwMGyJ2nkyMEAgr4-ONUQ&oe=65A98180',
        price: '10000',
        quantity: 2
    },
    {
        itemId: 4,
        itemName: "Dreamcatcher",
        imgUrl: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/363365015_677310121081141_323312882029665552_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFIMZ-UV_vHtWmDESoELMm0curtdrzKeq9y6u12vMp6r0qdDSaWA3vcFCYzvFtUS8J62kDHC4w7qETF8x9xvmSr&_nc_ohc=OLyuiTIeUpEAX8acY6J&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBn6UyEXuEZQvplk9Ut57BRSPsN-GjigNxnQxAiVro_zw&oe=65A915A5',
        price: '70000',
        quantity: 5
    },
    {
        itemId: 5,
        itemName: "Dây buộc tóc",
        imgUrl: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/358102999_665605605584926_8617548730963226085_n.jpg?stp=dst-jpg_p960x960&_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeE9AUVrNXIt3rU3WvV9o-D8qKOA-S-BsTOoo4D5L4GxM1OCCXeuqyLGwm6z4-QlIp-2J0vXcT4Cx-pwtZDrzqP1&_nc_ohc=nnWmkTEiinMAX9jRFlF&_nc_ht=scontent.fhan19-1.fna&oh=00_AfCVwocCUAz6qe5S2SEAc3Ya5AgW4aFvh15uZiSb0IGuyg&oe=65A9976B',
        price: '70000',
        quantity: 4
    },
    {
        itemId: 6,
        itemName: "Túi vải",
        imgUrl: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/346485076_634499748141387_2928829732468240044_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeERr15kBUYQJWyQ0xdRUCw6kvV-8kcXkBuS9X7yRxeQG6R2sVy2vP2ChpfgnzyVQt3qesky6QWCxvpYW2007IiS&_nc_ohc=iDMb9JnW5YIAX8MsM9Z&_nc_ht=scontent.fhan19-1.fna&oh=00_AfA0wqXEy7FKJxMO8tM-RJI8p1q423gbK1OEqjSEhuuCVA&oe=65A9DAC1',
        price: '70000',
        quantity: 2
    }
]

const HandmadeItems = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx("cover")}>
                <img src='../tiemhand.png' alt="tiem hand"></img>
            </div>
            <div className={cx("itemList")}>
                {FakeItem.map((item) => (
                    <div key={item.itemId} className={cx("item")}>
                        <img src={item.imgUrl} alt={item.itemName} className={cx("item-image")} />
                        <h5 className={cx("item-field")}>Tên sản phẩm: {item.itemName}</h5>
                        <p className={cx("item-field")}>Số lượng: {item.quantity}</p>
                        <p className={cx("item-field")}>Giá: {item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HandmadeItems;