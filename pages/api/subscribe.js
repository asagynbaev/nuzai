import { success, error, methodNotAllowed } from "@/utils/common/network";
import connect from "@/utils/mongo/connect";

export default async function handler(req, res) {
    switch(req.method) {
        case "POST": return await POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

export async function _post({ email, locale }) {
    // Получить коллекцию, попытаться найти там такой email
    // Если есть - обновить локаль и ts
    // Если нет - добавить
    // Вернуть 200 OK

    try {
        const { db } = await connect();

        // Get a collection
        const subs = db.collection("subscriptions");

        // Try to find there that email
        const record = await subs.findOne({ email });

        const ts = new Date();
        if(record) {
            // If exists, update locale
            await subs.updateOne({ _id: record._id }, { $set: { locale, mts: ts } });
        } else {
            // If not exists, add
            await subs.insertOne({ email, locale, cts: ts });
        }

        return success();
    } catch(e) {
        console.error(e);
        return error("db_error");
    }
}

async function POST({ body }, res) {
    const result = await _post(body);

    if(result.success === 1) res.status(200).end();
    else switch(result.error) {
        default:
            res.status(500).end(result.error);
            break;
    }
}