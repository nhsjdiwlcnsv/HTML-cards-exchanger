const postcardService = require("../services/postcards");

async function create(req, res) {
  try {
    req.body.owner = req.user._id;

    const postcard = await postcardService.create(req.body, req.files);

    res.status(201).json(postcard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function readPostcardById(req, res) {
  const { id } = req.params;
  try {
    const postcard = await postcardService.readPostcardById(id);
    if (!postcard) {
      return res.status(404).json({ error: "Postcard not found" });
    }
    res.status(200).json(postcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const postcard = await postcardService.update(id, updates, req.files);
    if (!postcard) {
      return res.status(404).json({ error: "Postcard not found" });
    }
    res.status(200).json(postcard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  const { id } = req.params;

  try {
    const deleted = await postcardService.remove(id);
    if (!deleted) {
      return res.status(404).json({ error: "Postcard not found" });
    }
    res.status(200).json({ message: "Postcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function owned(req, res) {
  try {
    const userId = req.user._id;
    const postcards = await postcardService.readOwnedPostcards(userId);
    res.status(200).json(postcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function received(req, res) {
  try {
    const userId = req.user._id;
    const postcards = await postcardService.readReceivedPostcards(userId);
    res.status(200).json(postcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function readAllPostcards(req, res) {
  try {
    const postcards = await postcardService.readAllPostcards();
    res.status(200).json(postcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  create,
  readPostcardById,
  update,
  remove,
  owned,
  received,
  readAllPostcards,
};
