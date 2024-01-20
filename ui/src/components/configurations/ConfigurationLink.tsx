import {Link} from "react-router-dom";
import {ApiConfiguration} from "../../types/ApiConfiguration";

interface ConfigurationLinkProps {
    configuration: ApiConfiguration
}

const ConfigurationLink: React.FC<ConfigurationLinkProps> = ({ configuration}) => {
    return (
        <Link to={`/configurations/${configuration.id}`}>
            {configuration.name}
        </Link>
    )
}

export default ConfigurationLink;
