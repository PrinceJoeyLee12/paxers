const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaImageUploader = new Schema({
  imageUrl: String,
});

const ImageUploader = mongoose.model('images', SchemaImageUploader);
module.exports = ImageUploader;
