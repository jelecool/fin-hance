//Instancie les dépendances du modele
var mongoose = require('mongoose');


//Définit la structure des données pour le USER
var PositionSchema = new mongoose.Schema({
    ticker: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    vti: {
      type: Number,
      required: true
    },
    pe: {
      type: Number,
      required: true
    },
    pc: {
      type: Number,
      required: true
    },
    pb: {
      type: Number,
      required: true
    },
    ps: {
      type: Number,
      required: true
    },
    eg: {
      type: Number,
      required: true
    },
    de: {
      type: Number,
      required: true
    },
    yield: {
      type: Number,
      required: true
    },
    payout: {
      type: Number,
      required: true
    }
    
  });

  
  
  var Position = mongoose.model('Position', PositionSchema);
  module.exports = Position;