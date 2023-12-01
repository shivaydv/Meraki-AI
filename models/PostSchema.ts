import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
});

export default PostSchema;
