import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    const subject = 'Chào mừng bạn đến với EduTech!';
    const html = `
      <!DOCTYPE html>
      <html dir="ltr" lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2c3e50; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .email-wrapper { background: #ffffff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; color: #ffffff; }
            .logo { font-size: 32px; font-weight: 700; margin: 0; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; color: #2c3e50; margin: 0 0 20px 0; font-weight: 600; }
            .description { font-size: 15px; color: #555; line-height: 1.8; margin: 0 0 20px 0; }
            .cta-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <div class="logo">🎓 EduTech</div>
              </div>
              <div class="content">
                <p class="greeting">Xin chào ${firstName}!</p>
                <p class="description">
                  Chúc mừng bạn đã xác nhận email thành công! Tài khoản EduTech của bạn đã hoàn toàn sẵn sàng sử dụng.
                </p>
                <p class="description">
                  Bắt đầu hành trình học tập của bạn ngay hôm nay và truy cập hàng ngàn khóa học chất lượng cao từ các giảng viên hàng đầu.
                </p>
                <p class="description">
                  Nếu bạn có bất kỳ câu hỏi, hãy liên hệ với chúng tôi qua email hoặc truy cập trung tâm trợ giúp của chúng tôi.
                </p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} EduTech - Nền tảng học tập thông minh</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.mailerService.sendMail(email, subject, html);
    this.logger.log(`Welcome email sent to ${email}`);
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const subject = 'Đặt lại mật khẩu - EduTech';
    const resetUrl = `http://localhost:8888/reset-password?token=${resetToken}`;
    const html = `
      <!DOCTYPE html>
      <html dir="ltr" lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2c3e50; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .email-wrapper { background: #ffffff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; color: #ffffff; }
            .logo { font-size: 32px; font-weight: 700; margin: 0; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; color: #2c3e50; margin: 0 0 20px 0; font-weight: 600; }
            .description { font-size: 15px; color: #555; line-height: 1.8; margin: 0 0 20px 0; }
            .warning-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .warning-box p { margin: 0; font-size: 14px; color: #856404; }
            .button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <div class="logo">EduTech</div>
              </div>
              <div class="content">
                <p class="greeting">Xin chào!</p>
                <p class="description">
                  Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản EduTech của bạn.
                </p>
                <a href="${resetUrl}" class="button">Đặt lại mật khẩu</a>
                <div class="warning-box">
                  <p><strong>Lưu ý:</strong> Liên kết này sẽ hết hạn trong 1 giờ. Nếu bạn không yêu cầu điều này, vui lòng bỏ qua.</p>
                </div>
                <p class="description">
                  Liên kết không hoạt động? Sao chép URL bên dưới vào trình duyệt:<br>
                  <small style="word-break: break-all;">${resetUrl}</small>
                </p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} EduTech - Nền tảng học tập thông minh</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.mailerService.sendMail(email, subject, html);
    this.logger.log(`Password reset email sent to ${email}`);
  }

  async sendEmailVerificationEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    const subject = '✓ Xác nhận Email - EduTech';
    const verifyUrl = `http://localhost:8888/api/v1/auth/email/verify?token=${verificationToken}`;
    const html = `
      <!DOCTYPE html>
      <html dir="ltr" lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2c3e50; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .email-wrapper { background: #ffffff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; color: #ffffff; }
            .logo { font-size: 32px; font-weight: 700; margin: 0; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; color: #2c3e50; margin: 0 0 20px 0; font-weight: 600; }
            .description { font-size: 15px; color: #555; line-height: 1.8; margin: 0 0 20px 0; }
            .button { display: inline-block; padding: 15px 45px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 25px 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <div class="logo">EduTech</div>
              </div>
              <div class="content">
                <p class="greeting">Xác nhận email của bạn!</p>
                <p class="description">
                  Nhấp vào nút bên dưới để xác nhận địa chỉ email của bạn và kích hoạt tài khoản EduTech.
                </p>
                <a href="${verifyUrl}" class="button">✓ Xác nhận Email</a>
                <p class="description" style="font-size: 13px; color: #888;">
                  Liên kết này sẽ hết hạn trong 24 giờ.
                </p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} EduTech - Nền tảng học tập thông minh</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.mailerService.sendMail(email, subject, html);
    this.logger.log(`Email verification sent to ${email}`);
  }
}
