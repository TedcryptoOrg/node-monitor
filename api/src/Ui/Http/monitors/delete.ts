import * as monitorDal from "../../database/dal/monitor";

export const deleteMonitor = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    await monitorDal.deleteMonitor(Number(req.params.id))
        .then(() => {
            resp.status(200).send()
        }).catch((err: Error) => {
            if (err.name === 'RecordNotFound') {
                resp.status(404).send({
                    message: err.message
                })
                throw new Error(err.message)
            }

            resp.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Configuration."
            })
    })
}