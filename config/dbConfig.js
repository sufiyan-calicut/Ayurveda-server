import mongoose from 'mongoose';

const options = {
  connectTimeoutMS: 30000, // Time in ms to wait for a connection
  serverSelectionTimeoutMS: 30000 // Time in ms to wait for server selection if there have multiple mongodb servers
};

// const connection = (retryCount = 0) => {
//   console.log('Mongodb is Connecting...');

//   mongoose
//     .connect(process.env.DB_URI, options)
//     .then(() => {
//       console.log('MongoDB is connected');
//     })
//     .catch(err => {
//       console.error(`MongoDB connection unsuccessful. ERROR: ${err.message}`);

//       // Limit the number of retries to avoid endless loops
//       if (retryCount < 10) {
//         console.log(`Retrying after 1 second... (Attempt ${retryCount + 1})`);
//         setTimeout(() => connection(retryCount + 1), 1000);
//       } else {
//         console.error(
//           'Max retry attempts reached. Could not connect to MongoDB.'
//         );
//       }
//     });
// };

const connection = () => {
  mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log(`mongodb is connected`);
  })
  .catch(err => {
    console.error('failed to connect mongodb',err);
  });
}

export default connection;
