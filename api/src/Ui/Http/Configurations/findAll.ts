import * as configurationDal from "../../database/dal/configuration";
import {renderConfigurations} from "../../views/configuration";

export const findAll = async (req: any, resp: any) => {
    const configurations = await renderConfigurations(await configurationDal.getAll(), true, true);

    resp.send(configurations)
}
