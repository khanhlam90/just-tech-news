//import the elements that we'll need to build the Post model
const { Model, DataTypes } = require('sequelize'); // Model and Datatypes we'll use from the sequelize package.
const sequelize = require('../config/connection'); //the connection to MySQL we stored in the connection.js file

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
    // first parameters - define Post schema
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        post_url: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isURL: true
          }
        },
        // this column determines who posted the news article    
        user_id: {
            type: DataTypes.INTEGER,
            //references property establish the relationship between this post and the user by creating a reference to the User model
            references: { 
                model: 'user',
                //specifically to the id column that is defined by the key property, which is the primary key
                key: 'id' 
            }
        }
    },
    
    // second parameter - we configure the metadata, including the naming conventions.
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

// export expression to make the Post model accessible to other parts of the application
module.exports = Post;