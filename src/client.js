const ApiWrapper = require('api-wrapper');
const Promise = require('bluebird');

class Client {
    constructor(apiUrl = null) {
        if (!apiUrl) {
            this._apiUrl = 'https://api.proposalpage.com';
        } else {
            this._apiUrl = apiUrl;
        }
    }

    _wrapper() {
        const wrapper = ApiWrapper.create({
            root: this._apiUrl,
            parseJSON: true,
            get: {
                authMe: '/accounts/auth/me',
                listTemplates: '/projects/templates/?page|itemsPerPage',
                listProjects: '/projects/?page|itemsPerPage|title',
                listProject: '/projects/${projectId}',
                generateProjectCover: '/projects/${projectId}/screenshot',
                listBlocks: '/projects/${projectId}/blocks',
                listBlock: '/projects/${projectId}/blocks/${blockId}',
                listRows: '/projects/${projectId}/blocks/${blockId}/rows',
                listRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}',
                listColumns: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns',
                listColumn:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}',
                listContents:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents',
                listContent:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents/${contentId}',
            },
            post: {
                authenticate: {
                    pathPattern: '/accounts/auth/token',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                },
                createProject: {
                    pathPattern: '/projects',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                },
                createProjectFromTemplate: {
                    pathPattern: '/projects/${templateId}/copy',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
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
                            'Content-Type': 'application/json',
                        },
                    },
                },
                moveBlockForward: '/projects/${projectId}/blocks/${blockId}/forward',
                moveBlockBackward: '/projects/${projectId}/blocks/${blockId}/backward',
                cloneBlock: '/projects/${projectId}/blocks/${blockId}/clone/${position}',
                createRow: {
                    pathPattern: '/projects/${projectId}/blocks/${blockId}/rows',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                },
                cloneRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/clone',
                createColumn: {
                    pathPattern: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                },
                createContent: {
                    pathPattern:
                        '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents',
                    requestOptions: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                },
                acceptProject: '/projects/${projectId}/accept',
                confirmProjectAcceptance: '/projects/accept/${acceptToken}',
                revertProjectAcceptance: '/projects/revert-accept/${acceptReversionToken}'
            },
            put: {
                updateProject: '/projects/${projectId}',
                viewProjectAndNotify: '/projects/${projectId}/view-and-notify',
                updateBlock: '/projects/${projectId}/blocks/${blockId}',
                updateRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}',
                updateColumn:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}',
                updateContent:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents/${contentId}',
            },
            delete: {
                deleteProject: '/projects/${projectId}',
                deleteBlock: '/projects/${projectId}/blocks/${blockId}',
                deleteRow: '/projects/${projectId}/blocks/${blockId}/rows/${rowId}',
                deleteColumn:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}',
                deleteContent:
                    '/projects/${projectId}/blocks/${blockId}/rows/${rowId}/columns/${columnId}/contents/${contentId}',
            },
            requestDefaults: {
                headers: {
                    Authorization: `Bearer ${this._token}`,
                    'Content-Type': 'application/json',
                },
            },
        });

        return Promise.promisifyAll(wrapper);
    }

    _request(httpVerb, method, pathParams = {}, params = null) {
        if (httpVerb === 'GET' || httpVerb === 'DELETE') {
            return new Promise((resolve, reject) => {
                this._wrapper()
                    [method](pathParams, null)
                    .then(response => {
                        if (response.body) {
                            const json = JSON.parse(response.body);

                            resolve({
                                ...response,
                                json,
                            });
                        } else {
                            resolve(response);
                        }
                    })
                    .catch(error => reject(error));
            });
        } else {
            if (params) {
                params = JSON.stringify(params);
            }

            return new Promise((resolve, reject) => {
                this._wrapper()
                    [method](pathParams, params, null)
                    .then(response => {
                        if (response.body) {
                            const json = JSON.parse(response.body);

                            resolve({
                                ...response,
                                json,
                            });
                        } else {
                            resolve(response);
                        }
                    })
                    .catch(error => reject(error));
            });
        }
    }

    // Auth
    authenticate(username, password, setToken = true) {
        const client = this;

        return new Promise((resolve, reject) => {
            client
                ._wrapper()
                .authenticateAsync({}, JSON.stringify({ username, password }))
                .then(response => {
                    const json = JSON.parse(response.body);

                    if (setToken) {
                        client.token = json.token;
                    }

                    resolve({
                        ...response,
                        json,
                    });
                })
                .catch(error => reject(error));
        });
    }

    authMe() {
        return this._request('GET', 'authMeAsync');
    }

    // Templates
    listTemplates(page = 1, itemsPerPage = 6) {
        return this._request('GET', 'listTemplatesAsync', { page, itemsPerPage });
    }

    // Projects
    createProject(params) {
        return this._request('POST', 'createProjectAsync', {}, params);
    }

    createProjectFromTemplate(templateId) {
        return this._request('POST', 'createProjectFromTemplateAsync', { templateId });
    }

    listProjects(page = 1, itemsPerPage = 6, title = null) {
        const query = {
            page,
            itemsPerPage
        };

        if (title) {
            query['title'] = title;
        }

        return this._request('GET', 'listProjectsAsync', query);
    }

    listProject(projectId) {
        return this._request('GET', 'listProjectAsync', { projectId });
    }

    updateProject(projectId, params) {
        return this._request('PUT', 'updateProjectAsync', { projectId }, params);
    }

    deleteProject(projectId) {
        return this._request('DELETE', 'deleteProjectAsync', { projectId });
    }

    cloneProject(projectId) {
        return this._request('POST', 'cloneProjectAsync', { projectId });
    }

    setProjectPassword(projectId, password) {
        return this._request('POST', 'setProjectPasswordAsync', { projectId }, { password });
    }

    checkProjectPassword(projectId, password) {
        return this._request('POST', 'checkProjectPasswordAsync', { projectId }, { password });
    }

    publishProject(projectId) {
        return this._request('POST', 'publishProjectAsync', { projectId });
    }

    secureProject(projectId) {
        return this._request('POST', 'secureProjectAsync', { projectId });
    }

    generateProjectCover(projectId) {
        return this._request('GET', 'secureProjectAsync', { projectId });
    }

    viewProjectAndNotify(projectId) {
        return this._request('PUT', 'viewProjectAndNotifyAsync', { projectId });
    }

    acceptProject(projectId) {
        return this._request('POST', 'acceptProjectAsync', { projectId });
    }

    confirmProjectAcceptance(acceptToken) {
        return this._request('POST', 'confirmProjectAcceptanceAsync', { acceptToken });
    }

    revertProjectAcceptance(acceptReversionToken) {
        return this._request('POST', 'revertProjectAcceptanceAsync', { acceptReversionToken });
    }

    // Blocks
    createBlock(projectId, params) {
        return this._request('POST', 'createBlockAsync', { projectId }, params);
    }

    listBlocks(projectId) {
        return this._request('GET', 'listBlocksAsync', { projectId });
    }

    listBlock(projectId, blockId) {
        return this._request('GET', 'listBlockAsync', { projectId, blockId });
    }

    updateBlock(projectId, blockId, params) {
        return this._request('PUT', 'updateBlockAsync', { projectId, blockId }, params);
    }

    deleteBlock(projectId, blockId) {
        return this._request('DELETE', 'deleteBlockAsync', { projectId, blockId });
    }

    moveBlockForward(projectId, blockId) {
        return this._request('POST', 'moveBlockForwardAsync', { projectId, blockId });
    }

    moveBlockBackward(projectId, blockId) {
        return this._request('POST', 'moveBlockBackwardAsync', { projectId, blockId });
    }

    cloneBlock(projectId, blockId, position = '') {
        return this._request('POST', 'cloneBlockAsync', { projectId, blockId, position });
    }

    // Rows
    createRow(projectId, blockId, params) {
        return this._request('POST', 'createRowAsync', { projectId, blockId }, params);
    }

    listRows(projectId, blockId) {
        return this._request('GET', 'listRowsAsync', { projectId, blockId });
    }

    listRow(projectId, blockId, rowId) {
        return this._request('GET', 'listRowAsync', { projectId, blockId, rowId });
    }

    updateRow(projectId, blockId, rowId, params) {
        return this._request('PUT', 'updateRowAsync', { projectId, blockId, rowId }, params);
    }

    deleteRow(projectId, blockId, rowId) {
        return this._request('DELETE', 'deleteRowAsync', { projectId, blockId, rowId });
        // return this._wrapper().deleteRowAsync({ projectId, blockId, rowId }, null);
    }

    cloneRow(projectId, blockId, rowId, position = '') {
        return this._request('POST', 'cloneRowAsync', { projectId, blockId, rowId, position });
    }

    // Columns
    createColumn(projectId, blockId, rowId, params) {
        return this._request('POST', 'createColumnAsync', { projectId, blockId, rowId }, params);
    }

    listColumns(projectId, blockId, rowId) {
        return this._request('GET', 'listColumnsAsync', { projectId, blockId, rowId });
    }

    listColumn(projectId, blockId, rowId, columnId) {
        return this._request('GET', 'listColumnAsync', { projectId, blockId, rowId, columnId });
    }

    updateColumn(projectId, blockId, rowId, columnId, params) {
        return this._request(
            'PUT',
            'updateColumnAsync',
            { projectId, blockId, rowId, columnId },
            params
        );
    }

    deleteColumn(projectId, blockId, rowId, columnId) {
        return this._request('DELETE', 'deleteColumnAsync', {
            projectId,
            blockId,
            rowId,
            columnId,
        });
    }

    // Contents
    createContent(projectId, blockId, rowId, columnId, params) {
        return this._request(
            'POST',
            'createContentAsync',
            { projectId, blockId, rowId, columnId },
            params
        );
    }

    listContents(projectId, blockId, rowId, columnId) {
        return this._request('GET', 'listContentsAsync', { projectId, blockId, rowId, columnId });
    }

    listContent(projectId, blockId, rowId, columnId, contentId) {
        return this._request('GET', 'listContentAsync', {
            projectId,
            blockId,
            rowId,
            columnId,
            contentId,
        });
    }

    updateContent(projectId, blockId, rowId, columnId, contentId, params) {
        return this._request(
            'PUT',
            'updateContentAsync',
            { projectId, blockId, rowId, columnId, contentId },
            params
        );
    }

    deleteContent(projectId, blockId, rowId, columnId, contentId) {
        return this._request('DELETE', 'deleteContentAsync', {
            projectId,
            blockId,
            rowId,
            columnId,
            contentId,
        });
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
