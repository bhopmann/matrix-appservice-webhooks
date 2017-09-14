var util = require("../utils");
var LogService = require("../LogService");

class SlackImgUploader {

    /**
     * Uploads images from Slack attachments
     * @param {WebhookBridge} bridge the WebhookBridge bridge
     */
    constructor(bridge) {
        this._bridge = bridge;
    }

    uploadImages(attachment) {
        var promises = [];
        var attrs = ['author_icon', 'footer_icon', 'image_url']
        attrs.forEach(function (key) {
            var imageUrl = attachment[key]
            if (imageUrl)
                var uploadPromise = Promise.resolve(imageUrl);
                uploadPromise = util.uploadContentFromUrl(this._bridge, imageUrl, this._bridge.getBotIntent());
                promises.push(uploadPromise.then(mxcUrl => { attachment[key] = mxcUrl }));
        }, this)
        return Promise.all(promises);
    }
}

module.exports = SlackImgUploader;
