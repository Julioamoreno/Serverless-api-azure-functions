const { MongoClient } = require('mongodb');
require('dotenv').config();

const config = {
	url: process.env.MONGO_URL,
};

module.exports = () =>
	new Promise((resolve, reject) => {
		MongoClient.connect(
			config.url,
			{ useNewUrlParser: true },
			(err, mongoConnection) =>
				err
					? reject(err)
					: resolve({
							client: mongoConnection.db(config.dbName),
							closeConnectionFn: () =>
								setTimeout(() => {
									mongoConnection.close();
								}, 1000),
							mongoConnection,
					  })
		);
	});
