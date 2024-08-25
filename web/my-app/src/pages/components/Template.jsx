import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Template(props) {
    return (
        <div>
            <div className="wrapper">
                <Navbar />
                <Sidebar />
                <div className="content-wrapper pt-3">
                    <section className="content">
                        {props.children}
                    </section>
                </div>
            </div>
        </div>


    )
}

export default Template;