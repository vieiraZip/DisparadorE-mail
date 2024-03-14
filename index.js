const nodemailer = require('nodemailer')
const contatos = require('./contatos.json')
const mensagem = require('./texto.md')


async function enviar(mensagem){
    const mensageiro = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vieira.jonas474@gmail.com',
            pass: '************',
        }
    
    })
    try{
        const emails = await email(contatos)
        console.log(`${emails}`)
        mensageiro.sendMail({
            from: 'Jonas Vieira <vieira.jonas474@gmail.com>',
            to: emails,
            subject: 'Envio teste de e-mail',
            // html: 'Embedded image: <img src="cid:unique@nodemailer.com"/>',
            text: 'Se você receber esse e-mail, minha missão foi um sucesso'
        })
        .then(() => console.log("E-mail enviado com sucesso"))
        .catch((erro) => {
            throw new Error(erro.code, "Um erro inesperado ocorreu")})
    }
    catch(erro){
        console.log("Erro: abacate com aveia")
    }
}


function email(contatos){
    const emails = []
    for (const contato of contatos){
        if(contato.email){
            emails.push(contato.email)
        }
    }
    return emails
}


enviar(mensagem)
