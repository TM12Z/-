const sequelize = require('../db')
const {DataType, DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    named: {type: DataTypes.STRING, unique: false},
    description: {type: DataTypes.STRING(999)},
    ref_userpic: {type: DataTypes.STRING(999), unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    admin: {type: DataTypes.BOOLEAN, default:false},
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

const Photos = sequelize.define('photos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ref: {type: DataTypes.STRING(999), unique: true},
    named: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING(999)},
}, {
    timestamps: false,
    createdAt: true,
    updatedAt: false
});

const Albums = sequelize.define('albums', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ref: {type: DataTypes.STRING(999), unique: true},
    named: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING(999)},
}, {
    timestamps: false,
    createdAt: true,
    updatedAt: false
});

const Tags = sequelize.define('tags', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    named: {type: DataTypes.STRING, unique: true},
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

const TagsInAlbums = sequelize.define('tagsInAlbums', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

const TagsInPhotos = sequelize.define('tagsInPhotos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});


Users.hasMany(Albums)
Albums.belongsTo(Users)

Users.hasMany(Photos)
Photos.belongsTo(Users)

Albums.hasMany(Photos)
Photos.belongsTo(Albums)

Photos.hasMany(TagsInPhotos)
TagsInPhotos.belongsTo(Photos)

Tags.hasMany(TagsInPhotos)
TagsInPhotos.belongsTo(Tags)

Albums.hasMany(TagsInAlbums)
TagsInAlbums.belongsTo(Albums)

Tags.hasMany(TagsInAlbums)
TagsInAlbums.belongsTo(Tags)

module.exports = {
    Users,
    Photos,
    Albums,
    Tags,
    TagsInPhotos,
    TagsInAlbums
}