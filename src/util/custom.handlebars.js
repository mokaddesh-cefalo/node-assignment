const exphbs = require('express-handlebars');
const path = require('path');

module.exports = (rootDir) => {
    return exphbs.create({
        defaultLayout: 'main', 
        layoutsDir: path.join(rootDir, 'views/layouts'),
        partialsDir: path.join(rootDir, 'views/partials'),
        extname: 'handlebars',
    
        helpers: {
            chatRoomUser: function(user) {
                return `<p>${user.name}(${user.type})</p>`;
            },
            chatRoomLogIn: function(chatRoom) {
                let button = !chatRoom.joined ? `<button onclick=joinRoom('${ chatRoom._id }')> Join </button>` :
                `<button onclick=enterRoom('${ chatRoom._id }')> Enter </button>`;
                let name = `<h1>${chatRoom.name}</h1>`;
                let description = `<h4>${chatRoom.description}</h4>`;
                let creationTime = `<h6>${chatRoom.createdDate}</h6>`;
            
                return `${name} ${description} ${creationTime} ${button}`
            },
            chatRoomMessage: function(value, options) {
                let out = "<ul>";
    
                for(let i = 0; i < value.length; i++) {
                    out = out + "<li>" + 
                    options.fn({ 
                        user_name: `${value[i].user_name}`, 
                        message: `${value[i].message} <br />` 
                    }) + "</li>";
                }
                return out + "</ul>"; 
            },
            chatRoomQuestion: function(question) {
                let statement = '', button = '';

                if(!question) { return ''; }
                else if (question.statement) {
                    statement = `<textarea id="statement" ${question.access} rows="10" cols="80">${question.statement}</textarea>`;
                } else if(question.access === 'create') {
                    statement = `<textarea id="statement" rows="10" cols="80" placeholder="Describe question here..."></textarea>`
                }

                if(question.access === 'update' || question.access === 'create') {
                    button = `<button onclick=updateStatement()> ${question.access} </button>`;
                }
                return `${statement} <br /> ${button}`;
            },
        }
    });
}