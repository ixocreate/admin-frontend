export const navigation = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        // badge: {
        //     variant: 'info',
        //     text: 'NEW'
        // }
    },
    {
        name: 'Users',
        url: '/user',
        icon: 'fa fa-users',
        permissions: [],
        roles: [
            'admin',
        ],
    },
];
