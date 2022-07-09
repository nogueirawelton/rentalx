import { IMailProvider } from "../IMailProvider";

export class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];
  async sendMail(
    to: string,
    subject: string,
    variables: { name: string; link: string },
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
