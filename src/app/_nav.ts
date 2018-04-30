export const navigation = [
    // {
    //     name: 'My Resource',
    //     url: '/resource/my-resource',
    //     icon: 'icon-speedometer',
    //     // badge: {
    //     //     variant: 'info',
    //     //     text: 'NEW'
    //     // }
    // },
    {
        name: 'Categories',
        url: '/resource/category',
        icon: 'fa fa-cube',
        permissions: [
            'admin.api.category.index'
        ],
        roles: [],
    },
    {
        name: 'Media',
        url: '/media',
        icon: 'fa fa-image',
        permissions: [
            'admin.api.media.index'
        ],
        roles: [],
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
