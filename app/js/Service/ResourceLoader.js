const fs = require('fs');
const path = require('path');

export default class ResourceLoader {
    constructor() {

    }

    /**
     * Get full path for a file
     *
     * @param filePath String Path to file, relative to the resources directory
     * @return String full path to file
     */
    pathTo(filePath) {
        return path.join('..', '..', 'resources', filePath);
    }

    /**
     * Load a text resource file, asynchronously.
     *
     * @param path String. Relative to the `resources` directory
     * @return {Promise} With file's contents as the resolution parameter
     */
    loadText(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.pathTo(filePath), 'utf8', (error, fileData) => {
                if (error) {
                    return reject(error);
                }
                return resolve(fileData);
            });
        });
    }

    /**
     * Load a text resource file
     *
     * @param path String. Relative to the `resources` directory
     * @return resource file's contents as a string
     */
    loadTextSync(filePath) {
        return fs.readFileSync(this.pathTo(filePath), 'utf8');
    }
}
