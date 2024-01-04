const routes = {
    home: '/',
    login: '/login',
    signup: '/signup',
    listBooks: '/books',
    bookDetail: '/bookDetail/:id',
    event: '/event',
    handmadeItem: '/handmadeItems',
    address: '/address',
    borrowerCard: '/borrowerCard',
    forbiden403: '/403',
    notfound404user: '/*',



    //admin

    adminHome: '/admin',
    bookListAdmin: '/admin/books',
    categoryListAdmin: '/admin/bookCategories',
    eventListAdmin: '/admin/events',
    borrowerListAdmin: '/admin/borrowers',
    onSlipAdmin: '/admin/onSlip',
    offSlipAdmin: '/admin/offSlip',
    statistics: '/admin/stats',
    notfound404admin: '/admin/*',
};

export default routes;
