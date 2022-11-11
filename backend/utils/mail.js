import nodemailer from "nodemailer";

class Mail {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: `${process.env.NODEMAILER_USER}`,
        pass: `${process.env.NODEMAILER_PASS}`
      }
    });

    this.message = {
      from: "",
      to: "",
      subject: "",
      text: ""
    };
  }

  setMessage(to, text) {
    this.message = {
      from: `${process.env.NODEMAILER_USER}`,
      to,
      subject: "랜덤박스 회원가입 이메일 인증 메일입니다.",
      text
    };
  }

  sendMail() {
    this.transport.sendMail(this.message, (error, info) => {
      if (error) {
        console.error("error", error);
        return;
      }

      console.log("ok", info);
    });
  }
}

const mail = new Mail();

export { mail };
