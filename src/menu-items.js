export default {
    items: [
        {
            id: 'Home',
            title: 'Home',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'Home',
                    title: 'Home',
                    type: 'item',
                    url: '/home',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'User',
            title: 'User',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'basic',
                    title: 'User-List',
                    type: 'item',
                    icon: 'feather icon-box',
                    url:'/allusers'
                }
            ]
        }
    ]
}