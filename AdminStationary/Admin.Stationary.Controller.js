const DBModelStationary = require("./Admin.Stationary.Model");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage });
// Upload data
exports.create = (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    try {
      const { productno, productname, productdescription } = req.body;
      const image = req.file.filename;

      const adminstationary = new DBModelStationary({
        productno,
        productname,
        productdescription,
        image,
      });
      await adminstationary.save();

      res.status(201).json({ message: "Stationary created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

// exports.create = async (req, res) => {
//   if (
//     !req.body.productno ||
//     !req.body.productname ||
//     !req.body.productdescription
//   ) {
//     res.status(400).send({ message: "All Fields Must Be Required!" });
//   }
//   const adminstationary = new DBModelStationary({
//     productno: req.body.productno,
//     productname: req.body.productname,
//     productdescription: req.body.productdescription,
//     productimage: req.body.productimage,
//   });

//   if (req.file) {
//     adminstationary.productimage = req.file.path;
//   }
//   await adminstationary
//     .save()
//     .then((data) => {
//       res.send({
//         message: "Stationary created successfully!!",
//         data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating Stationary",
//       });
//     });
// };

exports.getAll = async (req, res) => {
  DBModelStationary.find((err, data) => {
    res.status(200).json({
      data,
    });
  });
};

exports.getone = async (req, res) => {
  DBModelStationary.findById(req.params.id, (err, stationary) => {
    res.json({
      body: stationary,
    });
  });
};

exports.deleteSingle = async (req, res) => {
  try {
    DBModelStationary.findByIdAndRemove(req.params.id, (err, stationary) => {
      if (!stationary) {
        res.status(404).send("Stationary Not Found");
      } else {
        res.status(200).send("Stationary Deleted Successfully");
      }
    });
  } catch (err) {}
};

exports.updateSingle = async (req, res) => {
  try {
    //!
    DBModelStationary.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err, user) => {
        if (err) {
          return res.status(500).send({ error: "unsuccessful" });
        }
        res.send({ success: "success" });
      }
    );
  } catch (err) {}
};
