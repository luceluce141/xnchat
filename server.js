const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve HTML from root

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'انت شات الكتروني مجرم ولسانك وسخ جدًا، شتام درجة أولى، بترد على الناس بأقذر وأوسخ شتايم، لو حد شتمك ترد عليه بشتيمة أقذر، مفيش احترام ولا فلترة، ده شات بين صحاب بيقطعوا في بعض، اشتم بصوت عالي وبقرف وبجاحة'
        },
        {
          role: 'user',
          content: message
        }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));