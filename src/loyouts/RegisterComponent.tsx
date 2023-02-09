import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";

interface Props {
    children?: React.ReactNode;
}
export default function RegisterComponent({ children }: Props) {
    return (
        <div>
            <HeaderLogin />
            {children}
            <Footer />
        </div>
    );
}
