// Methods to be executed on routes

const Shadow = require("../models/model"); //Shadow is imported from model
const bcrypt = require("bcrypt");

// ========================= POST API ========================= {1}

const createData = async (req, res) => {
  const { name, email, password, gender } = req.body;

  const hashPassword = await bcrypt.hash(password.toString(), 10); //conform password and validation   // Store hash in the database
  console.log("hashPassword", hashPassword);

  try {
    await new Shadow({
      name,
      email,
      password: hashPassword,
      gender,
    }).save();

    res
      .status(200)
      .send({ status: 200, data: { name, email, password, gender } });
  } catch (error_post) {
    res.status(500).send(error_post);
  }
  console.log("name, email, password, gender ", name, email, password, gender);
};

// ========================= GET API ========================= {2}

const readData = async (req, res) => {
  try {
    const getData = await Shadow.find(req.query);
    res.status(200).send({ getData });
  } catch (error_get) {
    res.status(500).send(error_get);
    console.log("here", error_get);
  }
};

// ========================= GET -- id API ========================= {3}

const readingData = async (req, res) => {
  try {
    const geteuidData = await Shadow.findById(req.params.id);
    if (!geteuidData) {
      return res.status(404);
    }
    res.status(200).send({ geteuidData: geteuidData });
  } catch (error_geteuid) {
    res.status(500).send(error_geteuid);
  }
};

//++++====-------------------- 2nd way to Connect --------------------====++++
// const readingData = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const geteuidData = await Shadow.findById(id);
//     if (!geteuidData) {
//       return res.status(404);
//     }
//     res.status(200).send({ geteuidData });
//   } catch (error_geteuid) {
//     res.status(500).send(error_geteuid);
//   }
// };

// ========================= PUT API ========================= {4}

const updatedData = async (req, res) => {
  try {
    const update = await Shadow.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!update) {
      return res.status(404).send();
    }
    res.status(200).send(update);
    console.log("The data is update Successfully");
  } catch (error_put) {
    res.status(500).send(error_put);
  }
};

// ========================= DELETE API ========================= {5}

const deletesData = async (req, res) => {
  try {
    const deLete = await Shadow.findByIdAndDelete(req.params.id);
    if (!deLete) {
      return res.status(404).send();
    }
    res.status(200).send(deLete);
    console.log(" The data is Delete Successfully");
  } catch (error_delete) {
    res.status(500).send(error_delete);
  }
  // res.send("Hello,Shadow");
};

// ========================= Upload - Single_Image API ========================= {6}

// Single file
const uploadSingleData = async (req, res) => {
  try {
    // await Shadow.single("file");
    // console.log(req.file);
    res.send("Single file");
    console.log("Single Data");
  } catch (error) {
    res.status(500).send(error);
  }
};

// ========================= Upload - Multiple_Image API ========================= {7}

//Multiple files
const uploadMultipleData = (req, res) => {
  try {
    res.send("Multiple Files");
    console.log(" Multiple Data ");
  } catch (error) {
    res.status(500).send(error);
  }
};

// ========================= Pagination API ========================= {8}

const paginationData = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Shadow.find()
      .limit(limit * 2)
      .skip((page - 1) * limit);
    res.status(200).json({ total: products.length, products });
    console.log(" pagination is complete");
  } catch (error) {
    res.status(500).send(error);
  }
};

// ========================= METHOD30 API it's for understand first layout =========================
// const method30 = (req, res) => {
//   try {
//   } catch (error_put) {
//     res.status(500).send(error_get);
//   }
//   res.send("Hello Shadow");
// };

// Export of all methods as object
module.exports = {
  createData,
  readData,
  readingData,
  updatedData,
  deletesData,
  uploadSingleData,
  uploadMultipleData,
  paginationData,
  // method30,
};
