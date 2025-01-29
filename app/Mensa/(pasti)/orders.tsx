import { TypeBooking } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";


const Orders = () => {
    const { data } = useCRUD<TypeBooking>('/booking/');
    console.log(data);
    return (
        <div>
            <h1>Orders</h1>
        </div>
    );
};

export default Orders;