import {Link} from "react-router-dom";
import {Company} from "../../types/Company";

interface CompanyLinkProp {
    company: Company|undefined|null
}

const CompanyLink: React.FC<CompanyLinkProp> = ({ company}) => {
    return (
        <>
            {!company && <span>None</span>}
            {company && <Link to={`/companies/${company.id}`}>
                    {company.name}
                </Link>}
        </>
    )
}

export default CompanyLink;
