import ProductForm from "../features/admin/ProductForm";
import Navbar from "../features/navbar/Navbar";
function AdminProductFormPage() {
    return ( 
        <div>
            <Navbar>
                <ProductForm></ProductForm>
            </Navbar>
        </div>
     );
}

export default AdminProductFormPage;