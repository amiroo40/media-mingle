import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {

    const isAuthenticate = false
    return (
        <>
            {
                isAuthenticate ? (
                    <Navigate to='/' />
                ) : (
                    <>
                        <section className="flex flex-1 flex-col justify-center items-center py-10">
                            <Outlet />
                        </section>
                        <img
                            src="/assets/images/side-img.svg"
                            alt="logo"
                            className="hidden xl:block h-screen bg-no-repeat object-cover w-1/2"
                        />
                    </>
                )
            }
        </>
    )
}
export default AuthLayout
