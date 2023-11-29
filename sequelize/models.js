// import { DataTypes } from 'sequelize';
const { DataTypes } = require("sequelize");
// import { sequelize } from '../sequelize';
const { sequelize } = require("@/sequelize/sequelize");

// Define the 'Comic' model
const Comics = sequelize.define(
  "comics",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    synonyms: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover_img: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    latest_chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    link_chapter: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    genres: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    anilist_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Comics",
    timestamps: false,
  }
);

// Define the 'Scrap' model
const Scraps = sequelize.define(
  "scraps",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    latest_chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mainId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    link_chapter: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    images: {
      type: DataTypes.TEXT,
    },
    cover_img: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Scraps",
    timestamps : false
  }
);

// Define the foreign key relationship
Scraps.belongsTo(Comics, {
  foreignKey: "mainId",
});
Comics.hasMany(Scraps, {
  foreignKey: "mainId"
})

module.exports = { Comics, Scraps };