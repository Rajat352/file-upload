const File = require("../models/file");

module.exports.saveFile = async (req, res) => {
  try {
    const { name, size, createdAt } = req.body;

    const newFile = new File({
      file_name: name,
      file_size: size,
      created_at: createdAt,
    });
    await newFile.save();

    res
      .status(200)
      .json({ message: "File Saved Successfully", status: "success" });
  } catch (err) {
    res.json({ message: err, status: "error" });
  }
};

module.exports.getSavedFiles = async (req, res) => {
  try {
    const data = await File.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "An error occurred!", error: err });
  }
};
