const mongoose = require ("mongoose");

const connect = () => {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(err => console.log(err));
  };

  
  mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
  });


// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// })

// try {
//   // Connect to the MongoDB cluster
//   mongoose.connect(
//     process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => console.log(" Mongoose is connected"),
//   );
// } catch (e) {
//   console.log("could not connect");
// }

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));


// const connect = () => {
//     if (process.env.NODE_ENV !== "production") {
//       mongoose.set("debug", true);
//     }
//     mongoose
//       // .connect("mongodb://localhost:27017/SSN",{ ignoreUndefined: true })
//       .connect(process.env.MONGO_URL,{ 
//         useNewUrlParser: true,
//         useUnifiedTopology: true}, 
//         () => console.log(" Mongoose is connected"));
//       .catch(err => console.log(err));
//   };
  
//   mongoose.connection.on("error", err => {
//     console.error("몽고디비 연결 에러", err);
//   });
  
  module.exports = connect;
  