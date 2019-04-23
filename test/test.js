const chai = require('chai');
const expect = chai.expect;
const jsonPattern = require('chai-json-pattern');
const sinon = require('sinon');
const { Client: SDKClient } = require('../bin/index');

chai.use(jsonPattern.default);

// Test clients setup
var authenticatedTestClient = null;
var unauthenticatedTestClient = null;
async function getUnauthenticatedTestClient() {
    if (! unauthenticatedTestClient) {
        unauthenticatedTestClient = new SDKClient('http://localhost:3000');
    }

    return unauthenticatedTestClient;
}
async function getAuthenticatedTestClient() {
    if (! authenticatedTestClient) {
        authenticatedTestClient = new SDKClient('http://localhost:3000');

        const username = 'gian_bine@hotmail.com';
        const password = 'gian6280';

        const auth = await authenticatedTestClient.authenticate({
            username,
            password
        });

        authenticatedTestClient.token = JSON.parse(auth.body).token;
    }

    return authenticatedTestClient;
}

describe('Wrapper', function() {
    afterEach(() => {
        sinon.restore();
    });

    describe('Api Url', function() {
        it('should get default api url if no url is passed in constructor', function() {
            const client = new SDKClient();

            expect(client.apiUrl).to.equal('https://api.proposalpage.com');
        });
        it('should get passed url if a url is passed in constructor', function() {
            const client = new SDKClient('https://example.com');

            expect(client.apiUrl).to.equal('https://example.com');
        });
    });

    describe('Token', function() {
        it('should not have a default token set', function() {
            const client = new SDKClient();

            expect(client.token).to.be.undefined;
        });
        it('should get the token that has been set', function() {
            const client = new SDKClient();

            client.token = 'token';

            expect(client.token).to.equal('token');
        });
    });
});

describe('Api Responses', function() {
    afterEach(() => {
        sinon.restore();
    });

    describe('Auth', function() {
        describe('Token', function() {
            it('should return token', async function() {
                const client = await getUnauthenticatedTestClient();

                const username = 'gian_bine@hotmail.com';
                const password = 'gian6280';

                const response = await client.authenticate({
                    username,
                    password
                });

                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body)).to.matchPattern(`{
                    "token": String,
                }`);
            });
        });

        describe('Me', function() {
            it('should return logged user id', async function() {
                const client = await getAuthenticatedTestClient();
                const response = await client.authMe();

                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body)).to.matchPattern(`{
                    "id": String,
                }`);
            });
        });
    });

    describe('Project', function() {
        var testProjectId = null;

        describe('Create', function() {
            it('should create and return a project', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.createProject({
                    title: 'New Project',
                    blocks: []
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                }`);
                expect(responseBody.title).to.equal('New Project');
                expect(responseBody.blocks).to.be.empty;

                testProjectId = responseBody._id;
            });
        });

        describe('List', function() {
            it('should list user projects paginated', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.listProjects(testProjectId);

                const responseBody = JSON.parse(response.body);
                const projects = responseBody.items;

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "items": Array,
                    "totalItems": Number,
                    "page": Number,
                    "limit": Number,
                    "pages": Number,
                    "defaultCover": String,
                }`);
                projects.forEach(project => {
                    expect(project).to.matchPattern(`{
                        "_id": String,
                        "title": String,
                        "fonts": Array,
                        "publish": Boolean,
                        "secure": Boolean,
                        "countViews": Number,
                        "timeViews": Number,
                        "priority": Number,
                        "blocks": Array,
                        "userId": String,
                        "accountId": String,
                        "token": String,
                        "slug": String,
                        "publishURL": String,
                        "createdAt": String,
                        "updatedAt": String,
                        "__v": Number,
                        "password"?: String OR null,
                        "lastView"?: String,
                    }`);
                });
            });
        });

        describe('Retrieve', function() {
            it('should retrieve a existing project', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.listProject(testProjectId);

                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body)).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                    "password"?: String OR null,
                    "lastView"?: String,
                }`);
            });
        });

        describe('Update', function() {
            it('should update a existing project', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.updateProject(testProjectId, {
                    title: 'Updated Project Title'
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                }`);
                expect(responseBody.title).to.equal('Updated Project Title');
            });
        });

        describe('Clone', function() {
            it('should clone a project and return it', async function() {
                const client = await getAuthenticatedTestClient();
                const response = await client.cloneProject(testProjectId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                    "password"?: String,
                }`);
                expect(responseBody.title).to.equal('Updated Project Title');
                expect(responseBody.blocks).to.be.empty;
            });
        });

        describe('Password', function() {
            it('should set project password', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.setProjectPassword(testProjectId, 'password');

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                    "password": String,
                }`);
                expect(responseBody.password).to.equal('password');
            });

            it('should check project password', async function () {
                const client = await getUnauthenticatedTestClient();

                const correctPasswordResponse = await client.checkProjectPassword(testProjectId, 'password');
                expect(correctPasswordResponse.statusCode).to.equal(200);

                const incorrectPasswordResponse = await client.checkProjectPassword(testProjectId, 'password1');
                expect(incorrectPasswordResponse.statusCode).to.equal(401);
            });
        });

        describe('Publish', function() {
            it('should set project publish to true', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.publishProject(testProjectId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                    "password"?: String,
                }`);
                expect(responseBody.publish).to.equal(true);
            });
        });

        describe('Secure', function() {
            it('should set project secure to true', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.secureProject(testProjectId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                    "password"?: String,
                }`);
                expect(responseBody.secure).to.equal(true);
            })
        });

        describe('Cover', function() {
            it('should generate project cover', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.generateProjectCover(testProjectId);

                expect(response.statusCode).to.equal(200);
            })
        });

        describe('Copy', function() {
            it('should generate project based on a default template', async function () {
                const templateId = '5cb47ec98497e9001ad9a1b2';
                const client = await getAuthenticatedTestClient();
                const response = await client.createProjectFromTemplate(templateId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "title": String,
                    "fonts": Array,
                    "publish": Boolean,
                    "secure": Boolean,
                    "countViews": Number,
                    "timeViews": Number,
                    "priority": Number,
                    "blocks": Array,
                    "userId": String,
                    "accountId": String,
                    "token": String,
                    "slug": String,
                    "publishURL": String,
                    "createdAt": String,
                    "updatedAt": String,
                    "__v": Number,
                    "password"?: any,
                }`);
            })
        });

        describe('View and Notify', function() {
            it('should update project last view time and send email with notification only if is not the project owner viewing', async function() {
                const client = await getUnauthenticatedTestClient();
                const response = await client.viewProjectAndNotify(testProjectId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                // expect(responseBody.emailSent).to.equal(true);
            });
        });

        describe('Templates', function() {
            it('should list templates thar the user can use paginated', async function () {
                const client = await getAuthenticatedTestClient();
                const response = await client.listTemplates();

                const responseBody = JSON.parse(response.body);
                const templates = responseBody.items;

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "items": Array,
                    "totalItems": Number,
                    "page": Number,
                    "limit": Number,
                    "pages": Number,
                    "defaultCover": String,
                    "lastView"?: String,
                }`);
                templates.forEach(template => {
                    expect(template).to.matchPattern(`{
                        "_id": String,
                        "title": String,
                        "fonts": Array,
                        "publish": Boolean,
                        "secure": Boolean,
                        "countViews": Number,
                        "timeViews": Number,
                        "priority": Number,
                        "blocks": Array,
                        "userId": String,
                        "accountId": String,
                        "token": String,
                        "slug": String,
                        "publishURL": String,
                        "createdAt": String,
                        "updatedAt": String,
                        "__v": Number,
                        "password"?: String OR null,
                        "cover": String,
                        "currency": String,
                        "heating": Object,
                        "lastView": String,
                    }`);
                });
            });
        });

        describe('Remove', function() {
            it('should delete a existing project', async function () {
                const client = await getAuthenticatedTestClient();
                const newProject = await client.createProject({
                    title: 'New Project',
                    blocks: []
                });

                const project = JSON.parse(newProject.body);
                const projectId = project._id;

                const response = await client.deleteProject(projectId);

                expect(response.statusCode).to.equal(204);
            });
        });
    });

    describe('Block', function() {
        var testBlockId = null;

        describe('List Project Blocks', function() {
            it('should list project blocks', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const client = await getAuthenticatedTestClient();
                const response = await client.listBlocks(projectId);

                const blocks = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                blocks.forEach(block => {
                    expect(block).to.matchPattern(`{
                        "_id": String,
                        "style": Object,
                        "fullScreen": Boolean,
                        "rows": Array,
                        "description": String,
                        "createdAt": String,
                        "updatedAt": String,
                    }`);
                });
            });
        });

        describe('Create Project Block', function() {
            it('should create and return a new project block', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';

                const client = await getAuthenticatedTestClient();
                const response = await client.createBlock(projectId, {
                    description: 'New Block'
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
                expect(responseBody.description).to.equal('New Block');

                testBlockId = responseBody._id;
            });
        });

        describe('Retrieve Project Block', function() {
            it('should return a project block', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';

                const client = await getAuthenticatedTestClient();
                const response = await client.listBlock(projectId, blockId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
            });
        });

        describe('Update Project Block', function() {
            it('should update and return a project block', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';

                const client = await getAuthenticatedTestClient();
                const response = await client.updateBlock(projectId, blockId, {
                    description: 'Updated Block Description'
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
                expect(responseBody.description).to.equal('Updated Block Description');
            });
        });

        describe('Move Project Block Forward', function() {
            it('should move a project block forward (+1)', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';

                const client = await getAuthenticatedTestClient();
                const response = await client.moveBlockForward(projectId, testBlockId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
            });
        });

        describe('Move Project Block Backward', function() {
            it('should move a project block forward (-1)', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';

                const client = await getAuthenticatedTestClient();
                const response = await client.moveBlockBackward(projectId, testBlockId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
            });
        });

        describe('Clone Project Block', function() {
            it('should clone a project block without a specific position', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';

                const client = await getAuthenticatedTestClient();
                const response = await client.cloneBlock(projectId, testBlockId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
            });

            it('should clone a project block and put it in a specific position', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';

                const client = await getAuthenticatedTestClient();
                const response = await client.cloneBlock(projectId, testBlockId, 0);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "style": Object,
                    "fullScreen": Boolean,
                    "rows": Array,
                    "description": String,
                    "createdAt": String,
                    "updatedAt": String,
                }`);
            });
        });

        describe('Remove Project Block', function() {
            it('should delete a project block', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';

                const client = await getAuthenticatedTestClient();
                const response = await client.deleteBlock(projectId, testBlockId);

                expect(response.statusCode).to.equal(204);
            });
        });
    });

    describe('Row', function() {
        var testRowId = null;

        describe('List Project Block Rows', function() {
            it('should list project block rows', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const client = await getAuthenticatedTestClient();
                const response = await client.listRows(projectId, blockId);

                const rows = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                rows.forEach(row => {
                    expect(row).to.matchPattern(`{
                        "_id": String,
                        "description": String,
                        "columns": Array,
                    }`);
                });
            });
        });

        describe('Create Project Block Row', function() {
            it('should create and return a new project block row', async function () {
                const blockId = '5cb8698632f905001a024614';
                const projectId = '5ca344b1df6272001ae7d7ac';
                const client = await getAuthenticatedTestClient();
                const response = await client.createRow(projectId, blockId, {
                    description: 'New row'
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "description": String,
                    "columns": Array,
                }`);
                expect(responseBody.description).to.equal('New row');

                testRowId = responseBody._id;
            });
        });

        describe('Retrieve Project Block Row', function() {
            it('should list a project block row', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const client = await getAuthenticatedTestClient();
                const response = await client.listRow(projectId, blockId, testRowId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "description": String,
                    "columns": Array,
                }`);
            });
        });

        describe('Update Project Block Row', function() {
            it('should update and return a project block row', async function () {
                const blockId = '5cb8698632f905001a024614';
                const projectId = '5ca344b1df6272001ae7d7ac';
                const client = await getAuthenticatedTestClient();
                const response = await client.updateRow(projectId, blockId, testRowId, {
                    description: 'Updated row description'
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                "_id": String,
                "description": String,
                "columns": Array,
            }`);
                expect(responseBody.description).to.equal('Updated row description');
            });
        });

        describe('Clone Project Block Row', function() {
            it('should clone a project block row without a specific position', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';

                const client = await getAuthenticatedTestClient();
                const response = await client.cloneRow(projectId, blockId, testRowId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "description": String,
                    "columns": Array,
                }`);
            });

            it('should clone project block row and put it in a specific position', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';

                const client = await getAuthenticatedTestClient();
                const response = await client.cloneRow(projectId, blockId, testRowId, 0);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "description": String,
                    "columns": Array,
                }`);
            });
        });

        describe('Remove Project Block Row', function() {
            it('should delete a project block row', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';

                const client = await getAuthenticatedTestClient();
                const response = await client.deleteRow(projectId, blockId, testRowId);

                expect(response.statusCode).to.equal(204);
            });
        });
    });

    describe('Column', function() {
        var testColumnId = null;

        describe('List Project Block Row Columns', function() {
            it('should list project block row columns', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cbf11c97f6a64001aea65f2';
                const client = await getAuthenticatedTestClient();
                const response = await client.listColumns(projectId, blockId, rowId);

                const columns = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                columns.forEach(column => {
                    expect(column).to.matchPattern(`{
                        "_id": String,
                        "contents": Array,
                        "size": Number,
                    }`);
                });
            });
        });

        describe('Create Project Block Row Column', function() {
            it('should create and return a new project block row column', async function () {
                const blockId = '5cb8698632f905001a024614';
                const projectId = '5ca344b1df6272001ae7d7ac';
                const rowId = '5cbf11c97f6a64001aea65f2';
                const client = await getAuthenticatedTestClient();
                const response = await client.createColumn(projectId, blockId, rowId, {
                    contents: [],
                    size: 12
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                "_id": String,
                "contents": Array,
                "size": Number,
            }`);
                expect(responseBody.size).to.equal(12);

                testColumnId = responseBody._id;
            });
        });

        describe('Retrieve Project Block Row Column', function() {
            it('should list a project block row column', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cbf11c97f6a64001aea65f2';
                const client = await getAuthenticatedTestClient();
                const response = await client.listColumn(projectId, blockId, rowId, testColumnId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "contents": Array,
                    "size": Number,
                }`);
            });
        });

        describe('Update Project Block Row Column', function() {
            it('should update and return a project block row column', async function () {
                const blockId = '5cb8698632f905001a024614';
                const projectId = '5ca344b1df6272001ae7d7ac';
                const rowId = '5cbf11c97f6a64001aea65f2';
                const client = await getAuthenticatedTestClient();
                const response = await client.updateColumn(projectId, blockId, rowId, testColumnId, {
                    size: 11
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "contents": Array,
                    "size": Number,
                }`);
                expect(responseBody.size).to.equal(11);
            });
        });

        describe('Remove Project Block Row Column', function() {
            it('should delete a project block row column', async function () {
                const blockId = '5cb8698632f905001a024614';
                const projectId = '5ca344b1df6272001ae7d7ac';
                const rowId = '5cbf11c97f6a64001aea65f2';
                const client = await getAuthenticatedTestClient();

                const response = await client.deleteColumn(projectId, blockId, rowId, testColumnId);

                expect(response.statusCode).to.equal(204);
            });
        });
    });

    describe('Content', function() {
        var testContentId = null;

        describe('List Project Block Row Column Contents', function() {
            it('should list project block row column contents', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cb8698632f905001a024615';
                const columnId = '5cb869d132f905001a024656';
                const client = await getAuthenticatedTestClient();
                const response = await client.listContents(projectId, blockId, rowId, columnId);

                const contents = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                contents.forEach(content => {
                    expect(content).to.matchPattern(`{
                        "_id": String,
                        "type": String,
                        "style": Object,
                        "data": Object,
                    }`);
                });
            });
        });

        describe('Create Project Block Row Column Content', function() {
            it('should create and return a new project block row column content', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cb8698632f905001a024615';
                const columnId = '5cb869d132f905001a024656';
                const client = await getAuthenticatedTestClient();
                const response = await client.createContent(projectId, blockId, rowId, columnId, {
                    style: {
                        "backgroundImage": "",
                        "backgroundRepeat": "no-repeat",
                        "backgroundSize": "cover",
                        "backgroundPosition": "center center",
                        "opacity": 1
                    },
                    type: 'text',
                    data: {
                        json: {
                            "type": "doc",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Lorem Ipsum"
                                        }
                                    ]
                                }
                            ]
                        },
                        html: '<p style="text-align: center">Lorem Ipsum</p>'
                    }
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(201);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "type": String,
                    "style": Object,
                    "data": Object,
                }`);

                testContentId = responseBody._id;
            });
        });

        describe('Retrieve Project Block Row Column Content', function() {
            it('should list a project block row column content', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cb8698632f905001a024615';
                const columnId = '5cb869d132f905001a024656';
                const client = await getAuthenticatedTestClient();
                const response = await client.listContent(projectId, blockId, rowId, columnId, testContentId);

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "type": String,
                    "style": Object,
                    "data": Object,
                }`);
            });
        });

        describe('Update Project Block Row Column Content', function() {
            it('should update and return a project block row column content', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cb8698632f905001a024615';
                const columnId = '5cb869d132f905001a024656';
                const client = await getAuthenticatedTestClient();
                const response = await client.updateContent(projectId, blockId, rowId, columnId, testContentId, {
                    data: {
                        json: {
                            "type": "doc",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Lorem Ipsuma"
                                        }
                                    ]
                                }
                            ]
                        },
                        html: '<p style="text-align: center">Lorem Ipsuma</p>'
                    }
                });

                const responseBody = JSON.parse(response.body);

                expect(response.statusCode).to.equal(200);
                expect(responseBody).to.matchPattern(`{
                    "_id": String,
                    "type": String,
                    "style": Object,
                    "data": Object,
                }`);
            });
        });

        describe('Remove Project Block Row Column Content', function() {
            it('should delete a project block row column', async function () {
                const projectId = '5ca344b1df6272001ae7d7ac';
                const blockId = '5cb8698632f905001a024614';
                const rowId = '5cb8698632f905001a024615';
                const columnId = '5cb869d132f905001a024656';
                const client = await getAuthenticatedTestClient();
                const response = await client.deleteContent(projectId, blockId, rowId, columnId, testContentId);

                expect(response.statusCode).to.equal(204);
            });
        });
    });
});
