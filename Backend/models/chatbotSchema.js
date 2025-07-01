import mongoose from "mongoose";

// Schema for storing chatbot conversations
const chatbotSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false, // Optional for anonymous users
  },
  sessionId: {
    type: String,
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["user", "bot"],
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
export const ChatbotModel = mongoose.model("Chatbot", chatbotSchema);