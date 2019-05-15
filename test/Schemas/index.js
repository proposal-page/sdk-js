const fs = require('fs');
const path = process.cwd();

const projectSchema = fs.readFileSync(path + "/test/Schemas/Project.txt").toString();
const blockSchema = fs.readFileSync(path + "/test/Schemas/Block.txt").toString();
const rowSchema = fs.readFileSync(path + "/test/Schemas/Row.txt").toString();
const columnSchema = fs.readFileSync(path + "/test/Schemas/Column.txt").toString();
const contentSchema = fs.readFileSync(path + "/test/Schemas/Content.txt").toString();
const paginatedProjectSchema = fs.readFileSync(path + "/test/Schemas/PaginatedProjects.txt").toString();

module.exports = {
    projectSchema,
    blockSchema,
    rowSchema,
    columnSchema,
    contentSchema,
    paginatedProjectSchema
};
