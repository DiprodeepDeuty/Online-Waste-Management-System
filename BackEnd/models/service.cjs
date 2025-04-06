const mongoose = require('mongoose');

// Define the schema for waste items
const WasteItemSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., paper, plastic, metals
    pricePerKg: { type: Number, required: true }, // price per kg for the waste item
});

// Define the schema for user-selected waste
const UserWasteSelectionSchema = new mongoose.Schema({
    wasteItems: [
        {
            wasteItem: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteItem', required: true },
            quantityInKg: { type: Number, required: true }, // amount of waste in kg
        },
    ],
    totalPrice: { type: Number, default: 0 }, // total price for the selected waste
});

// Method to calculate the total price
UserWasteSelectionSchema.methods.calculateTotalPrice = async function () {
    let total = 0;
    for (const item of this.wasteItems) {
        const wasteItem = await mongoose.model('WasteItem').findById(item.wasteItem);
        if (wasteItem) {
            total += wasteItem.pricePerKg * item.quantityInKg;
        }
    }
    this.totalPrice = total;
    return total;
};

// Create models
const WasteItem = mongoose.model('WasteItem', WasteItemSchema);
const UserWasteSelection = mongoose.model('UserWasteSelection', UserWasteSelectionSchema);

module.exports = { WasteItem, UserWasteSelection };