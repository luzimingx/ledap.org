module.exports = {
    base: '/ledap.org/',
    title: 'Ledap',
    description: '好用的前后端解耦方案',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '组件', link: '/component/' },
            { text: 'API', link: '/api/Event/' },
            { text: 'GitHub', link: 'https://github.com/ethercap/ledap' },
        ],
        sidebar: {
            '/guide/': [{
                title: '指南',
                path: null,
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    ['/guide/', '快速上手'],
                    ['/guide/Yii2Ledap/', 'Yii2-ledap'],
                ]
            }],
            '/component/': [{
                title: '组件',
                path: null,
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    ['/component/BaseInput/', 'baseinput'],
                    ['/component/FormItem/', 'form-item'],
                    ['/component/GroupInput/', 'groupinput'],
                    ['/component/Tab/', 'tab'],
                    ['/component/Checkbox/', 'checkbox'],
                    ['/component/Radio/', 'radio'],
                    ['/component/Dropdown/', 'dropdown'],
                    ['/component/SearchInput/', 'searchinput'],
                    ['/component/Select2/', 'select2'],
                    ['/component/Pager/', 'pager'],
                    ['/component/Grid/', 'grid'],
                ]
            }],
            '/api/': [{
                title: 'API',
                path: null,
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    ['/api/Event/', 'Event'],
                    ['/api/Base/', 'BaseObject'],
                    ['/api/Model/', 'Model'],
                    ['/api/DataProvider/', 'DataProvider'],
                    ['/api/WebDataProvider/', 'WebDataProvider'],
                    ['/api/Pagination/', 'Pagination'],
                    ['/api/Validator/', 'Validator'],
                    ['/api/Theme/', 'Theme'],
                    ['/api/App/', 'App'],
                ]
            }]
        },
        lastUpdated: 'Last Updated',
    },
    configureWebpack: {
        resolve: {
            alias: {
                // 指向 src 目录
                '@': '../'
            }
        }
    }
};