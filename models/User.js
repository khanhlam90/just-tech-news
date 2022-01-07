const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model - This Model class is what we create our own models 
// from using the extends keyword so User inherits all of the functionality the Model class has.
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration -
// initialize the model's data and configuration, passing in two objects as arguments
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    // define the columns and data types for those columns

    // define an id column
    id: {
        type: DataTypes.INTEGER, // use the special Sequelize DataTypes object provide what type of data it is
        allowNull: false, // this is the equivalent of SQL's `NOT NULL` option
        primaryKey: true, // instruct that this is the Primary Key
        autoIncrement: true // turn on auto increment
    },
    // define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // define an email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // there cannot be any duplicate email values in this table
        validate: {
          isEmail: true // if allowNull is set to false, we can run our data through validators before creating the table data
        }
    },
    // define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4] // this means the password must be at least four characters long
        }
      }
    },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
  }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // it accepts configures certain options for the table.
    sequelize, // pass in our imported sequelize connection (the direct connection to our database
    timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
    freezeTableName: true, // don't pluralize name of database table
    underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'user' // make it so our model name stays lowercase in the database
  }
);

// export the newly created model so we can use it in other parts of the app
module.exports = User;