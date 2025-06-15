const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host : process.env.HOST_NAME,
    port: 465,
    secure: true, 
    auth : {
        user : process.env.MAIL_USER,
        pass : process.env.MAIL_PASS
    }
})

exports.sendMail = async ({to, subject, html}) => {
    try{

        const response = await transporter.sendMail({
            from : process.env.MAIL_USER,
            to : to,
            subject : subject,
            html : html 
        })

        // console.log("Mail Send Response - ", response);

    }
    catch(error){
        console.log(error);
        throw error;
    }
}