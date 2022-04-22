var routes = [
    {
        path: '/',
        url: './index.html',
    },
    {
        path: '/main/',
        componentUrl: './pages/main.html',
    },
    {
        path: '/login/',
        componentUrl: './pages/login.html'
    },
    {
        path: '/order/:clientId/:orderId',
        componentUrl: './pages/order.html',
    },
    {
        path: '/assignedorder/:clientId/:orderId/:internalClientId',
        componentUrl: './pages/assignedorder.html'       
    },
    {
        path: '/assignedresource/:clientId/:orderId/:detailId',
        componentUrl: './pages/assignedresource.html',
        options: {
            history: false,
            pushState: false
        }
    },
    {
        path: '/resources/:clientId/:orderId',
        componentUrl: './pages/resources.html'      
    },
    {
        path: '/resource/:catId/:resId/:clientId/:orderId',
        componentUrl: './pages/resource.html'      
    },
    {
        path: '/clientprofile/:clientId/:internalClientId',
        componentUrl: './pages/clientprofile.html'
    },
    {
        path: '/recommendedresources/:clientId/:orderId',
        componentUrl: './pages/recommendedresources.html'      
    },
    {
        path: '/recommended/:catId/:resId/:clientId/:orderId',
        componentUrl: './pages/recommended.html'
    },
    {
        path: '/profits/',
        componentUrl: './pages/profits.html'
    },
    {
        path: '/profitdetail/:collaboratorId/:profitId',
        componentUrl: './pages/profitdetail.html'
    },
    {
        path: '/servicehistory/',
        componentUrl: './pages/servicehistory.html'
    },
    {
        path: '/orderdetail/:orderId',
        componentUrl: './pages/orderhistroydetail.html',
    },
    {
        path: '/profile/',
        componentUrl: './pages/profile.html',
    },
    {
        path: '/datasheet/:clientId/:orderId',
        componentUrl: './pages/datasheet.html'
    },
    {
        path: '/faq/',
        componentUrl: './pages/faq.html'
    },
    {
        path: '/faqdetail/:faqId',
        componentUrl: './pages/faqdetail.html'
    },
    {
        path: '/inbox/',
        componentUrl: './pages/inbox.html'
    }
]; 