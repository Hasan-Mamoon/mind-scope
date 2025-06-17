import { Schema,model } from "mongoose";

const journalSchema = new Schema({
  entry: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ['😄', '😐', '😔', '😠', '😰'],
    default: '😐',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }

  }
  );
export default model('Journal', journalSchema);