const Request = require("../models/Request");

const createRequest = async (req, res) => {
  const { name, email, topic } = req.body;
  try {
    const requestMessage = new Request({ name, email, topic });
    await requestMessage.save();
    res.status(201).json({
      success: true,
      message: "Request message sent successfully!",
      data: requestMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in sending message",
      error,
    });
  }
};

module.exports = { createRequest };
