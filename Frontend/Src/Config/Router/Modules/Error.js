import ErrorPage from 'Pages/Error/BaseErrorPage';

const errorRoutes = {
    name: 'Error',
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    meta: {
        title: 'error_page',
    }
}

export default errorRoutes;