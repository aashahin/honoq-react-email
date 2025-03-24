import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
    Link,
    Hr,
} from "@react-email/components";
import * as React from "react";
import dotenv from "dotenv";

dotenv.config();

type ResetPasswordEmailProps = {
    userFirstname?: string;
    resetPasswordLink?: string;
    logoUrl?: string;
};

const name = process.env.APP_NAME!;

const translations = {
    preview: "إعادة تعيين كلمة المرور",
    heading: "طلب إعادة تعيين كلمة المرور",
    greeting: "مرحباً",
    message: "لقد تم طلب تغيير كلمة المرور لحسابك في",
    messageAction:
        "إذا كنت أنت من قام بهذا الطلب، يمكنك تعيين كلمة مرور جديدة بالنقر على الزر أدناه",
    button: "إعادة تعيين كلمة المرور",
    warning:
        "إذا لم تقم بطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني بأمان.",
    rights: "جميع الحقوق محفوظة.",
    fallbackText: "إذا واجهتك مشكلة في النقر على الزر، يمكنك نسخ ولصق الرابط التالي في متصفحك:",
    helpText: "هل تحتاج للمساعدة؟ تواصل معنا على",
    supportEmail: process.env.SUPPORT_EMAIL!,
};

export const ResetPasswordEmail = (
    {
        userFirstname = "",
        resetPasswordLink = "",
    }: ResetPasswordEmailProps) => {
    const t = translations;

    return (
        <Html dir="rtl" lang="ar">
            <Head>
                <title>{`${t.preview} - ${name}`}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            </Head>
            <Preview>
                {t.preview} - {name}
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={contentSection}>
                        <Text style={heading}>
                            {t.heading}
                        </Text>
                        <Text style={text}>
                            {t.greeting} {userFirstname},
                        </Text>
                        <Text style={text}>
                            {t.message} <strong>{name}</strong>. {t.messageAction}
                        </Text>
                        <Section style={buttonContainer}>
                            <Button
                                style={button}
                                href={resetPasswordLink}
                            >
                                {t.button}
                            </Button>
                        </Section>
                        <Text style={fallbackText}>
                            {t.fallbackText}
                        </Text>
                        <Text style={linkContainer}>
                            <Link href={resetPasswordLink} style={link}>
                                {resetPasswordLink}
                            </Link>
                        </Text>
                        <Text style={warningText}>
                            {t.warning}
                        </Text>
                    </Section>
                    <Hr style={divider}/>
                    <Section style={footer}>
                        <Text style={footerText}>
                            {t.helpText} <Link href={`mailto:${translations.supportEmail}`}
                                               style={supportLink}>{translations.supportEmail}</Link>
                        </Text>
                        <Text style={footerText}>
                            &copy; {new Date().getFullYear()} {name}. {t.rights}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#f4f7fa",
    padding: "20px 0",
    fontFamily:
        "Traditional Arabic, Tahoma, Arial, sans-serif",
    fontWeight: "600",
    width: "100%",
    WebkitTextSizeAdjust: "100%",
    MsTextSizeAdjust: "100%"
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
    width: "100%"
};

const divider = {
    borderTop: "1px solid #eaeaea",
    margin: "20px 0 0",
};

const contentSection = {
    padding: "30px 30px 20px",
};

const heading = {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "20px",
    lineHeight: "28px",
    textAlign: "right" as const,
};

const text = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#4b5563",
    margin: "16px 0",
    textAlign: "right" as const,
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0 24px",
};

const button = {
    backgroundColor: "#3b82f6",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "900",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 30px",
    transition: "background-color 0.2s ease-in-out",
    fontFamily: "Traditional Arabic, Tahoma, Arial, sans-serif",
};

const fallbackText = {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#6b7280",
    margin: "0 0 8px",
    textAlign: "center" as const,
};

const linkContainer = {
    margin: "0 0 24px",
    textAlign: "center" as const,
    wordBreak: "break-all" as const,
};

const link = {
    color: "#3b82f6",
    fontSize: "14px",
    textDecoration: "underline",
};

const warningText = {
    fontSize: "15px",
    lineHeight: "24px",
    color: "#6b7280",
    margin: "32px 0 0",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    borderRight: "4px solid #ef4444",
    textAlign: "right" as const,
};

const footer = {
    padding: "20px 30px",
    textAlign: "center" as const,
};

const footerText = {
    fontSize: "14px",
    color: "#6b7280",
    margin: "8px 0",
    textAlign: "center" as const,
};

const supportLink = {
    color: "#3b82f6",
    textDecoration: "underline",
};