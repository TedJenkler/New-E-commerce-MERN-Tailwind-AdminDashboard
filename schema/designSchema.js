const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    logo: {
        text: { type: String, required: true },
        mode: String,
        img: {
            mobile: String,
            tablet: String,
            desktop: String,
        }
    }
});

designSchema.statics.getSingleton = async function() {
    let design = await this.findOne();

    if (!design) {
        design = new this({
            logo: {
                text: 'Default Logo Text',
                mode: 'light',
                img: {
                    mobile: '/default_logo_mobile.png',
                    tablet: '/default_logo_tablet.png',
                    desktop: '/default_logo_desktop.png'
                }
            }
        });
        await design.save();
    }
    return design;
};

module.exports = mongoose.model('Design', designSchema);