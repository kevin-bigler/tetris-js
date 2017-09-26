const fs = require('fs');
const path = require('path');

export default class ResourceLoader {
    constructor() {

    }

    /**
     * Load a text resource file
     * @param path String. Relative to the `resources` directory
     * @return resource file's contents as a string
     */
    loadText(path) {
        return fs.readFileSync(path.join('..', '..', 'resources', path), 'utf8');
    }
}