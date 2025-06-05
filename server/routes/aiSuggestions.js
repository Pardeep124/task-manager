
const express = require('express');
const router = express.Router();
const { getTaskAISuggestions } = require('../utils/ai');

// router.post('/ai-suggest', (req, res) => {
//     const { title, description } = req.body;

//     const text = `${title} ${description}`.toLowerCase();

//     let priority = 'Low';
//     if (text.includes('urgent') || text.includes('asap') || text.includes('immediately')) {
//         priority = 'High';
//     } else if (text.includes('soon') || text.includes('important')) {
//         priority = 'Medium';
//     }

//     const tags = [];
//     if (text.includes('report')) tags.push('work');
//     if (text.includes('meeting') || text.includes('call')) tags.push('communication');
//     if (text.includes('home') || text.includes('family')) tags.push('personal');
//     if (text.includes('finance') || text.includes('invoice')) tags.push('finance');
//     if (text.includes('presentation') || text.includes('deck')) tags.push('presentation');

//     if (tags.length === 0) tags.push('general');

//     res.json({
//         priority,
//         tags,
//     });
// });


router.post("/ai-suggest", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    const aiSuggestions = await getTaskAISuggestions(title, description);
    res.json(aiSuggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get AI suggestions" });
  }
});

module.exports = router;
