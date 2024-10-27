const generateCategories = require("../fakeData");

const categories = generateCategories();

const getCategoriesController = (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);

    const paginated = categories.slice(start, end);

    const totalPages = Math.ceil(categories.length / limit);

    res.json({
      categories: paginated,
      totalCategories: categories.length,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getCategoriesController;
