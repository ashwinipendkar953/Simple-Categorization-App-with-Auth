const { faker } = require("@faker-js/faker");
const generateCategories = () =>
  Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.department(),
  }));
module.exports = generateCategories;
