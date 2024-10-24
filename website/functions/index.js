/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// Count books function remains the same
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// exports.displayBooks = onRequest((req, res) => {
//   cors(req, res, async () => {
//     try {
//       const booksCollection = admin.firestore().collection("books");
//       const snapshot = await booksCollection.get();
//       const books = [];

//       snapshot.forEach((doc) => {
//         books.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });

//       res.status(200).send(books);
//     } catch (error) {
//       console.error("Error displaying books:", error.message);
//       res.status(500).send("Error displaying books");
//     }
//   });
// });

// Count reviews function
exports.countReviews = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const reviewsCollection = admin.firestore().collection("reviews");
      // Change "reviews" to your actual collection name
      const snapshot = await reviewsCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting reviews:", error.message);
      res.status(500).send("Error counting reviews");
    }
  });
});

// exports.capitalizeBookData = functions.firestore
//     .document("books/{bookId}")
//     .onCreate(async (snap, context) => {
//       const newBook = snap.data();
//       const capitalizedName = newBook.name.toUpperCase();

//       try {
//         await snap.ref.update({
//           name: capitalizedName,
//           isbn: newBook.isbn,
//         });
//         console.log("Book name successfully capitalized!");
//       } catch (error) {
//         console.error("Error capitalizing book name: ", error);
//       }
//     });
