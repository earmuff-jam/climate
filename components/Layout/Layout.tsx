import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                {children}
            </div>
            <Footer />
        </div>
    )
};

export default Layout;
