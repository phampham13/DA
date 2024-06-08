import classNames from 'classnames/bind';
import styles from './HandmadeItems.module.scss';
import ProductCard from '../../../components/CardComponent/ProductCard';
const cx = classNames.bind(styles);

const FakeItem = [
    {
        _id: 1,
        name: "Hoa giấy",
        image: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/434944023_842013234610828_6616419698428551284_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFZrC9Km0smXahTFGUC5Xc7xfTQbliEuAjF9NBuWIS4CHpMtz7rkAVCyW1L0WO67940MCLAnqdBgKdIi0HB8YJw&_nc_ohc=_1EUTDkImwMQ7kNvgHIOmo3&_nc_ht=scontent.fhan19-1.fna&oh=00_AYAbv1kkArFBJupBj5HKSIOfJQdeU53ZxBqpQHpZ042tLQ&oe=66688CD7',
        price: '70000',
        quantity: 10,
        description: ""
    },
    {
        _id: 2,
        name: "Lì xì",
        image: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/186535897_262970262280130_6514069557648280940_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGfxFH88-93AIteDtcusOx7vpJgfdeU6gO-kmB915TqA3AA88tQTgBdJikL3fyRkTqffoXA8v3bOKF9ioaFz7Vy&_nc_ohc=SljUSu2h588Q7kNvgGLQOOO&_nc_ht=scontent.fhan19-1.fna&oh=00_AYDTDgJPYPBQIvTe0I01EEPpzUbFmFjuXbODPfujM7Mutg&oe=668A4254',
        price: '70000',
        quantity: 10,
        description: "Làm từ lịch cũ làm từ lịch cũ, làm từ lịch cũ"
    },
    {
        _id: 3,
        name: "Móc khóa",
        image: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/434867490_842014407944044_1278864919917870230_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHAa0Urv3Dt5MHPtrvV2oz4HXf-7EUAiv8dd_7sRQCK_zbAGm7Dt8YB4Iu4izEJbSNI1G29BYhqlxlQFS3r6QRO&_nc_ohc=7Sl-rOPxl9cQ7kNvgGD1Pgf&_nc_ht=scontent.fhan19-1.fna&oh=00_AYA3KtAoTrj1BLH9LunaB13_hiOvp_9blbHXaQo2XLxpxQ&oe=66688244',
        price: '10000',
        quantity: 10,
        description: ""
    },
    {
        _id: 4,
        name: "Thiệp",
        image: '',
        price: '10000',
        quantity: 10,
        description: ""
    },
    {
        _id: 5,
        name: "Dầu dừa",
        image: '',
        price: '70000',
        quantity: 10,
        description: "Nguyên liệu dừa"
    },
    {
        _id: 6,
        name: "Hoa giấy",
        image: '',
        price: '70000',
        quantity: 9,
        description: "Hương dược liệu"
    },
    {
        _id: 7,
        name: "Hoa giấy",
        image: '',
        price: '20000',
        quantity: 5,
        description: "custom theo yêu cầu"
    }
]

const HandmadeItems = () => {
    const handleAddToCart = (productId, amount) => {
        console.log("thêm", productId, amount)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx("cover")}>
                <img src='../tiemhand.png' alt="tiem hand"></img>
            </div>
            <div className={cx("itemList")}>
                {FakeItem.map((item) => (
                    <ProductCard product={item} key={item._id} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
}

export default HandmadeItems;