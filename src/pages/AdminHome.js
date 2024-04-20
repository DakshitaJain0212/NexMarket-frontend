import AdminProductList from "../features/admin/AdminProductList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";


function AdminHome() {
    return ( 
        <>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
        <Footer></Footer>
        </>
     );
}

export default AdminHome;