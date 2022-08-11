import { entryCheckUser, entryCheckPersonal } from '../Middleware/Entry';

import Personal from 'Pages/Personal/BasePersonal.vue';
import Profile from 'Pages/Profile/BaseProfile.vue';

import Company from 'Pages/Company/BaseCompany.vue';
import AllCompany from 'Pages/Company/Pages/AllCompany.vue';
import CreateCompany from 'Pages/Company/Pages/CreateCompany.vue';
import EditCompany from 'Pages/Company/Pages/EditCompany.vue';

const personalRoutes = {
    path: '/',
    name: 'Personal',
    component: Personal,
    meta: {
        title: 'personal_area',
        middleware: [
            entryCheckUser,
            entryCheckPersonal,
        ]
    },
    children: [
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                title: 'profile',
            }
        },
        {
            path: '/company',
            name: 'Company',
            component: Company,
            meta: {
                title: 'company',
            },
            children: [
                {
                    path: '/company',
                    name: 'CompanyList',
                    component: AllCompany,
                    meta: {
                        title: 'company_list',
                    }
                },
                {
                    path: '/company/create',
                    name: "CreateCompany",
                    component: CreateCompany,
                    meta: {
                        title: 'create_company'
                    }
                },
                {
                    path: '/company/:id',
                    name: 'EditCompany',
                    component: EditCompany,
                    meta: {
                        title: 'edit_company',
                    },
                },
            ]
        }

    ]
}

export default personalRoutes;