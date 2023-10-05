import * as nodemailer from 'nodemailer';

export async function sendingMail({ from, to, subject, text }) {

    try {
        let mailOptions = ({
            from,
            to,
            subject,
            text
        })

        const Transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        return await Transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }

}