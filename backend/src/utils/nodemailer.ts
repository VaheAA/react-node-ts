import nodemailer from 'nodemailer';


export async function sendEmail(messageBody: any, t: any) {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'mail.simple-qr.me',
    port: 465,
    auth: {
      user: 'speakup@simple-qr.me',
      pass: '#KanekiKen42'
    }
  });

  let messageHtml = `
  <p><strong>${t('emailTemaplateFields.name')}</strong> ${messageBody.name}
  <p><strong>${t('emailTemaplateFields.email')}</strong>  ${messageBody.email}
  <p><strong>${t('emailTemaplateFields.phone')}</strong> ${messageBody.phone}
  <p><strong>${t('emailTemaplateFields.category')}</strong> ${messageBody.category}
  <p><strong>${t('emailTemaplateFields.status')}</strong> ${messageBody.status}
  <p><strong>${t('emailTemaplateFields.period')}</strong> ${messageBody.date}
  <p><strong>${t('emailTemaplateFields.date')}</strong> ${messageBody.period}
  <p><strong>${t('emailTemaplateFields.witness')}</strong>  ${messageBody.witness}
  <p><strong>${t('emailTemaplateFields.message')}</strong> ${messageBody.message}
  `;

  let autoreplyHtml = `
  <p> ${t('autoreplyText.p1')}</p> 
  <p>${t('autoreplyText.p2')} </p> 
  <p> ${t('autoreplyText.p3')}</p>
  <p> <strong> ${t('autoreplyText.p4')}<br>
      </strong>${t('autoreplyText.p5')}</p> 
  `;

  let info = await transporter.sendMail({
    from: `${messageBody.name} <${messageBody.email}>`,
    to: 'speakup@simple-qr.me',
    subject: 'Speak-Up',
    html: messageHtml,
    attachments: [
      {
        filename: messageBody?.file,
        path: messageBody.filePath
      },
    ]
  });

  if (info.accepted) {
    await transporter.sendMail({
      from: 'Speakup <noreply@simple-qr.me>',
      to: `${messageBody.email}`,
      subject: t('autoreplyText.subject'),
      html: autoreplyHtml
    });
  }
}