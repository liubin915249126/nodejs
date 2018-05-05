'use strict';

const nodemailer = require('nodemailer');

function postEmail(datas){
    let html = '<div>以下应用被下架</div><div>';
    if(Array.isArray(datas)&&datas.length>0){
        datas.forEach((data)=>{
            html = `${html}<b>${data.name}</b>`;
        })
        html = `${html}</div>`;
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.exmail.qq.com',
                // service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                port: 465, // SMTP 端口
                secureConnection: true, // 使用了 SSL
                auth: {
                    user: 'bin.liu@starwin.com',
                    // 这里密码不是qq密码，是你设置的smtp授权码
                    pass: 'Len.liu/6911',
                }
            });
            
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'bin.liu@starwin.com', // sender address
                to: 'bin.liu@starwin.com', // list of receivers
                subject: 'google play下架的应用 ', // Subject line
                // text: 'Hello world222?', // plain text body
                html, // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });    
    }
}
module.exports = {
    postEmail,
}