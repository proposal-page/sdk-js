const ApiWrapper = require('api-wrapper');
const Promise = require('bluebird');

class Client {
    constructor(apiUrl = null) {
        if (! apiUrl) {
            this._apiUrl = 'https://api.proposalpage.com';
        }  else {
            this._apiUrl = apiUrl;
        }
    }

    _wrapper() {
        const wrapper = ApiWrapper.create({
            root: this._apiUrl,
            parseJSON: true,
            get: {
                authMe: '/accounts/auth/me',
                listTemplates: '/projects/templates',
                listProjects: '/projects',
                listProject: '/projects/${projectId}',
                generateProjectCover: '/projects/${projectId}/screenshot',
                listBlocks: '/projects/${projectId}/blocks',
                listBlock: '/projects/${projectId}/blocks/${blockId}',
                listRows: '/projects/${projectId}/blocks/${blockId}/rows',
                listRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}',
                listColumns: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns',
                listColumn: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}',
                listContents: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents',
                listContent: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents/${contentId}',
            },
            post: {
                authenticate: {
                    pathPattern: '/accounts/auth/token',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
                createProject: {
                    pathPattern: '/projects',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
                createProjectFromTemplate: {
                    pathPattern: '/projects/${templateId}/copy',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
                cloneProject: '/projects/${projectId}/clone',
                setProjectPassword: '/projects/${projectId}/password',
                checkProjectPassword: '/projects/${projectId}/password-check',
                publishProject: '/projects/${projectId}/publish',
                secureProject: '/projects/${projectId}/secure',
                createBlock: {
                    pathPattern: '/projects/${projectId}/blocks',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
                moveBlockForward: '/projects/${projectId}/blocks/${blockId}/forward',
                moveBlockBackward: '/projects/${projectId}/blocks/${blockId}/backward',
                cloneBlock: '/projects/${projectId}/blocks/${blockId}/clone/${position}',
                createRow: {
                    pathPattern: '/projects/${projectId}/blocks/${blockId}/rows',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
                cloneRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/clone',
                createColumn: {
                    pathPattern: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
                createContent: {
                    pathPattern: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                },
            },
            put: {
                updateProject: '/projects/${projectId}',
                viewProjectAndNotify: '/projects/${projectId}/view-and-notify',
                updateBlock: '/projects/${projectId}/blocks/${blockId}',
                updateRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}',
                updateColumn: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}',
                updateContent: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents/${contentId}',
            },
            delete: {
                deleteProject: '/projects/${projectId}',
                deleteBlock: '/projects/${projectId}/blocks/${blockId}',
                deleteRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}',
                deleteColumn: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}',
                deleteContent: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents/${contentId}',
            },
            requestDefaults: {
                headers: {
                    'Authorization': `Bearer ${this._token}`,
                    'Content-Type': 'application/json'
                }
            }
        });

        return Promise.promisifyAll(wrapper);
    }

    // Auth
    authenticate(params) {
        return this._wrapper().authenticateAsync({}, JSON.stringify(params), null);
    }

    authMe() {
        return this._wrapper().authMeAsync({}, null);
    }

    // Templates
    listTemplates() {
        return this._wrapper().listTemplatesAsync({}, null);
    }

    // Projects
    createProject(params) {
        return this._wrapper().createProjectAsync({}, JSON.stringify(params), null);
    }

    createProjectFromTemplate(templateId) {
        return this._wrapper().createProjectFromTemplateAsync({ templateId }, null, null);
    }

    listProjects() {
        return this._wrapper().listProjectsAsync({}, null);
    }

    listProject(projectId) {
        return this._wrapper().listProjectAsync({ projectId }, null);
    }

    updateProject(projectId, params) {
        return this._wrapper().updateProjectAsync({ projectId }, JSON.stringify(params), null);
    }

    deleteProject(projectId) {
        return this._wrapper().deleteProjectAsync({ projectId }, null)
    }

    cloneProject(projectId) {
        return this._wrapper().cloneProjectAsync({ projectId}, null, null);
    }

    setProjectPassword(projectId, password) {
        return this._wrapper().setProjectPasswordAsync({ projectId }, JSON.stringify({ password }), null);
    }

    checkProjectPassword(projectId, password) {
        return this._wrapper().checkProjectPasswordAsync({ projectId }, JSON.stringify({ password }), null);
    }

    publishProject(projectId) {
        return this._wrapper().publishProjectAsync({ projectId }, null, null);
    }

    secureProject(projectId) {
        return this._wrapper().secureProjectAsync({ projectId }, null, null);
    }

    generateProjectCover(projectId) {
        return this._wrapper().generateProjectCoverAsync({ projectId }, null);
    }

    viewProjectAndNotify(projectId) {
        return this._wrapper().viewProjectAndNotifyAsync({ projectId }, null, null);
    }

    // Blocks
    createBlock(projectId, params) {
        return this._wrapper().createBlockAsync({ projectId }, JSON.stringify(params), null);
    }

    listBlocks(projectId) {
        return this._wrapper().listBlocksAsync({ projectId }, null);
    }

    listBlock(projectId, blockId) {
        return this._wrapper().listBlockAsync({ projectId, blockId }, null);
    }

    updateBlock(projectId, blockId, params) {
        return this._wrapper().updateBlockAsync({ projectId, blockId }, JSON.stringify(params), null);
    }

    deleteBlock(projectId, blockId) {
        return this._wrapper().deleteBlockAsync({ projectId, blockId }, null);
    }

    moveBlockForward(projectId, blockId) {
        return this._wrapper().moveBlockForwardAsync({ projectId, blockId }, null, null);
    }

    moveBlockBackward(projectId, blockId) {
        return this._wrapper().moveBlockBackwardAsync({ projectId, blockId }, null, null);
    }

    cloneBlock(projectId, blockId, position = '') {
        return this._wrapper().cloneBlockAsync({ projectId, blockId, position }, null, null);
    }

    // Rows
    createRow(projectId, blockId, params) {
        return this._wrapper().createRowAsync({ projectId, blockId }, JSON.stringify(params), null);
    }

    listRows(projectId, blockId) {
        return this._wrapper().listRowsAsync({ projectId, blockId }, null);
    }

    listRow(projectId, blockId, rowId) {
        return this._wrapper().listRowAsync({ projectId, blockId, rowId }, null);
    }

    updateRow(projectId, blockId, rowId, params) {
        return this._wrapper().updateRowAsync({ projectId, blockId, rowId }, JSON.stringify(params), null);
    }

    deleteRow(projectId, blockId, rowId) {
        return this._wrapper().deleteRowAsync({ projectId, blockId, rowId }, null);
    }

    cloneRow(projectId, blockId, rowId, position = '') {
        return this._wrapper().cloneRowAsync({ projectId, blockId, rowId, position }, null, null);
    }

    // Columns
    createColumn(projectId, blockId, rowId, params) {
        return this._wrapper().createColumnAsync({ projectId, blockId, rowId }, JSON.stringify(params), null);
    }

    listColumns(projectId, blockId, rowId) {
        return this._wrapper().listColumnsAsync({ projectId, blockId, rowId }, null);
    }

    listColumn(projectId, blockId, rowId, columnId) {
        return this._wrapper().listColumnAsync({ projectId, blockId, rowId, columnId }, null)
    }

    updateColumn(projectId, blockId, rowId, columnId, params) {
        return this._wrapper().updateColumnAsync({ projectId, blockId, rowId, columnId }, JSON.stringify(params), null);
    }

    deleteColumn(projectId, blockId, rowId, columnId) {
        return this._wrapper().deleteColumnAsync({ projectId, blockId, rowId, columnId }, null);
    }

    // Contents
    createContent(projectId, blockId, rowId, columnId, params) {
        return this._wrapper().createContentAsync({ projectId, blockId, rowId, columnId }, JSON.stringify(params), null);
    }

    listContents(projectId, blockId, rowId, columnId) {
        return this._wrapper().listContentsAsync({ projectId, blockId, rowId, columnId }, null);
    }

    listContent(projectId, blockId, rowId, columnId, contentId) {
        return this._wrapper().listContentAsync({ projectId, blockId, rowId, columnId, contentId }, null);
    }

    updateContent(projectId, blockId, rowId, columnId, contentId, params) {
        return this._wrapper().updateContentAsync({ projectId, blockId, rowId, columnId, contentId }, JSON.stringify(params), null);
    }

    deleteContent(projectId, blockId, rowId, columnId, contentId) {
        return this._wrapper().deleteContentAsync({ projectId, blockId, rowId, columnId, contentId }, null);
    }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }

    get apiUrl() {
        return this._apiUrl;
    }

    set apiUrl(value) {
        this._apiUrl = value;
    }
}

module.exports = Client;
