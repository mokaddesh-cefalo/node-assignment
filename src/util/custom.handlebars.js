const exphbs = require('express-handlebars');
const path = require('path');

module.exports = (rootDir) => {
    return exphbs.create ({
        
        defaultLayout: 'main', 
        layoutsDir: path.join(rootDir, 'views/layouts'),
        partialsDir: path.join(rootDir, 'views/partials'),
        extname: 'handlebars',
    
        helpers: {
            chatRoomUser: function(user) {
                return `<li>${user.name}  (${user.type})</li>`;
            },

            chatRoomLogIn: function(chatRoom) {
                let button = !chatRoom.joined ? `<button onclick=joinRoom('${ chatRoom._id }')> Join </button>` :`<button onclick=enterRoom('${ chatRoom._id }')> Enter </button>`;
                let name = `<h1>${chatRoom.name}</h1>`;
                let description = `<h4>${chatRoom.description}</h4>`;
                let creationTime = `<h6>${chatRoom.createdDate}</h6>`;
            
                return `${name} ${description} ${creationTime} ${button}`
            },

            chatRoomMessage: function(value, options) {
                let out = '';
    
                for(let i = 0; i < value.length; i++) {
                    out = out + 
                    options.fn({ 
                        user_name: `<b>${value[i].user_name}</b>:`, 
                        message: `${value[i].message} <br /> <br /> ` 
                    });
                }

                return out; 
            },

            chatRoomAnswers: function(value, options) {  
                let out = '';

                if(value) {
                    for(let i = 0; i < value.length; i++) {
                        out = out + 
                        options.fn({ 
                            user_name: `<h4>${value[i].user_name}' solution</h4>`, 
                            message: `<textarea id="statement" disabled rows="10" cols="60">${value[i].message}</textarea>` 
                        });
                    }
                }

                return out; 
            },

            chatRoomQuestion: function(question) {
                let statement = '', button = '', answer = '';

                if(!question) { return ''; }
                else if (question.statement) {
                    statement = `<h3>Problem statement:</h3><textarea id="statement" ${question.access} rows="10" cols="60">${question.statement}</textarea>`;
                } else if(question.access === 'create') {
                    statement = `<h3>Problem statement:</h3><textarea id="statement" rows="10" cols="60" placeholder="Describe question here..."></textarea>`
                }

                if(question.access === 'update' || question.access === 'create') {
                    button = `<button onclick=updateStatement()> ${question.access} </button>`;
                }

                if(question.answer) {
                    answer = `<textarea id="answer" rows="10" cols="60" placeholder="Submit your answer here..."></textarea>`;
                    button = `<button onclick=submitAnswer()> Submit </button>`;
                }
                return `${statement} <br /> ${answer} <br /> ${button}`;
            },
        }
    });
}