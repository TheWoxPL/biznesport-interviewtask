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

export const createMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    const newMessage = await Message.create({ message });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};