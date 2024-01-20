import {ApiServer} from "../../types/ApiServer";
import {Link} from "react-router-dom";

interface ServerLinkProps {
    server: ApiServer
}

const ServerLink: React.FC<ServerLinkProps> = ({ server}) => {
    return (
        <Link to={`/servers/${server.id}`}>
            {server.name}
        </Link>
    )
}

export default ServerLink;
