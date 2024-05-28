/*----------
| DB Schema |
----------*/

-- Users Table Schema

CREATE TABLE `bitcoin_db`.`btc_graph_data` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol TEXT,
    last TEXT,
    last_btc TEXT,
    lowest TEXT,
    highest TEXT,
    date DATETIME,
    daily_change_percentage DECIMAL(10, 10),
    created_at TEXT
);


