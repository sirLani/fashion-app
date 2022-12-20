const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true
      },
      email: {
         type: String,
         trim: true,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true,
         min: 6,
         max: 64
      },
      secret: {
         type: String,
         required: true
      },
      username: {
         type: String,
         unique: true,
         required: true
      },
      state: {
         type: String,
         required: true
      },
      street: {
         type: String,
         required: true
      },
      postcode: {
         type: String
      },
      about: {
         type: String
      },
      image: {
         url: String,
         public_id: String
      }
   },
   { timestamps: true }
);

export default mongoose.model('User', userSchema);
