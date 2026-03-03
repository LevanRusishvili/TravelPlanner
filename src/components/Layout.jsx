
import Header from "./Header";
import "../styles/Layout.css";
const Layout = ({children}) => {
    return (
        <div className="app-container">
            <Header/>
            <main className="main-content">{children}</main>
        </div>
    )
}

export default Layout;