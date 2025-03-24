import {serve} from "@hono/node-server";
import dotenv from "dotenv";
import {Hono} from "hono";
import {MailService} from "./mail.service.js";

dotenv.config();

const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/mail/reset-password", async (c) => {
    const body = await c.req.json();
    const {email, userName, url, password} = body;

    if (!email || !userName || !url || !password) {
        return c.json({error: "Missing required fields"}, 400);
    }

    if (password !== process.env.SMTP_PASSWORD) {
        return c.json({error: "Invalid password"}, 400);
    }

    const mailService = new MailService();

    await mailService.resetPasswordEmail({
        email,
        userName,
        url,
    });

    return c.json({message: "Email sent successfully"});
});

serve(
    {
        fetch: app.fetch,
        port: process.env.PORT ? parseInt(process.env.PORT) : 5201,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
