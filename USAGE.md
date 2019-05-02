# Usage

## Auth
### Token
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    const response = await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Automatically sets the token on the client, but you can set manually
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const token = response.json.token; // Your Bearer Token to use in all endpoints that require authentication
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Me
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.authMe();
    
    const responseStatusCode = response.statusCode; // 201 Created
    const id = response.json.id; // Your user id
} catch (error) {
    // Do something with error
    console.log(error);
}
```

## Project
### Create
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.createProject({
        title: 'New Project',
        blocks: [],
    });
    
    const responseStatusCode = response.statusCode; // 201 Created
    const project = response.json; // Your created project
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Create from Template
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.createProjectFromTemplate('template-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Your created project from a template
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### List
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listTemplates();
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const projects = response.json; // Paginated project list
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### List Templates
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listTemplates();
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const templates = response.json; // Paginated project template list
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Retrieve
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listProject('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Specific project retrieved by id
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Update
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.updateProject('project-id', {
        description: 'Updated description'
    });
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Your updated project
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Clone
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.cloneProject('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Your cloned project
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Set Password
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.setProjectPassword('project-id', 'password');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Your project with a password set.
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Publish/unpublish
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.publishProject('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Your published/unpublished project.
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Secure/unsecure
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.secureProject('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const project = response.json; // Your secured/unsecured project.
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Generate/regenerate Cover
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.generateProjectCover('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### View and notify
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.viewProjectAndNotify('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const emailSent = response.json.emailSent; // True if email is sent to the project owner
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Delete
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.deleteProject('project-id');
    
    const responseStatusCode = response.statusCode; // 204 No content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

## Block
### Create
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.createBlock('project-id', {
        description: 'New block'
    });
    
    const responseStatusCode = response.statusCode; // 201 Created
    const block = response.json; // Your created block
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### List
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listBlocks('project-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const blocks = response.json; // Project block list
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Retrieve
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listBlock('project-id', 'block-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const block = response.json; // Your specific project block
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Update
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.updateBlock('project-id', 'block-id', {
        description: 'Updated description'
    });
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const block = response.json; // Your updated project block
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Move forward
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.moveBlockForward('project-id', 'block-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const block = response.json; // Your specific project block moved forward
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Move backward
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.moveBlockForward('project-id', 'block-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const block = response.json; // Your specific project block moved backward
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Clone
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    // Without a specific position
    const response = await ProposalPageClient.cloneBlock('project-id', 'block-id');
    
    // With a specific position
    const response = await ProposalPageClient.cloneBlock('project-id', 'block-id', 0);
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const block = response.json; // Your cloned block
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Delete
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first

    const response = await ProposalPageClient.deleteBlock('project-id', 'block-id');
    
    const responseStatusCode = response.statusCode; // 204 No content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

## Row
### Create
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.createRow('project-id', 'block-id', {
        description: 'New row'
    });
    
    const responseStatusCode = response.statusCode; // 201 Created
    const row = response.json; // Your created row
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### List
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listRows('project-id', 'block-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const rows = response.json; // Block rows
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Retrieve
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listRow('project-id', 'block-id', 'row-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const row = response.json; // Your specific block row
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Update
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.updateRow('project-id', 'block-id', 'row-id', {
        description: 'Updated description'
    });
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const row = response.json; // Updated block row
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Clone
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    // Without a specific position
    const response = await ProposalPageClient.cloneRow('project-id', 'block-id', 'row-id');
    
    // With a specific position
    const response = await ProposalPageClient.cloneRow('project-id', 'block-id', 'row-id', 0);
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const row = response.json; // Cloned block row
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Delete
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.deleteRow('project-id', 'block-id', 'row-id');
    
    const responseStatusCode = response.statusCode; // 204 No content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

## Column
### Create
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.createRow('project-id', 'block-id', 'row-id', {
        size: 12,
        contents: []
    });
    
    const responseStatusCode = response.statusCode; // 201 Created
    const column = response.json; // Your created column
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### List
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listColumns('project-id', 'block-id', 'row-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const columns = response.json; // Row columns
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Retrieve
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listColumn('project-id', 'block-id', 'row-id', 'column-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const column = response.json; // Your specific row column
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Update
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.updateColumn('project-id', 'block-id', 'row-id', 'column-id', {
        size: 11,
    });
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const column = response.json; // Your updated column
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Delete
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.deleteColumn('project-id', 'block-id', 'row-id', 'column-id');
    
    const responseStatusCode = response.statusCode; // 204 No content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

## Content
### Create
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.createContent('project-id', 'block-id', 'row-id', 'column-id', {
        style: {},
        type: 'empty',
        data: {}
    });
    
    const responseStatusCode = response.statusCode; // 201 Created
    const content = response.json // Your created content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### List
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listContents('project-id', 'block-id', 'row-id', 'column-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const contents = response.json // Column contents
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Retrieve
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.listContent('project-id', 'block-id', 'row-id', 'column-id', 'content-id');
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const content = response.json // Your specific retrieved content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Update
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.updateContent('project-id', 'block-id', 'row-id', 'column-id', 'content-id', {
        type: 'text',
        data: {
            html: '<p>Lorem Ipsum</p>'
        }
    });
    
    const responseStatusCode = response.statusCode; // 200 Ok
    const content = response.json // Updated content
} catch (error) {
    // Do something with error
    console.log(error);
}
```

### Delete
```js
const { Client: ProposalPageClient } = require('@proposal-page/sdk-js');

try {
    await ProposalPageClient.authenticate('test@teste.com', 'teste'); // Must authenticate first
    
    const response = await ProposalPageClient.deleteContent('project-id', 'block-id', 'row-id', 'column-id', 'content-id');
    
    const responseStatusCode = response.statusCode; // 204 No content
} catch (error) {
    // Do something with error
    console.log(error);
}
```
