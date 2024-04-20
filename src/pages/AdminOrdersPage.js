import AdminOrders from "../features/admin/AdminOrders";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

function AdminOrdersPage() {
    return ( 
        <div>
            <Navbar>
                <AdminOrders>
                    
                </AdminOrders>
            </Navbar>
            <Footer></Footer>
        </div>
     );
}

export default AdminOrdersPage;