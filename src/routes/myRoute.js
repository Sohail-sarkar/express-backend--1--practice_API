const { Router } = require("express");
const myController = require("../controller/myController"); // in controller Local { module } is com
const multer = require("multer");

// Initialization
const router = Router();

//Multer  //cb = call back
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     let fileType = "";
//     switch (file.mimetype) {
//       case "image/gif":
//         fileType = "gif";
//         break;
//       case "image/png":
//         fileType = "png";
//         break;
//       case "image/jpeg":
//           fileType = "jpg";
//           break;
//       default:
//         break;
//     }
//     cb(null, Date.now() + "-" + file.originalname)

//   },
// });

// ========================= 2nd way to connect multer to send images  API =========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadStorage = multer({ storage: storage });

// Requests
router.post("/post-api001", myController.createData);
router.get("/get-api002", myController.readData);
router.get("/getuid-api/:id", myController.readingData);
router.put("/put-api003/:id", myController.updatedData);
router.delete("/delete-api004/:id", myController.deletesData);

// Upload-Single image file ====*
router.post(
  "/upload_image",
  uploadStorage.single("file"), // For single image use = {( .single )}
  myController.uploadSingleData
);

// Upload - Multiple image files ====*
router.post(
  "/uploads-Multiple_image",
  uploadStorage.array("files", 10), // For Multiple image use = {( .array )}
  myController.uploadMultipleData
);

router.get("/pagination01", myController.paginationData);

// router.get("/get-api", myController.method30);  //for under stand ===========@#$

module.exports = router;
