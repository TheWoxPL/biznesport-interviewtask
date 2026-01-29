import Message from "../models/message.js";

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll();

    res.status(200).json({
      success: true,
      data: messages,
      count: messages.length,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};