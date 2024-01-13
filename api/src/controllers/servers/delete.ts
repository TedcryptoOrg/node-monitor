import * as serverDal from "../../database/dal/server";

export const deleteServer = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    await serverDal.deleteServer(Number(req.params.id))
        .then(() => resp.status(200).send())
        .catch((err: Error) => {
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