const { Configuration, OpenAIApi } = require('openai');
const ChatMessage = require('../models/ChatMessage');

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// @desc    Send message to AI and get response
// @route   POST /api/chat/message
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log('request user id --->' , message , req.user._id )

    // Save user message
    const userMessage = await ChatMessage.create({
      userId: req.user._id,
      message,
      isFromUser: true,
    });

    // Get AI response
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant specializing in asset management and financial advice."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const aiResponse = completion.data.choices[0].message.content;

    // Save AI response
    const aiMessage = await ChatMessage.create({
      userId: req.user._id,
      message: aiResponse,
      isFromUser: false,
    });

    res.json({
      userMessage,
      aiMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
exports.getChatHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await ChatMessage.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ChatMessage.countDocuments({ userId: req.user._id });

    res.json({
      messages,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMessages: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 