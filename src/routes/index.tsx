import BookDetailPage from "@/pages/BookDetailPage";
import BookStorePage from "@/pages/BookStorePage";
import CollectionPage from "@/pages/CollectionPage/CollectionPage";
import ConfirmRegistrationPage from "@/pages/ConfirmRegistrationPage/ConfirmRegistrationPage";
import HomePage from "@/pages/HomePage/HomePage";
import IntroductionPage from "@/pages/InformationPage";
import OtherBookPage from "@/pages/OtherBookPage";
import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./Pages/RequireAuth";
import { RoleEnum } from "@/utils/enum/role.enum";
import ViewCart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import AccountPage from "@/pages/AccountPage/AccountPage";
import OrderResult from "@/pages/OrderResult";


export enum RouterPath {
    notFound = '/404',
}

export enum UserRouterPath {
    home = '/',
    account = "/account",
    introduction = '/introduction',
    collection = '/collection',
    category = '/category',
    otherBook = '/other-book',
    bookStore = '/book-store',
    login = '/login',
    bookDetail = '/book-detail/:id',
    confirmRegistrationPage = "/confirm-registration",
    resetPasswordPage = "/reset-password",
    changePasswordPage = "/change-password",
    viewCart = "/cart",
    checkout = "/checkout",
    orderResult = "/order-result",
    intro = "/introduction"
}

export enum AdminRouterPath {
    home = '/admin',
    test = '/admin/test',
    login = '/admin/login',
}

export const routes: any = [];



export const router = createBrowserRouter([
    {
        path: UserRouterPath.home,
        element: <HomePage />,
    },
    {
        path: UserRouterPath.collection,
        element: <CollectionPage />,
    },
    {
        path: UserRouterPath.category,
        element: <CollectionPage />,
    },
    {
        path: UserRouterPath.category,
        element: <CollectionPage />,
    },
    {
        path: UserRouterPath.introduction,
        element: <IntroductionPage />,
    },
    {
        path: UserRouterPath.otherBook,
        element: <OtherBookPage />,
    },
    {
        path: UserRouterPath.bookStore,
        element: <BookStorePage />,
    },
    {
        path: UserRouterPath.account,
        element: (
            <AccountPage />
        )
    },
    {
        path: UserRouterPath.bookDetail,
        element: <BookDetailPage />
    },
    {
        path: UserRouterPath.confirmRegistrationPage,
        element: <ConfirmRegistrationPage />,
    },
    {
        path: UserRouterPath.resetPasswordPage,
        element: <HomePage />,
    },
    {
        path: UserRouterPath.changePasswordPage,

        element: (
            < RequireAuth roles={[RoleEnum.USER]}>
                <div>auth</div>
            </RequireAuth >
        )
    },
    {
        path: UserRouterPath.viewCart,
        element: <ViewCart />
    },
    {
        path: UserRouterPath.checkout,
        element: <Checkout />
    },
    {
        path : UserRouterPath.orderResult,
        element: <OrderResult/>
    },
    {
        path: UserRouterPath.intro,
        element: <IntroductionPage/>
    }
]);