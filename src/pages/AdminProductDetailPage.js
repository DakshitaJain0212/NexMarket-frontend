import Navbar from "../features/navbar/Navbar";
import AdminProductDetail from "../features/admin/AdminProductDetail";

function AdminProductDetailPage() {
    return ( 
        <div>
            <Navbar>
                <AdminProductDetail></AdminProductDetail>
            </Navbar>
        </div>
     );
}

export default AdminProductDetailPage;