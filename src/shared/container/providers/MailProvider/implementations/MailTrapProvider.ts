import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
export class MailTrapProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "eb60d9d25b055f",
        pass: "03303976e297a0",
      },
    });
    this.client = transporter;
  }
  async sendMail(
    to: string,
    subject: string,
    variables: {
      name: string;
      link: string;
    },
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com.br>",
      subject,
      html: templateHTML,
    });
  }
}
