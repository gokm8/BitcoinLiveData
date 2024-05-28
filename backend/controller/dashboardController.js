import dashboard from "../models/dashboard.js";
import axios from "axios";
import moment from "moment";

export default {
    // Fetch crypto live data
    fetchCryptoLiveData: async (req, res) => {
        try {
            const response = await axios.get(process.env.CRYPTO_API_URL, {
                headers: {
                    Authorization: process.env.CRYPTO_API_URL_TOKEN,
                },
            });

            // If response status === 200, insert data into the database

            if (response.status === 200) {
                const {
                    symbol,
                    last,
                    last_btc,
                    lowest,
                    highest,
                    date,
                    daily_change_percentage,
                } = response.data.symbols[0];
                const dataObj = {
                    symbol: symbol,
                    last: last,
                    last_btc: last_btc,
                    lowest: lowest,
                    highest: highest,
                    date: date,
                    daily_change_percentage: daily_change_percentage,
                    created_at: moment().unix(),
                };
                await dashboard.insertDataIntoTable(dataObj);
            }

            return res.status(200).send({
                status: true,
                message: "Bitcoin live data fetched & updated successfully",
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error,
            });
        }
    },

    //
    dashboardGraphData: async (req, res) => {
        try {
            const responseData = await dashboard.getCryptoData();

            return res.status(200).send({
                status: true,
                data: responseData,
                message: "Dashboard Stats fetched successfully",
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error,
            });
        }
    },
};
