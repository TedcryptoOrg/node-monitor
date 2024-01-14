import * as configurationDal from "../../database/dal/configuration";

export const deleteConfiguration = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        throw new Error('Missing id')
    }

    await configurationDal.deleteConfiguration(Number(req.params.id))
        .then(() => {
            resp.status(200).send()
        }).catch((err: Error) => {
            if (err.name === 'RecordNotFound') {
                resp.status(404).send({
                    message: err.message
                })
                return
            }

            resp.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Configuration."
            })
    })
}