import routesConfig from '../config/routes';

//import pages
import NotFound404 from '../pages/NotFound404/NotFound404';
import Forbiden403 from '../pages/Forbiden403/Forbiden403';
import Home from '../pages/users/Home/Home';
import Login from '../pages/auths/Login/Login';
import Signup from '../pages/auths/Signup';
import BooksList from '../pages/users/BooksList/BooksList';
import { BookDetail } from '../pages/users/BooksList/BookDetail';
import LibraryAddress from '../pages/users/Address/LibraryAddress';
import HandmadeItems from '../pages/users/handmadeItems/handmadeItems';
import Event from '../pages/users/Event/Event';
import BorrowerCard from '../pages/users/BorrowerCard/BorrowerCard';

import BookList from '../pages/admins/BookManage/BookList';
import BookCategory from '../pages/admins/BookManage/BookCategory';
import OnBorrowerSlip from '../pages/admins/BorrowerSlip/OnBorrowerSlip';
import OffBorrowerSlip from '../pages/admins/BorrowerSlip/OffBorrowerSlip';
import BorrowerList from '../pages/admins/BorrowerAcc/BorrowerList';
import EventList from '../pages/admins/EventManage/EventList';
import Statistics from '../pages/admins/Statistics/Statistics';
import AddBookForm from '../pages/admins/BookManage/AddBookForm';
import EditBookForm from '../pages/admins/BookManage/EditBookForm';
import DefaultLayout from '../layouts/AdminLayout/DefaultLayout/DefaultLayout';
import { LibraryAdd } from '@mui/icons-material';
//import layout

//public route

const userRoutes = [
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.signup, component: Signup, layout: null },
    { path: routesConfig.home, component: Home, layout: null, title: 'Tổng quan' },
    { path: routesConfig.listBooks, component: BooksList, layout: null, title: 'Tủ sách' },
    { path: routesConfig.bookDetail, component: BookDetail, layout: null, title: 'Chi tiết về sách' },
    { path: routesConfig.event, component: Event, layout: null, title: 'Sự kiện của thư viện' },
    { path: routesConfig.address, component: LibraryAddress, layout: null, title: 'Địa chỉ' },
    { path: routesConfig.handmadeItem, component: HandmadeItems, layout: null, title: 'Tiệm hand' },
    { path: routesConfig.borrowerCard, component: BorrowerCard, layout: null, title: 'Thẻ đọc' },
    { path: routesConfig.notfound404user, component: NotFound404, layout: null, title: '' },
];

const adminRoutes = [
    { path: routesConfig.admin, component: BookList, title: 'Quản lý sách' },
    { path: routesConfig.categoryListAdmin, component: BookCategory, title: 'Quản lý thể loại sách' },
    { path: routesConfig.bookListAdmin, component: BookList, title: 'Quản lý sách' },
    { path: routesConfig.addBookForm, component: AddBookForm, title: 'Thêm sách mới' },
    { path: routesConfig.editBookForm, component: EditBookForm, title: 'Thêm sách mới' },
    { path: routesConfig.onSlipAdmin, component: OnBorrowerSlip, title: 'Quản lý phiếu mượn sách On' },
    { path: routesConfig.offSlipAdmin, component: OffBorrowerSlip, title: 'Quản lý phiếu mượn sách Off' },
    { path: routesConfig.borrowerListAdmin, component: BorrowerList, title: 'Quản lý tài khoản bạn đọc on' },
    { path: routesConfig.statistics, component: Statistics, title: 'Thống kê' },
    { path: routesConfig.eventListAdmin, component: EventList, title: 'Thống kê' },
    { path: routesConfig.notfound404admin, component: NotFound404, layout: DefaultLayout, title: '' },
];

export { userRoutes, adminRoutes };
