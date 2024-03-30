import {Link} from "react-router-dom";
import {User} from "../../types/User";

interface UserLinkProp {
    user: User|undefined|null
}

const UserLink: React.FC<UserLinkProp> = ({ user}) => {
    return (
        <>
            {!user && <span>None</span>}
            {user && <Link to={`/users/${user.id}`}>
                    {user.username}
                </Link>}
        </>
    )
}

export default UserLink;
