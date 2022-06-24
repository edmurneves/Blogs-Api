const CategorySchema = (sequelize, DataTypes) => {
    CategoryTable = sequelize.define('Category', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        name: DataTypes.STRING,
    });

    return CategoryTable;
}

module.exports = CategorySchema;