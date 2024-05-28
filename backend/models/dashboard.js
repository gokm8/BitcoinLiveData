import db from "./dbConnection.js";

export default {
    //

    insertDataIntoTable: async (data) => {
        const sql = `INSERT INTO btc_graph_data 
            (symbol, last, last_btc, lowest, highest, date, daily_change_percentage,created_at) 
            VALUES ('${data.symbol}', '${data.last}', '${data.last_btc}', '${data.lowest}','${data.highest}', '${data.date}','${data.daily_change_percentage}','${data.created_at}')`;
        const rows = await db.query(sql);
        return rows;
    },

    //
    getCryptoData: async () => {
        const sql = `select * from btc_graph_data order by id desc limit 50 offset 0;`;
        const rows = await db.query(sql);
        return rows;
    },
};
