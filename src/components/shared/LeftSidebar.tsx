import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftSidebar = () => {

    const { pathname } = useLocation()
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()
    const { user } = useUserContext()

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])

    return (
        <nav className='leftsidebar'>
            <div className="flex flex-col gap-11">
                <Link to='/' className='flex gap-3 items-center' >
                    <img
                        src="/assets/images/logo.png"
                        alt="logo"
                        width={170}
                        height={360}
                    />
                </Link>
                <Link className='flex gap-3 items-center' to={`/profile/${user.id}`}>
                    <img
                        src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                        alt="profile"
                        className='w-14 h-14 rounded-full'
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">
                            {user.name}
                        </p>
                        <p className="small-regular text-light-3">
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route
                        return (
                            <li
                                className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}
                                key={link.label}>
                                <NavLink
                                    to={link.route}
                                    className="flex items-center gap-4 p-4"
                                >
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <Button variant='ghost' className='shad-button_ghost' onClick={() => signOut()}>
                <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar