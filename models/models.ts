import mongoose, { Model } from "mongoose";
import PostSchema from "./PostSchema";

interface IPost {
  name: string;
  prompt: string;
  image: string;
}

// const post =mongoose.model.Post || mongoose.model("Post",PostSchema);
let Post: Model<IPost>;

try {
  Post = mongoose.model("Post") as Model<IPost>;
} catch (error) {
  Post = mongoose.model<IPost>("Post", PostSchema);
}

export default Post;
