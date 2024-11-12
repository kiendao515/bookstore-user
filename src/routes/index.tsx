import BookStorePage from "@/pages/BookStorePage";
import CollectionPage from "@/pages/CollectionPage/CollectionPage";
import HomePage from "@/pages/HomePage/HomePage";
import IntroductionPage from "@/pages/InformationPage";
import OtherBookPage from "@/pages/OtherBookPage";
import { createBrowserRouter } from "react-router-dom";


export enum RouterPath {
    notFound = '/404',
}

export enum UserRouterPath {
    home = '/',
    introduction = '/introduction',
    collection = '/collection',
    category = '/category',
    otherBook = '/other-book',
    bookStore = '/book-store',
    login = '/login'
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
    }
]);