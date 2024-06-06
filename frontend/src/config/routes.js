const routes = {
    home: '/',
    login: '/login',
    signup: '/signup',
    listBooks: '/books',
    bookDetail: '/bookDetail/:id',
    handmadeItem: '/handmadeItems',
    address: '/address',
    borrowerCard: '/borrowerCard',
    forbiden403: '/403',
    notfound404user: '/*',



    //admin

    adminHome: '/admin/books',
    bookListAdmin: '/admin/books',
    addBookForm: '/admin/addBook',
    editBookForm: '/admin/editBook/:id',
    categoryListAdmin: '/admin/bookCategories',
    borrowerListAdmin: '/admin/borrowers',
    onSlipAdmin: '/admin/onSlip',
    offSlipAdmin: '/admin/offSlip',
    productsAdmin: '/admin/products',
    ordersAdmin: '/admin/orders',
    statistics: '/admin/stats',
    notfound404admin: '/admin/*',
};

export default routes;
