'use strict';

const nodemailer = require('nodemailer');
const {baseUrl, mgtBaseUrl} = require('./index.js');

function postEmail(datas, onDatas){
    let html = '';
    if(Array.isArray(datas)&&datas.length>0){
        html = `${html}<div>以下应用被下架</div>(${datas.length}个)<div>`
        datas.forEach((data)=>{
            const { packageName, id } = data;
            html = `${html}<b><a href="${baseUrl}${packageName}" title="googleplay">${data.name}</a></b>  <a href="${mgtBaseUrl}${id}">(mgt)</a><br/>`;
        })
        html = `${html}</div>`;
    }else{
        html = `${html}<div>今天没有产品被下架</div>`
    }
    if(Array.isArray(onDatas)&&onDatas.length>0){
        html = `${html}<div>没被下架的应用</div>(${onDatas.length}个)<div>`
        onDatas.forEach((data)=>{
            const { packageName, id } = data;
            html = `${html}<b><a href="${baseUrl}${packageName}" title="googleplay">${data.name}</a></b>  <a href="${mgtBaseUrl}${id}">(mgt)</a><br/>`;
        })
        html = `${html}</div>`;
    }
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
                pass: '',
            }
        });
        
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'bin.liu@starwin.com', // sender address
            to: 'bin.liu@starwin.com, min.liao@starwin.com, yaoyi.wang@starwin.com, lin.chen@starwin.com, jialing.hu@starwin.com', // list of receivers
            // to: 'bin.liu@starwin.com', // list of receivers
            subject: '贷超APP监控', // Subject line
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
module.exports = {
    postEmail,
}