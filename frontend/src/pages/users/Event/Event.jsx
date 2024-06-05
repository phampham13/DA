import classNames from "classnames/bind";
import styles from "./Event.module.scss"

const fakeEvent = {
    eventId: 1,
    eventName: "Đổi sách lấy cây",
    startTime: '01/01/2024',
    finishTime: '01/02/2024',
    description: 'Trong tháng 1 này, sự kiện " Đổi sách lấy cây" sẽ diễn ra tại D Free Book. Sự kiện sẽ là nơi mình có thể đổi sách cho thiếu nhi lấy sen đá hoặc các sản phẩm thân thiện với môi trường\
    .Những cuốn sách cậu dành tặng chúng mình sẽ được chuyển tới các em nhỏ khó khăn trong chuyến đi tỉnh xa tháng 11 sắp tới của thư viện.\
    Đặc biệt, dịp này D Free Book kết hợp tổ chức sự kiện tặng cây chào đón tân sinh viên với nhiều hoạt động cực kỳ thú vị. Hàng ngàn cây sen đá cực xinh đang chờ người đón về nhà đó. Mình hãy tới và chiếm lấy các em ấy bằng những cách sau đây:. \
    🌱 Hệ tiêu chuẩn: Chỉ cần đến thư viện => Tặng 1 cây sen đá. \
    🌱Hệ lan tỏa: Reaction, share bài viết này ở chế độ công khai trên facebook. \
    🌱Hệ sống ảo nhưng yêu thật: Chụp ảnh check in tại thư viện kèm #DFB_chaotan2022 #DFreeBook đăng trên Facebook cá nhân ở chế độ công khai => Tặng 1 cây sen đá. \
    🌱Hệ fan cứng: Follow D Free Book trên mọi nền tảng mạng xã hội (Facebook, Instagram, TikTok, Youtube => Tặng 1 cây sen đá. \
    🌱Đi nhóm 3 người trở lên => Mỗi bạn được tặng thêm 1 cây sen đá. \
    Đặc biệt: Nếu tham vọng đủ nhiều và làm đủ các cách trên, mỗi bạn có thể nhận tới 5 cây sen. \
    📚Chương trình đổi sách nhận cây, chúng mình tiếp nhận những thể loại sách sau đây:. \
    - Sách giáo khoa, sách tham khảo cho học sinh cấp 1, cấp 2. \
    - Sách chữ, truyện tranh cho thiếu nhi. \
    - Và bất cứ cuốn sách nào cậu nghĩ rằng sẽ phù hợp với các em học sinh cấp 1, cấp 2 vùng cao. Chúng mình tin rằng người đọc sách sẽ biết cách tặng sách\ ',
    imgUrl: '../event1.jpg'
}

const cx = classNames.bind(styles);
const Event = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("event-cover")}>
                <img src={fakeEvent.imgUrl}></img>
            </div>
            <div className={cx("event-info")}>
                <div className={cx("event-name")}>
                    <h3>{fakeEvent.eventName}</h3>
                </div>
                <div className={cx("time")}>
                    <p>Thời gian bắt đầu: <span>{fakeEvent.startTime}</span></p>
                    <p>Thời gian kết thúc: <span>{fakeEvent.finishTime}</span></p>
                </div>
                <div className={cx("desc")}>
                    <h4>Chi tiết:</h4>
                    <div className={cx("multiline-text")}>
                        {fakeEvent.description.split('. ' || '\n').map((line, index) => (
                            <div key={index}> {line}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Event;