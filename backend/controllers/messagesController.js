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

export const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const found = await Message.findByPk(id);

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    found.message = message;
    await found.save();

    res.status(200).json({
      success: true,
      data: found,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const found = await Message.findByPk(id);

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await found.destroy();

    res.status(200).json({
      success: true,
      data: { id: Number(id) },
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};