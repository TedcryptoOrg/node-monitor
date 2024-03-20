import * as notificationDal from "../../database/dal/notificationChannel";

export const deleteNotificationChannel = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    await notificationDal.deleteNotificationChannel(Number(req.params.id))
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